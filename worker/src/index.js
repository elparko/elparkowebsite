// Answers a visitor's question as an AI impression of Parker, from his interview and the site's own text.
// The browser sends the question and the ids of the written answers and pages its search found. The text
// itself comes from this Worker's copy of the site, so a caller cannot make the model read anything else.
import { ANSWERS } from '../../lib/answers.mjs';
import { EXTERNAL, PAGES } from '../../lib/pages.mjs';
import { PERSONA, RULES } from './persona.js';

const ALLOWED = new Set([
  'https://www.elparko.com',
  'https://elparko.com',
  'http://localhost:3000',
  'http://localhost:3111',
]);
const MAX_QUESTION = 300;
const MAX_ANSWERS = 3;
const MAX_PAGES = 3;
const MAX_REPLY = 1200;

const answers = new Map(ANSWERS.filter((a) => a.answer).map((a) => [a.id, a]));
const pages = new Map([...PAGES, ...EXTERNAL].map((p) => [p.slug ? `/${p.slug}` : p.href, p]));

function notes(answerIds, hrefs) {
  const lines = [];
  for (const id of answerIds) {
    const a = answers.get(id);
    if (a) lines.push(`Q: ${a.questions[0]}\nA: ${a.answer}`);
  }
  for (const href of hrefs) {
    const p = pages.get(href);
    if (p) lines.push(`Page "${p.title}": ${p.description}`);
  }
  return lines.join('\n\n');
}

const strings = (v, max) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, max) : []);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED.has(origin) ? origin : 'https://www.elparko.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    };
    const json = (body, status = 200) => Response.json(body, { status, headers: cors });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'POST only' }, 405);
    if (!ALLOWED.has(origin)) return json({ error: 'origin not allowed' }, 403);

    const address = request.headers.get('CF-Connecting-IP') || 'unknown';
    const { success } = await env.LIMIT.limit({ key: address });
    if (!success) return json({ error: 'too many questions' }, 429);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'bad request' }, 400);
    }
    const question = typeof body.question === 'string' ? body.question.trim().slice(0, MAX_QUESTION) : '';
    if (!question) return json({ answer: null });
    const site = notes(strings(body.answers, MAX_ANSWERS), strings(body.pages, MAX_PAGES));

    // The exchange before this one, so a follow-up such as "why?" has something to refer to.
    const prev = body.previous;
    const before = prev && typeof prev.question === 'string' && typeof prev.answer === 'string'
      ? [{ role: 'user', content: prev.question.slice(0, MAX_QUESTION) }, { role: 'assistant', content: prev.answer.slice(0, MAX_REPLY) }]
      : [];

    let out;
    try {
      out = await env.AI.run(env.MODEL, {
        messages: [
          { role: 'system', content: `${RULES}\n\nAbout Parker\n${PERSONA}\n\nFrom the site\n${site || '(nothing on the site matched this question)'}` },
          ...before,
          { role: 'user', content: question },
        ],
        max_tokens: 300,
        temperature: 0.6,
        // Gemma thinks before answering by default, which spends the whole token budget on notes to itself.
        chat_template_kwargs: { enable_thinking: false },
      });
    } catch (e) {
      console.error(e);
      return json({ error: 'model unavailable' }, 503);
    }
    const text = String(out?.response ?? out?.choices?.[0]?.message?.content ?? '').trim();
    return json({ answer: text ? text.slice(0, MAX_REPLY) : null, neurons: out?.usage?.neurons });
  },
};
