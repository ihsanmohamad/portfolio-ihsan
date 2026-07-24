<script lang="ts">
	import AboutContent from '$lib/components/AboutContent.svelte';
	import BlogContent from '$lib/components/BlogContent.svelte';
	import ContactContent from '$lib/components/ContactContent.svelte';
	import ProjectsContent from '$lib/components/ProjectsContent.svelte';
	import { defaultSlugFor } from '$lib/constants';
	import { SITE_ORIGIN } from '$lib/i18n';
	import { getI18nContext, isLocale } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const i18n = getI18nContext();
	const locale = $derived(i18n.locale);
	const canonical = $derived(data.canonical);
	const canonicalHref = $derived(`${SITE_ORIGIN}/${locale}/${defaultSlugFor(canonical)}`);
</script>

<svelte:head>
	<link rel="canonical" href={canonicalHref} />
</svelte:head>

{#if canonical === 'about'}
	<AboutContent />
{:else if canonical === 'projects'}
	<ProjectsContent />
{:else if canonical === 'blog'}
	<BlogContent />
{:else if canonical === 'contact'}
	<ContactContent />
{/if}
