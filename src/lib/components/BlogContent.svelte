<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { getCategories, getPosts } from '$lib/constants';
	import { getI18nContext } from '$lib/i18n';

	const i18n = getI18nContext();
	const locale = $derived(i18n.locale);
	const messages = $derived(i18n.messages);
	const posts = $derived(getPosts(locale));
	const categories = $derived(getCategories(locale));
	const categoryById = $derived(new Map(categories.map((c) => [c.id, c])));
</script>

<section class="border-b border-brand-border pt-32 pb-16">
	<div class="container mx-auto px-6 md:px-12">
		<p class="mb-8 text-xs font-bold tracking-[0.3em] text-brand-accent uppercase">
			{messages.blog.eyebrow}
		</p>
		<h1
			class="mb-12 font-display text-6xl leading-[0.9] font-bold tracking-tight text-brand-ink md:text-[100px]"
		>
			{messages.blog.heroStart} <br /><span class="font-normal italic"
				>{messages.blog.heroEmphasis}</span
			>
		</h1>
		<p class="max-w-2xl text-xl leading-relaxed text-brand-muted">
			{messages.blog.intro}
		</p>
	</div>
</section>

<section class="py-20">
	<div class="container mx-auto px-6 md:px-12">
		{#if posts.length === 0}
			<div class="rounded-2xl border border-dashed border-brand-border bg-white p-16 text-center">
				<p class="mb-3 font-display text-2xl font-bold text-brand-ink">{messages.blog.noPosts}</p>
				<p class="text-brand-muted">
					{messages.blog.noPostsDescription}
					<a
						href="https://www.linkedin.com/in/ihsanmohamad13/"
						class="text-brand-accent hover:underline">LinkedIn</a
					>.
				</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each posts as post (post.slug)}
					<a
						href={i18n.localized(`/blog/${post.slug}`)}
						class="group flex flex-col rounded-2xl border border-brand-border bg-white p-6 transition-colors hover:border-brand-accent"
					>
						<div class="mb-3 flex flex-wrap gap-2">
							{#each (post.category ?? [])
								.map((id) => categoryById.get(id))
								.filter((c): c is NonNullable<typeof c> => c !== undefined) as cat (cat.id)}
								<span class="text-xs font-bold tracking-widest text-brand-accent uppercase">
									{cat.title}
								</span>
							{/each}
						</div>
						<h2
							class="mb-3 flex-1 font-display text-xl font-bold text-brand-ink transition-colors group-hover:text-brand-accent"
						>
							{post.title}
						</h2>
						<p class="mb-4 text-sm text-brand-muted">{post.excerpt}</p>
						<div class="flex items-center justify-between text-xs text-brand-muted">
							<span>{post.publishedAt}</span>
							<span>{post.readingMinutes} {messages.blog.minuteRead}</span>
						</div>
						<ArrowRight
							size={16}
							class="mt-4 self-end text-brand-ink transition-colors group-hover:text-brand-accent"
						/>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
