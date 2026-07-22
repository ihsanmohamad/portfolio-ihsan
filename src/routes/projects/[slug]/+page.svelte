<script lang="ts">
	import type { Component } from 'svelte';
	import { ArrowRight, ArrowLeft, ExternalLink, Github, Calendar } from '@lucide/svelte';
	import { getI18nContext } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const i18n = getI18nContext();
	const messages = $derived(i18n.messages);
	const Markdown = $derived(data.component as Component | undefined);
</script>

<section class="border-b border-brand-border pt-32 pb-12">
	<div class="container mx-auto px-6 md:px-12">
		<a
			href="/projects"
			class="mb-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-muted uppercase hover:text-brand-accent"
		>
			<ArrowLeft size={14} />
			{messages.project.backToAll}
		</a>
		<div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<p class="mb-4 text-xs font-bold tracking-widest text-brand-accent uppercase">
					{data.project.category}
				</p>
				<h1
					class="font-display text-5xl leading-tight font-bold tracking-tight text-brand-ink md:text-7xl"
				>
					{data.project.title}
				</h1>
				<p class="mt-8 max-w-2xl text-xl leading-relaxed text-brand-muted">
					{data.project.shortDescription}
				</p>
			</div>
			<div class="space-y-6">
				<div class="flex items-center gap-3 text-sm text-brand-muted">
					<Calendar size={16} class="text-brand-accent" />
					<span>{data.project.year}</span>
				</div>
				{#if data.project.tech.length > 0}
					<div>
						<p class="mb-2 text-xs font-bold tracking-widest text-brand-muted uppercase">
							{messages.common.stack}
						</p>
						<div class="flex flex-wrap gap-2">
							{#each data.project.tech as item (item)}
								<span
									class="rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-medium text-brand-ink"
								>
									{item}
								</span>
							{/each}
						</div>
					</div>
				{/if}
				{#if data.project.liveUrl || data.project.repoUrl}
					<div class="flex flex-col gap-2">
						{#if data.project.liveUrl}
							<a
								href={data.project.liveUrl}
								rel="noopener noreferrer"
								target="_blank"
								class="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-ink uppercase hover:text-brand-accent"
							>
								<ExternalLink size={14} />
								{messages.project.visitLive}
							</a>
						{/if}
						{#if data.project.repoUrl}
							<a
								href={data.project.repoUrl}
								rel="noopener noreferrer"
								target="_blank"
								class="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-ink uppercase hover:text-brand-accent"
							>
								<Github size={14} />
								{messages.common.source}
							</a>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-24">
	<div class="container mx-auto max-w-3xl px-6 md:px-12">
		<article class="prose prose-lg max-w-none prose-slate">
			{#if Markdown}
				{@const Renderable = Markdown}
				<Renderable />
			{/if}
		</article>
	</div>
</section>

{#if data.previous || data.next}
	<section class="border-t border-brand-border bg-brand-bg py-20">
		<div class="container mx-auto px-6 md:px-12">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				{#if data.previous}
					<a
						href={`/projects/${data.previous.slug}`}
						class="group block rounded-2xl border border-brand-border bg-white p-6 transition-colors hover:border-brand-accent"
					>
						<p class="mb-2 text-xs font-bold tracking-widest text-brand-muted uppercase">
							{messages.project.previous}
						</p>
						<p
							class="flex items-center gap-3 font-display text-2xl font-bold text-brand-ink group-hover:text-brand-accent"
						>
							<ArrowLeft size={18} />
							{data.previous.title}
						</p>
					</a>
				{:else}
					<div></div>
				{/if}
				{#if data.next}
					<a
						href={`/projects/${data.next.slug}`}
						class="group block rounded-2xl border border-brand-border bg-white p-6 text-right transition-colors hover:border-brand-accent"
					>
						<p class="mb-2 text-xs font-bold tracking-widest text-brand-muted uppercase">
							{messages.project.next}
						</p>
						<p
							class="inline-flex items-center gap-3 font-display text-2xl font-bold text-brand-ink group-hover:text-brand-accent"
						>
							{data.next.title}
							<ArrowRight size={18} />
						</p>
					</a>
				{:else}
					<div></div>
				{/if}
			</div>
		</div>
	</section>
{/if}
