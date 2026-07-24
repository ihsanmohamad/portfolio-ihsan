<script lang="ts">
	import { page } from '$app/state';
	import HomeContent from '$lib/components/HomeContent.svelte';
	import { SITE_ORIGIN, isLocale, type Locale } from '$lib/i18n';

	let { children } = $props();

	const locale = $derived(page.params.lang as Locale);
	const isValidLocale = $derived(isLocale(locale));

	const canonical = $derived(
		SITE_ORIGIN + (isValidLocale ? `/${locale}/` : '/en/')
	);
</script>

<svelte:head>
	<title>
		Ihsan Mohamad — {locale === 'ms-MY' ? 'Perihal Saya' : 'Software Developer'}
	</title>
	<link rel="canonical" href={canonical} />
</svelte:head>

{#if isValidLocale}
	<HomeContent {locale} />
{:else}
	{@render children()}
{/if}