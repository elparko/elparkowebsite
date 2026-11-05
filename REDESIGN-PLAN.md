# Redesign plan (branch `redesign`)

Status on 2026-11-04. Nothing here is on main. The branch is pushed to origin.

## What is on this branch

- Home: two full screens, as in the first version of the site. Between them the page settles on one: scrolling down more
  than a quarter of the way lands on the second screen, less returns to the top, and scrolling up works the same in
  reverse (`useSnapBetween` in `pages/index.js`). Below the top of the second screen, scrolling is free. The first is always dark:
  the name, "Medical student, builds things." and a link to Pereste Health, Inc. on the left, the links (CV, GitHub, X,
  Email, About this site) stacked on the right, and one centered search bar that becomes a chat window after the first
  question. The second follows the site theme and shows every page as a card, grouped by type (Research, Projects,
  Company, Builds, Web, Essays, Art, Log), newest first, with dates as month, day, year. On a phone the links sit in a
  row under the search.
- Dark mode on every page: colors come from variables in `styles/globals.css`, it follows the system setting, and a
  round sun or moon button in the bottom-right corner of every page saves a choice that `pages/_document.js` applies
  before first paint. A back-to-top arrow appears above it after scrolling. Both are mounted once in `pages/_app.js` and
  sit above the footer strip on the writing pages. In dark mode the home's first screen goes a step darker than the
  second.
- Each page in `lib/pages.mjs` has `topics`: words a visitor might use for it that the title and description lack (the
  CV lists education, schools, jobs and awards). Topics go into the word index and the embedded text. A reply also lists
  up to two of the top page's `related` pages under "Related".
- Search tolerates typos ("sauana", "lipdis"), matches the start of a word ("spectro"), and no longer mistakes topic
  questions that contain "email", "reach" or "latest" for a contact or "what's new" request.
- The reading dial changes only the words: both levels use the same alignment, size and line height. Writing pages are
  now left-aligned at both levels instead of justified.
- Home chat: the visitor types a question and the reply is the pages that match, each with its own description. Nothing
  is generated, so nothing can be made up.
  - Meaning: `Xenova/all-MiniLM-L6-v2` (q8, 23 MB) loads from the Hugging Face hub on the visitor's first keystroke and
    is cached by the browser. The runtime is `transformers.min.js` 4.3.2 from jsDelivr (the `.web` builds import
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
