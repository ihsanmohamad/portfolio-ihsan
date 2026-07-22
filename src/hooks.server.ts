import { redirect, type Handle } from '@sveltejs/kit';
import { isLocale } from '$lib/i18n';

const PUBLIC_PREFIXES = ['/admin', '/favicon', '/uploads', '/_app'];
const LOCALE_PATTERN = /^\/(en|ms-MY)(?:\/|$)/;

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return resolve(event);
	}

	if (!LOCALE_PATTERN.test(pathname)) {
		const cookieLocale = event.cookies.get('portfolio-locale') ?? null;
		const locale = isLocale(cookieLocale) ? cookieLocale : 'en';
		const rest = pathname === '/' ? '' : pathname;
		redirect(307, `/${locale}${rest}`);
	}

	return resolve(event);
};
