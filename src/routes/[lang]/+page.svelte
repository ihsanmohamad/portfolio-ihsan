<script lang="ts">
	import { page } from '$app/state';
	import HomeContent from '$lib/components/HomeContent.svelte';
	import { isLocale, SITE_ORIGIN, type Locale } from '$lib/i18n';

	const locale = $derived(page.params.lang as Locale);
	const canonical = $derived(
		SITE_ORIGIN + (isLocale(locale) ? `/${locale}/` : '/en/')
	);
</script>

<svelte:head>
	<title>Ihsan Mohamad — {locale === 'ms-MY' ? 'Pemaju Perisian' : 'Software Developer'}</title>
	<link rel="canonical" href={canonical} />
</svelte:head>

<HomeContent {locale} />