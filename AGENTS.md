# AGENTS.md — SvelteKit + Sveltia CMS, fully static SSG

> You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:
>
> ## Available MCP Tools:
>
> ### 1. list-sections
>
> Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
> When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.
>
> ### 2. get-documentation
>
> Retrieves full documentation content for specific sections. Accepts single or multiple sections.
> After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then fetch ALL relevant sections for the user's task.
>
> ### 3. svelte-autofixer
>
> Analyzes Svelte code and returns issues and suggestions.
> You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.
>
> ### 4. playground-link
>
> Generates a Svelte Playground link with the provided code.
> After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

# Project rules

This is a **fully static site generator (SSG)**. There is no SSR, no SPA fallback, no
server-side runtime. `vite build` produces a `build/` directory of static HTML
files that any static host (Temps, Netlify, Cloudflare Pages, GitHub Pages, etc.)
serves directly.

**Do not** introduce SSR, dynamic API routes, or `+server.js` files. If a feature
appears to need a server, it's wrong — solve it at build time.

# Build pipeline

1. `vite build` — SvelteKit prerenders every page to `build/`.
2. Output is a directory tree of `.html` files at known URLs. Static host serves
   them as-is. Any URL without a matching file is served `build/404.html`.

# Routing model

Two URL shapes only:

| Shape                      | Example                                 | Source                                         |
| -------------------------- | --------------------------------------- | ---------------------------------------------- |
| `/[lang]/<slug>`           | `/en/about`, `/ms-MY/tentang`            | `site/{{locale}}/nav.yaml` slug field          |
| `/[lang]/projects/[slug]`  | `/en/projects/palm-management`          | `content/projects/{{locale}}/*.md` frontmatter |

**Every page is generated from CMS data.** No hard-coded content in TS files
(except UI chrome strings in `src/lib/i18n.ts` — those are *translations* of
fixed UI labels, not page content).

`src/routes/[lang]/[slug]/+page.ts` is the dispatcher:

- `entries()` enumerates every `(lang, slug)` combination from
  `getNavSlugMap()` plus the canonical defaults (`about`, `projects`, `blog`,
  `contact`).
- `load()` looks the slug up in `getNavSlugMap()` to get the canonical page
  key, then renders one of `AboutContent` / `ProjectsContent` /
  `BlogContent` / `ContactContent`.

# How to add a new page (e.g. `/[lang]/speaking`)

