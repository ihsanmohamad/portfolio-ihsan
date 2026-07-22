import type { Locale } from '$lib/i18n';

export const match = (param: string): param is Locale => param === 'en' || param === 'ms-MY';
