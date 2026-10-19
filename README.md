# Aditya Singh, portfolio

The source of https://adityasingh.pages.dev: one static page built with Astro, with no
JavaScript, no tracking and no web fonts.

## Run it

```sh
npm install
npm run dev      # http://127.0.0.1:8731, live reload
npm run preview  # builds, then serves dist/ at http://127.0.0.1:8741 with the real _headers (CSP)
```

## Change what it says

Everything the page says is in [`src/data/site.ts`](src/data/site.ts) and
[`src/data/cases.ts`](src/data/cases.ts) (how each project works, its hard part, its numbers):

- add a project: one entry in `projects` (its picker scene, facts, links and media)
- log a release: one line at the top of `shipped`
- jobs, the "Also built" list and contact links sit below them

Screenshots live in `src/assets/` and are turned into AVIF and WebP at build time. Films live in
`public/media/` as 720p MP4 files, because Cloudflare Pages takes files up to 25 MB.

## How it works

- Type: Anek (Ek Type) as one variable font, wide for headings; IBM Plex Mono for dates and code;
  Anek Devanagari, cut to the seven letters of the footer name. Licences in `licenses/`.
- The pulse chart is built from `src/data/commits.json`, commit counts per day across local repos.
- CSS is not minified on purpose: the minifier folds `animation-timeline` into the `animation`
  shorthand, which browsers reject, and every scroll-driven animation disappears.

- The project picker at the top is radio buttons and CSS `:has()`, so it works without
  JavaScript. The phones and browser windows are drawn in CSS around real screenshots.
- `public/_headers` sets a strict Content Security Policy (`default-src 'none'`) and long caching
  for hashed assets.
- Dark mode follows the system setting.

## Deploy

```sh
npm run deploy
```

It builds and runs `wrangler pages deploy dist --project-name adityasingh`. It is a plain static
site on Cloudflare Pages; do not let wrangler convert it to a Worker with a server adapter.
