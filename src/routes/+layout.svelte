<script lang="ts">
	import './layout.css';
	import SiteChrome from '$lib/components/SiteChrome.svelte';
	import { page } from '$app/state';
	import { MESSAGES, isLocale, setI18nContext, type I18nContext, type Locale } from '$lib/i18n';

	let { children } = $props();

	// Root always renders English — there's no locale in the URL.
	const locale = $derived('en' as Locale);
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
			/* LanguageToggle owns the toggle */
		}
	};

	setI18nContext(i18n);
</script>

<svelte:head>
	<title>Ihsan Mohamad — Open to interesting projects</title>
	<meta name="description" content={messages.home.buildTogetherDescription} />
</svelte:head>

<SiteChrome>
	{@render children()}
</SiteChrome>
