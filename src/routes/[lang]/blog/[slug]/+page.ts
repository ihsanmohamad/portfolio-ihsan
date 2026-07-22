import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/constants';
import { LOCALE_OPTIONS, isLocale } from '$lib/i18n';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	const result: Array<{ lang: string; slug: string }> = [];
	for (const { code } of LOCALE_OPTIONS) {
		if (!isLocale(code)) continue;
		for (const post of getPosts(code)) {
			result.push({ lang: code, slug: post.slug });
		}
	}
	return result;
};

export const load: PageLoad = ({ params }) => {
	const locale = isLocale(params.lang) ? params.lang : 'en';
	const post = getPosts(locale).find((p) => p.slug === params.slug);
	if (!post) error(404, 'Post not found');
	return { post };
};
