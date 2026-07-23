<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { getProfile, getSiteFooter } from '$lib/constants';
	import SiteChrome from '$lib/components/SiteChrome.svelte';
	import {
		MESSAGES,
		setI18nContext,
		type I18nContext,
		type Locale
	} from '$lib/i18n';
	import { getNavItems } from '$lib/constants';

	let { children } = $props();

	const locale = $derived('en' as Locale);
	const profile = $derived(getProfile(locale));
	const navItems = $derived(getNavItems(locale));
	const siteFooter = $derived(getSiteFooter(locale));
	const messages = $derived(MESSAGES[locale]);

	const i18n: I18nContext = {
		get locale() {
			return locale;
		},
		get messages() {
			return messages;
		},
		localized: (path: string) => `/${locale}${path === '/' ? '' : path}`,
		setLocale: () => {
			/* Root page is always English; LanguageToggle is rendered disabled-style */
		}
	};

	setI18nContext(i18n);
</script>

<svelte:head>
	<title>{profile.name} — {profile.tagline}</title>
	<meta name="description" content={profile.summary} />
</svelte:head>

<SiteChrome {profile} {navItems} {siteFooter}>
	{@render children()}
</SiteChrome>