# Redesign plan (branch `redesign`)

Status on 2026-11-04. Nothing here is on main. Nothing is pushed yet.

## What is already on this branch

- Home: name, one line, affiliations and links on the left; every page newest first on the right.
- Guide: a question box that ranks the site's pages (BM25 over titles, descriptions and logs, with a synonym table) and
  answers from the ranking alone. An opt-in button loads SmolLM2-360M in the browser to phrase the answer. Untested end to
  end: this environment blocks huggingface.co and cdn.jsdelivr.net.
- Reading dial: `literacy: true` on a page shows "Read as: plain | full". `<Plain plain=…>` swaps passages,
  `<Full>` drops them at the plain level. Education, not advice is the pilot; every section has a plain version.

## Next: the home becomes an empty chat window

Decided in conversation, to be drawn out by Parker:

1. The list on the right loses its descriptions. Each row is a date and a title, nothing else. (Open: whether the list
   stays on the home at all or lives behind the chat.)
2. The home reads like a chatbot's home screen: name on the left, an empty chat window as the main thing. The first
   message a visitor types is how they find things.
3. Replace the 270 MB language model with a small embedding model only ("just a little embedding"):
   - `Xenova/all-MiniLM-L6-v2`, quantized, about 23 MB, loaded on the visitor's first keystroke, cached by the browser.
   - Page vectors are computed at build time by a script (`npm run embed`, writes `lib/embeddings.json`) from the same
     corpus the ranker uses, so the browser only embeds the visitor's question and takes cosine similarity.
   - BM25 stays as the instant answer before the model has loaded and as a blend for exact-word queries.
   - The chat window shows the top pages as the reply, with one line each drawn from the page's own description.
     No generated prose, so nothing to hallucinate.
4. Keep the reading dial as is, and add it to Circumstance-sensitive triage and Pereste Health once the mechanism is
   approved.

## Open questions for Parker

- The drawing of the chat home.
- Whether the chat replies should ever include generated text (model) or only pages (embedding only). Current plan: pages only.
- Which pages get the reading dial next.
- Preview deploy: a second Pages job publishing this branch under `/next/` is possible once pushing is allowed.

## How to run it locally

```bash
git fetch origin redesign && git checkout redesign
npm install
npm run dev
```

Home at http://localhost:3000, the dial at http://localhost:3000/education-not-advice.
