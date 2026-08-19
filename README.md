# Miami Debt Help — Site Framework

This is the real, buildable Astro project for miamidebthelp.com — replacing the
static HTML prototype and the original WordPress plan. This README is the
step-by-step framework: what's done, what's next, and how to not miss
anything along the way.

## What's actually here right now

- **6 working pages**, built and verified: English homepage, Spanish homepage,
  2 English articles, 2 Spanish articles (natively written, not translated)
- **Bilingual routing** — English at `/`, Spanish at `/es/`, with correct
  hreflang tags cross-linking every page pair
- **A content collection system** — new articles are Markdown/MDX files with
  typed frontmatter, not hand-edited HTML pages
- **The full design system** ported from the validated prototype — same
  colors, type, situation-picker, verification-record pattern, article
  formats (warning cards, at-a-glance boxes, source cards)
- **Schema.org markup** on every page (WebSite, FAQPage, Article,
  BreadcrumbList) generated automatically from the content
- **A sitemap and robots.txt**, generated automatically on every build
- **A GA4 analytics tag** in the shared layout — currently a placeholder ID

## What's NOT here yet (see "Next steps" below)

- Real listings (directory category pages, individual listing pages) —
  the prototype's listing/verification-record page hasn't been ported into
  this project yet
- A working submit-a-listing form (needs a form backend wired in)
- Search Console / Bing Webmaster verification
- A real GA4 measurement ID
- Deployment — this only exists as a local build right now

---

## The framework: how to not miss anything

Use this as the checklist for every future work session on this site,
whether that's you, me in chat, or Claude Code.

### 1. Before adding anything — confirm it belongs

Check `docs/strategy-brief.md` (see below) — specifically Section 10
(Page-Count Discipline). Every new page must pass:
- Does it answer a question no existing page fully answers?
- Is it genuinely distinct, not a thin variation with a location swapped in?
- Is there a real, sourced difference in content, not just phrasing?

If the honest answer to any of those is no, it's a new section on an
existing page, not a new URL.

### 2. Adding a new article (the repeatable process)

1. Research first, using live search — never trust older research documents
   blindly (we caught a stale fact this way on the medical-debt article; it
   had actually changed since the original brief was written)
2. Write the English version as a new `.mdx` file in
   `src/content/articles/en/`, following the frontmatter schema in
   `src/content.config.ts` — required fields: title, metaDescription, lang,
   translationKey, category, dates, sources, readTime
3. Use the reusable content patterns from `src/styles/article-patterns.css`
   (`.glance-box`, `.warn-card`, `.case-box`, `.source-card`) — copy the
   HTML structure from an existing article rather than inventing new markup
4. **Do not translate the English version.** Research and write the Spanish
   version independently as its own `.mdx` file in
   `src/content/articles/es/`, using the **same `translationKey`** as the
   English article — that's what makes the language toggle and hreflang
   auto-link correctly
5. Run `npm run build` and check the output — confirm the language toggle
   and breadcrumb schema resolve to the right URLs before considering it done
   (we found real bugs here — see "Known gotchas" below)
6. A Spanish-fluent human reviews the Spanish draft before it's considered
   final — this is the one step in the pipeline that stays manual

### 3. Adding a new listing (once the directory is ported)

Not yet buildable — the listing content collection schema exists in
`src/content.config.ts` but no listing pages/templates have been built in
this project yet. This is next.

### 4. Before every deploy

- [ ] Run `npm run build` locally, confirm zero errors
- [ ] Spot-check that new pages appear in `dist/sitemap-0.xml`
- [ ] Confirm hreflang pairs resolve correctly for any new bilingual content
- [ ] Confirm no placeholder text (`[date]`, `TODO`, etc.) shipped

### 5. Analytics & search tools — how to wire them in

- **GA4**: replace `G-XXXXXXX` in `src/layouts/BaseLayout.astro` (two
  places) with the real measurement ID from Google Analytics
- **Google Search Console**: add a verification `<meta>` tag or DNS record
  once the site has a live domain — this is also where the brief's
  generative-AI visibility reporting lives (Section 12.3 of the strategy
  brief), so don't skip it
- **Bing Webmaster Tools**: same idea — separate verification, separate
  dashboard, and per the brief this is where AI citation-share reporting
  shows up

### 6. Forms (submit-a-listing, question box)

Not yet wired. Plan: a lightweight service like Formspree or Web3Forms —
the form posts directly to their endpoint, no backend to build or maintain.
This needs to happen before the submit-a-listing page goes live for real.

---

## Known gotchas (found and fixed once — don't reintroduce)

- **Language toggle bug**: the toggle must point EN to the current English
  URL (via `altLangPath` when on a Spanish page) and ES to the current
  Spanish URL, not hardcode `/` and `/es/`. Fixed in `BaseLayout.astro` — if
  this breaks again on a new page type, check that `altLangPath` is being
  passed correctly from the page into the layout.
- **Spanish URL segment mismatch**: English guide URLs use `/guides/`,
  Spanish uses `/guias/` — these are NOT the same word and every reference
  (breadcrumbs, nav, schema) needs the locale-aware ternary, not a shared
  `${base}/guides/` string. Search for "guides" and "guias" across layouts
  if adding new sections that link to the guides index.

---

## Local development

```bash
npm install       # first time only
npm run dev       # local dev server with hot reload
npm run build     # production build, outputs to dist/
npm run preview   # serve the production build locally to sanity-check it
```

## Deployment (not done yet — next step)

Recommended: Netlify or Vercel, both have a free tier that comfortably
covers this site. Either one:
1. Connect the Git repo
2. Build command: `npm run build`
3. Output directory: `dist`
4. Point the custom domain (miamidebthelp.com) at it via DNS

This is the natural handoff point to Claude Code — once this project is in
a real Git repo, Claude Code can run the actual git init, push, and
platform CLI commands directly against your machine, which isn't possible
from this chat environment.

## Reference documents

- `docs/strategy-brief.md` — the full SEO/AEO strategy brief (Now/Next/Later
  horizons, keyword clusters, compliance guardrails). Read Section 10 before
  adding any new page. Read Section 13.2 ("hard lines") before writing
  anything that touches monetization or provider claims.
