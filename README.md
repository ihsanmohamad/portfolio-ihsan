# portfolio-ihsan

Personal portfolio for **Ihsan Mohamad** — Software Developer. Built with SvelteKit + Sveltia CMS (Git-based, edit content through `/admin`).

## Stack

- SvelteKit 2 (static adapter)
- Svelte 5
- Tailwind CSS 4
- [Sveltia CMS](https://sveltiacms.app/) for content editing

## Content collections (editable via Sveltia CMS)

- `site/nav.yaml` — Top navigation
- `site/footer.yaml` — Tagline and social links
- `experience/*.json` — Work history entries
- `projects/*.md` — Personal / side projects (with full case-study body)
- `certifications/*.json` — Certificates and credentials
- `awards/*.json` — Awards and recognitions
- `skills/*.json` — Skill groups
- `posts/*.md` — Optional blog posts

## Develop

```sh
npm install
npm run dev
```

Open http://localhost:5173 and http://localhost:5173/admin for the CMS.

## Build

```sh
npm run build
```

Output is in `/build` (static files) — ready for any static host (Temps, Cloudflare Pages, Netlify, etc.).

## Lint

```sh
npm run lint
npm run check
```
