<script lang="ts">
	import { browser } from '$app/environment';
</script>

<svelte:head>
	<title>Ihsan Mohamad</title>
	<meta http-equiv="refresh" content="0;url=/en/" />
</svelte:head>

{#if browser}
	<script>
		(() => {
			const match = document.cookie.match(/(?:^|;\s*)portfolio-locale=([^;]+)/);
			const locale = match && match[1] === 'ms-MY' ? 'ms-MY' : 'en';
			if (window.location.pathname === '/') {
				window.location.replace(`/${locale}/`);
			}
		})();
	</script>
{/if}

<main
	class="flex min-h-screen items-center justify-center bg-brand-bg p-8 font-sans text-brand-ink"
>
	<div class="max-w-md text-center">
		<p class="mb-4 font-display text-2xl">Redirecting…</p>
		<p class="text-sm text-brand-muted">
			Continue to <a class="text-brand-accent hover:underline" href="/en/">English</a> or
			<a class="text-brand-accent hover:underline" href="/ms-MY/">Bahasa Melayu</a>.
		</p>
	</div>
</main>
