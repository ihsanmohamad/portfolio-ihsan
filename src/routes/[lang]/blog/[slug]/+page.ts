import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/constants';
import { isLocale } from '$lib/i18n';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const locale = isLocale(params.lang) ? params.lang : 'en';
	const post = getPosts(locale).find((p) => p.slug === params.slug);
	if (!post) error(404, 'Post not found');
	return { post };
};
