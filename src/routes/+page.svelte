<script lang="ts">
	import HomeContent from '$lib/components/HomeContent.svelte';
	import { SITE_ORIGIN } from '$lib/i18n';
</script>

<svelte:head>
	<title>Ihsan Mohamad — Software Developer</title>
	<link rel="canonical" href={SITE_ORIGIN + '/en/'} />
</svelte:head>

<HomeContent locale="en" />
