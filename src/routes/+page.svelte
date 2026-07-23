<script lang="ts">
	import { browser } from '$app/environment';
</script>

<svelte:head>
	<title>Ihsan Mohamad</title>
	<meta http-equiv="refresh" content="0;url=/en/" />
</svelte:head>

{#if browser}
	<script>
		window.location.replace('/en/');
	</script>
{/if}

<noscript>
	<p><a href="/en/">Continue to /en/</a></p>
</noscript>