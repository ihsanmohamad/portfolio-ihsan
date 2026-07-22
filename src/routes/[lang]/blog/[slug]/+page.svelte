<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { getI18nContext } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const i18n = getI18nContext();
	const messages = $derived(i18n.messages);
</script>

<section class="border-b border-brand-border pt-32 pb-12">
	<div class="container mx-auto px-6 md:px-12">
		<a
			href={i18n.localized('/blog')}
			class="mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-muted uppercase hover:text-brand-accent"
		>
			<ArrowLeft size={14} />
			Back
		</a>
		<p class="mb-4 text-xs font-bold tracking-widest text-brand-accent uppercase">
			{data.post.category}
		</p>
		<h1
			class="font-display text-5xl leading-tight font-bold tracking-tight text-brand-ink md:text-7xl"
		>
			{data.post.title}
		</h1>
		<p class="mt-4 text-sm text-brand-muted">
			{data.post.author} · {data.post.publishedAt} · {data.post.readingMinutes}
			{messages.blog.minuteRead}
		</p>
	</div>
</section>

<section class="bg-white py-24">
	<div class="container mx-auto max-w-3xl px-6 md:px-12">
		<p class="text-lg leading-relaxed text-brand-ink">{data.post.excerpt}</p>
	</div>
</section>
