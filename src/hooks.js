import { getNavSlugMap } from '$lib/constants';
import { isLocale } from '$lib/i18n';

const LOCALE_RE = /^\/(en|ms-MY)(?:\/|$)/;

/** @type {import('@sveltejs/kit').Reroute} */
export function reroute({ url }) {
	const match = url.pathname.match(LOCALE_RE);
	if (!match) return;

	const locale = match[1];
	if (!isLocale(locale)) return;

	const rest = url.pathname.slice(match[0].length - 1) || '/';
	const segment = rest === '/' ? '' : rest.split('/')[1];
	if (!segment) return;

	const slugMap = getNavSlugMap()[locale];
	const canonical = slugMap[segment];
	if (canonical && canonical !== segment) {
		return `/${locale}/${canonical}${rest.slice(segment.length + 1)}`;
	}
}
