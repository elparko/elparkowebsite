# Redesign plan (branch `redesign`)

Status on 2026-11-04. Nothing here is on main. The branch is pushed to origin.

## What is on this branch

- Home (rebuilt 2026-11-09): one page that scrolls, with no scripted snapping. From the top: the name, "Medical
  student; builds things." and a link to Pereste Health, Inc. on the left with the links (CV, GitHub, X, Email, About
  this site) in a row on the right; one centered search bar; four featured pages with their drawings under "Start
  here" (the triage study, Education, not advice, SMILE-MSI, Pereste Health; the list is `FEATURED` in
  `pages/index.js`); then every page as a card, grouped by type (Research, Company, Projects, Builds, Web, Essays, Art,
  Log), newest first.
  - Typing in the search bar narrows the page list at once, using the word ranker and a match on the letters of each
    title and description. This needs no model. The featured pages hide while a filter is typed.
  - Five questions with written answers sit under the search bar as buttons (three on a phone; `STARTERS` in
    `components/HomeChat.js`). Picking one opens the chat window with that answer and needs no model.
  - Pressing Enter sends the text as a question and the search bar becomes the chat window.
- Dark mode on every page: colors come from variables in `styles/globals.css`, it follows the system setting, and a
  round sun or moon button in the bottom-right corner of every page saves a choice that `pages/_document.js` applies
  before first paint. A back-to-top arrow appears above it after scrolling. Both are mounted once in `pages/_app.js` and
  sit above the footer strip on the writing pages.
- Each page in `lib/pages.mjs` has `topics`: words a visitor might use for it that the title and description lack (the
  CV lists education, schools, jobs and awards). Topics go into the word index and the embedded text. A reply also lists
  up to two of the top page's `related` pages under "Related".
- Written answers: `lib/answers.mjs` holds 99 pre-answered questions drafted from the pages (each with 5 to 7
  phrasings, the answer, and links), plus 6 personal ones with empty answers for Parker to fill in. Once the model
  has loaded, a question gets a written answer directly when it is close in meaning to a phrasing, its own words
  appear in that entry, and no other entry is about as close. Otherwise up to three entries are offered as buttons.
  On 196 reworded test questions (remeasured 2026-11-09): 37 answered directly and correctly, 4 given a closely
  related entry's answer, 99 offered the right question, 50 listed the right page without the entry, 8 found nothing
  useful; none of 25 off-topic questions got an answer. Answer vectors
  (`lib/answer-vectors.json`, signed bytes, 181 KB compressed) load only after the model.
- Search tolerates typos ("sauana", "lipdis"), matches the start of a word ("spectro"), and no longer mistakes topic
  questions that contain "email", "reach" or "latest" for a contact or "what's new" request.
- The reading dial changes only the words: both levels use the same alignment, size and line height. Writing pages are
  now left-aligned at both levels instead of justified.
- Home chat: the visitor types a question and the reply is the pages that match, each with its own description. Nothing
  is generated, so nothing can be made up.
  - Meaning: `Xenova/all-MiniLM-L6-v2` (q8, 24 MB with its tokenizer) loads from the Hugging Face hub when the visitor
    sends a first typed question, and is cached by the browser. The runtime is `transformers.min.js` 4.3.2 from jsDelivr (the `.web` builds import
    onnxruntime by bare name and do not load without a bundler). The browser embeds only the question.
  - Page vectors: `npm run embed` writes `lib/embeddings.json` from each page's title and description. `npm test` fails
    and `npm run dev` / `npm run build` warn when a title or description changed after the last embed. Changing `topics` needs `npm run embed` too.
  - Words: BM25 over titles, descriptions and logs, with the synonym table. It answers at once when the word match is
    strong. Weaker questions wait the second or two for the model. If the model cannot load, BM25 answers alone.
  - The two rankings are fused by rank position. A question matches nothing when the best page scores under 0.2 in
    cosine similarity and the word match is weak; it then gets a fixed "nothing matches" reply and the CV.
  - Fixed replies, no model needed: a greeting, how to contact Parker, and what is newest.
  - Tested in a real browser: the model loads, the browser's vectors equal the build's to four decimals, and the reply
    renders at phone width with no horizontal scroll.
- Reading dial: `literacy: true` on a page shows "Read as: plain | full". `<Plain plain=…>` swaps passages,
  `<Full>` drops them at the plain level. Education, not advice is the pilot; every section has a plain version.

## Next

1. Add the reading dial to Circumstance-sensitive triage and Pereste Health once the mechanism is approved.

## Open questions for Parker

- The drawing of the chat home. The current layout is a first pass to react to.
- Whether the list stays under the chat or moves behind it.
- Whether the chat replies should ever include generated text. Current answer: pages only.
- Which pages get the reading dial next.
- Preview deploy: a second Pages job publishing this branch under `/next/`.

## How to run it locally

```bash
git fetch origin redesign && git checkout redesign
npm install
npm run dev
```

Home at http://localhost:3000, the dial at http://localhost:3000/education-not-advice. After changing a page's title or
description in `lib/pages.mjs`, run `npm run embed`.