1. Add a new item to `static/admin/config.yml` `site_nav.fields.items.fields`
   with `id: speaking` (and don't forget `i18n: true` on the fields).
2. Add `speaking: 'speaking'` to `NAV_ITEM_TO_PAGE` in
   `src/lib/constants.ts` (and the `CanonicalPage` union in `src/lib/types.ts`).
3. Add the default slug `'speaking'` to `DEFAULT_NAV_SLUGS` in
   `src/lib/constants.ts`.
4. Create `src/lib/components/SpeakingContent.svelte` with the page markup
   (it can call `getProfile`, `getExperience`, etc. — those loaders are
   already locale-aware).
5. Add a `speaking` case to the `{#if canonical === ...}` switch in
   `src/routes/[lang]/[slug]/+page.svelte`.

That's it. `npm run build` now generates `/en/speaking`, `/ms-MY/speaking`,
`/en/speak-at-conferences` (or whatever Malay slug the CMS author types),
etc., all from one route.

# How to add a new content collection (e.g. talks)

1. Add the collection to `static/admin/config.yml` under `collections:`.
2. Add a glob + map function in `src/lib/constants.ts` (see `buildCollectionByLocale` for the pattern).
3. Add a getter like `getTalks(locale): Talk[]`.
4. If talks get their own URL pattern (`/[lang]/talks/[slug]`), add a dynamic
   route under `src/routes/[lang]/talks/[slug]/+page.ts` with `entries()` returning
   every `(lang, talk-slug)` from the CMS.
5. If talks are listed on an existing page, just import the getter and iterate.

# Root URL: keep the meta-refresh, optionally add a host-level redirect

`src/routes/+page.svelte` is a SvelteKit-prerendered meta-refresh HTML at
`/` that bounces visitors to `/en/`. Keep it as a portability safety net.

- It works on every static host (Netlify, Cloudflare Pages, GH Pages, etc.)
  with no extra config.
- It survives host-config mistakes.
- JS-enabled users redirect via `window.location.replace` and don't see the
  page; non-JS users see a small "One moment please" card.

For the fastest possible experience, the host (Temps, Netlify, etc.)
can also issue a server-level 301/302 from `/` to `/en/`:

- Temps: add a `301 redirect` rule in the site config (or a `_redirects` file
  at the static root).
- Netlify: add a `_redirects` file.
- Cloudflare Pages: add a `_redirects` file.
- nginx: add a `return 301` to the server block.

Both layers together is defense in depth. If the user moves to a host
that doesn't have the redirect configured, the meta-refresh still works.

# i18n — how locales work

- **Locales**: `en`, `ms-MY`. Add a new locale by appending to `i18n.locales`
  in `static/admin/config.yml` and `LOCALE_OPTIONS` in `src/lib/constants.ts`.
- **Default locale is `en`** and is **always URL-prefixed** (`/en/...`), not
  served at the root. The root `/` is a meta-refresh redirect to `/en/`.
- **All UI chrome strings** (nav labels, headings, CTAs) come from
  `MESSAGES[locale]` in `src/lib/i18n.ts`. This is the *only* file that contains
  hard-coded page copy. Add a new string by extending the `Messages` interface
  and both `MESSAGES.en` and `MESSAGES['ms-MY']`.
- **Content (profile summary, experience, projects, blog posts, etc.) is never
  hard-coded.** It comes from the CMS, loaded per-locale from
  `src/content/<collection>/<locale>/...` files.

# URL slug handling

Nav items in the CMS have a `slug` field per locale (e.g. English `about`,
Malay `tentang`). The slug is the URL segment in that locale.

- `getNavSlugMap()` (in `src/lib/constants.ts`) builds
  `Record<Locale, Record<slug, CanonicalPage>>` from `site/nav.yaml`.
- `[lang]/[slug]/+page.ts` uses it to resolve the canonical page from the slug
  in the URL.
- When the user clicks the language toggle, `swapLocaleInPath(path, next, slugMap)`
  in `src/lib/i18n.ts` substitutes both the locale *and* the slug, so toggling
  EN↔BM at `/en/about` takes you to `/ms-MY/tentang` (and vice versa).
- If a user visits `/en/projects/palm-management`, that's a project-detail URL
  handled by the project-specific route — not the slug dispatcher.

# Locale-prefix redirect (root hook)

`src/hooks.server.ts` redirects any URL without a locale prefix to
`/en/...` (or `/ms-MY/...` if the user has a `portfolio-locale=ms-MY` cookie).
It runs at build time for every prerendered request, so a bare `/about` in
the crawler becomes `/en/about` in the output.

**Public prefixes** that must NOT be redirected: `/`, `/admin`, `/favicon`,
`/uploads`, `/_app`. The root `/` is served by the meta-refresh
`src/routes/+page.svelte`; everything else is static.

# Build-time prerender — what generates what

- `svelte.config.js` declares `prerender.entries: ['/', '/en', '/ms-MY']` as the
  three entry points. SvelteKit's crawler follows links from there and
  prerenders every reachable page.
- `[lang]/[slug]/+page.ts.entries()` returns every `(lang, slug)` from
  `getNavSlugMap()` plus canonical fallbacks. Without this, the dynamic
  route would never be prerendered and `/en/about` etc. would 404 in the
  static output.
- `[lang]/projects/[slug]/+page.ts.entries()` returns every `(lang, project-slug)`
  from `getProjects()` — same pattern, deeper route.
- `[lang]/blog/[slug]/+page.ts.entries()` returns every `(lang, post-slug)`
  from `getPosts()`.

# Don't do this

- **Don't** add a `+server.js` or `+page.server.js` — there's no server.
- **Don't** add `prerender = false` to any route — every route is prerendered.
- **Don't** add `csr: false` to a route that should hydrate (e.g. a new
  interactive widget). The toggle already relies on JS.
- **Don't** add a `reroute` hook to translate URLs at request time. Static
  hosts don't run JS hooks — they just serve files. Use the
  `[lang]/[slug]/+page.ts` dispatcher so every slug variant is its own
  prerendered file.
- **Don't** put page copy (project descriptions, blog posts, profile
  summary) in `src/lib/i18n.ts`. That's for UI chrome. Page content lives
  in the CMS, keyed by locale.

# Verifying a build

```bash
npm run check   # svelte-check
npm run lint    # prettier + eslint
npm run build   # vite build
```

The build should complete in <30s and produce a `build/` tree that includes
`en/`, `ms-MY/`, an `index.html` (meta-refresh to `/en/`), a `404.html`,
and the `_app/` asset directory.
