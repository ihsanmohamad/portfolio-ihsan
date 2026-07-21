<script lang="ts">
	import { ArrowRight, ExternalLink, Github } from '@lucide/svelte';
	import { PROJECTS_SORTED } from '$lib/constants';
</script>

<section class="border-b border-brand-border pt-32 pb-16">
	<div class="container mx-auto px-6 md:px-12">
		<p class="mb-8 text-xs font-bold tracking-[0.3em] text-brand-accent uppercase">Work</p>
		<h1
			class="mb-12 font-display text-6xl leading-[0.9] font-bold tracking-tight text-brand-ink md:text-[100px]"
		>
			Selected <br /><span class="font-normal italic">projects.</span>
		</h1>
		<p class="max-w-2xl text-xl leading-relaxed text-brand-muted md:text-2xl">
			Side projects, paid work, and open-source contributions. Each one is a real system I shipped
			and supported — not a screenshot.
		</p>
	</div>
</section>

<section class="py-24">
	<div class="container mx-auto px-6 md:px-12">
		<div class="space-y-20">
			{#each PROJECTS_SORTED as project, i (project.slug)}
				<article
					class="grid grid-cols-1 gap-10 border-b border-brand-border pb-20 last:border-b-0 lg:grid-cols-12"
				>
					<div
						class="flex aspect-[16/10] items-center justify-center rounded-2xl bg-gradient-to-br from-brand-ink to-brand-muted lg:col-span-7"
					>
						<span
							class="px-6 text-center font-display text-4xl font-bold text-white/30 md:text-6xl"
						>
							{project.title}
						</span>
					</div>
					<div class="flex flex-col justify-center lg:col-span-5">
						<p class="mb-2 text-xs font-bold tracking-widest text-brand-accent uppercase">
							{String(i + 1).padStart(2, '0')} — {project.category}
						</p>
						<h2 class="mb-4 font-display text-3xl font-bold text-brand-ink md:text-4xl">
							{project.title}
						</h2>
						<p class="mb-6 text-base leading-relaxed text-brand-muted">
							{project.shortDescription}
						</p>

						<div class="mb-6 flex flex-wrap gap-2">
							{#each project.tech as item (item)}
								<span
									class="rounded-full bg-brand-border px-3 py-1 text-xs font-medium text-brand-ink"
								>
									{item}
								</span>
							{/each}
						</div>

						<div class="flex flex-wrap items-center gap-4">
							<a
								href={`/projects/${project.slug}`}
								class="group inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-ink uppercase hover:text-brand-accent"
							>
								Read case study
								<ArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
							</a>
							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									rel="noopener noreferrer"
									target="_blank"
									class="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-brand-muted uppercase hover:text-brand-accent"
								>
									<ExternalLink size={14} />
									Live
								</a>
							{/if}
							{#if project.repoUrl}
								<a
									href={project.repoUrl}
									rel="noopener noreferrer"
									target="_blank"
									class="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-brand-muted uppercase hover:text-brand-accent"
								>
									<Github size={14} />
									Repo
								</a>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
