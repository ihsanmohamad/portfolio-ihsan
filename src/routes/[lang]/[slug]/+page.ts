import { error } from '@sveltejs/kit';
import { defaultSlugFor, getNavSlugMap } from '$lib/constants';
import { LOCALE_OPTIONS, isLocale } from '$lib/i18n';
import type { CanonicalPage } from '$lib/types';
import type { EntryGenerator, PageLoad } from './$types';

const CANONICAL_PAGES: CanonicalPage[] = ['about', 'projects', 'blog', 'contact'];

export const prerender = true;

export const entries: EntryGenerator = () => {
	const result: Array<{ lang: string; slug: string }> = [];
	for (const { code } of LOCALE_OPTIONS) {
		if (!isLocale(code)) continue;
		const map = getNavSlugMap()[code];
		for (const page of CANONICAL_PAGES) {
			const slug = map[page] ?? defaultSlugFor(page);
			if (!result.some((r) => r.lang === code && r.slug === slug)) {
				result.push({ lang: code, slug });
			}
		}
		for (const slug of Object.keys(map)) {
			if (!result.some((r) => r.lang === code && r.slug === slug)) {
				result.push({ lang: code, slug });
			}
		}
	}
	return result;
};

export const load: PageLoad = ({ params }) => {
	if (!isLocale(params.lang)) error(404, 'Not found');
	const map = getNavSlugMap()[params.lang];
	let canonical = map[params.slug];
	if (!canonical) {
		const match = CANONICAL_PAGES.find((p) => defaultSlugFor(p) === params.slug);
		if (match) canonical = match;
	}
	if (!canonical) error(404, 'Not found');
	return { canonical };
};
