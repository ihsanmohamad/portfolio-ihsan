<script lang="ts">
	import './../layout.css';
	import { page } from '$app/state';
	import {
		MESSAGES,
		setI18nContext,
		type I18nContext,
		type Locale
	} from '$lib/i18n';

	let { children } = $props();

	const locale = $derived(page.params.lang as Locale);
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
	<title>Ihsan Mohamad — {locale === 'ms-MY' ? 'Perihal Saya' : 'Software Developer'}</title>
</svelte:head>

{@render children()}