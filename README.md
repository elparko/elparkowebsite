# elparko.com

Parker Smith's site. Next.js static export, deployed to GitHub Pages on every push to `main`.

## Local development

```bash
npm install
npm run dev
```

## Adding a page

1. Add an entry to `PAGES` in `lib/pages.mjs`: slug, title, description, area, status, authorship (`human`, `ai-edited`, `ai-drafted`), model (for AI bylines), created, updated, related, and a dated `log`. Add `image` to put a photo on the X preview card.
2. Create `pages/<slug>.js` wrapped in `WritingLayout`.
3. Run `npm run og` to draw the X preview card into `public/og/<slug>.png`. It uses the locally installed Google Chrome.

`npm run build` fails if a page has no preview card. It also rebuilds `lib/backlinks.json` from the internal links in each page.
