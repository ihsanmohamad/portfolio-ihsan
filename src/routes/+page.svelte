<script lang="ts">
	import { browser } from '$app/environment';
	import { SITE_ORIGIN } from '$lib/i18n';
</script>

<svelte:head>
	<title>Ihsan Mohamad</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="robots" content="noindex" />
	<link rel="canonical" href={SITE_ORIGIN + '/en/'} />
	<meta http-equiv="refresh" content="0;url=/en/" />
	<style>
		:root {
			--bg: #fcfaf7;
			--ink: #0f172a;
			--muted: #475569;
			--accent: #f97316;
		}
		html,
		body {
			height: 100%;
			margin: 0;
		}
		body {
			font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
			background: var(--bg);
			color: var(--ink);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 2rem;
		}
		.card {
			max-width: 32rem;
			text-align: center;
		}
		.eyebrow {
			font-size: 0.75rem;
			font-weight: 700;
			letter-spacing: 0.3em;
			text-transform: uppercase;
			color: var(--accent);
			margin-bottom: 1.5rem;
		}
		h1 {
			font-family: 'Syne', 'Space Grotesk', sans-serif;
			font-size: clamp(2.5rem, 8vw, 4.5rem);
			font-weight: 700;
			line-height: 0.95;
			margin: 0 0 1.5rem;
		}
		h1 em {
			font-weight: 400;
			font-style: italic;
		}
		p {
			font-size: 1.125rem;
			line-height: 1.625;
			color: var(--muted);
			margin: 0 0 2rem;
		}
		.btn {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			padding: 1rem 2.5rem;
			border-radius: 9999px;
			font-size: 0.75rem;
			font-weight: 700;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			text-decoration: none;
			background: var(--ink);
			color: var(--bg);
			transition: background 0.2s, color 0.2s;
		}
		.btn:hover {
			background: var(--accent);
			color: #000;
		}
	</style>
</svelte:head>

{#if browser}
	<script>
		window.location.replace('/en/');
	</script>
{/if}

<main class="card">
	<p class="eyebrow">Redirecting</p>
	<h1>One moment <em>please.</em></h1>
	<p>Taking you to the English home page.</p>
	<a class="btn" href="/en/">Continue</a>
</main>