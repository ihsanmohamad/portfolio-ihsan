import { error, redirect } from '@sveltejs/kit';
import { getNavSlugMap } from '$lib/constants';
import { isLocale } from '$lib/i18n';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const locale = isLocale(params.lang) ? params.lang : 'en';
	const map = getNavSlugMap()[locale];
	const canonical = map[params.slug];
	if (!canonical || canonical === params.slug) {
		error(404, 'Not found');
	}
	redirect(307, `/${locale}/${canonical}`);
};
