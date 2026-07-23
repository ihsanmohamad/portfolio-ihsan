<script lang="ts">
	import './../layout.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getNavItems, getProfile, getSiteFooter } from '$lib/constants';
	import {
		MESSAGES,
		persistLocale,
		setI18nContext,
		swapLocaleInPath,
		type I18nContext,
		type Locale
	} from '$lib/i18n';

	let { children } = $props();

	const locale = $derived(page.params.lang as Locale);
	const messages = $derived(MESSAGES[locale]);
	const profile = $derived(getProfile(locale));
	const navItems = $derived(getNavItems(locale));
	const siteFooter = $derived(getSiteFooter(locale));

	function navigateToLocale(nextLocale: Locale) {
		if (nextLocale === locale) return;
		persistLocale(nextLocale);
		goto(swapLocaleInPath(page.url.pathname, nextLocale));
	}

	const i18n: I18nContext = {
		get locale() {
			return locale;
		},
		get messages() {
			return messages;
		},
		localized: (path: string) => `/${locale}${path === '/' ? '' : path}`,
		setLocale: navigateToLocale
	};

	setI18nContext(i18n);
</script>

<svelte:head>
	<title>{profile.name} — {profile.tagline}</title>
	<meta name="description" content={profile.summary} />
</svelte:head>

{@render children()}