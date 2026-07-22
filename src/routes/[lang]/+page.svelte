<script lang="ts">
	import { ArrowRight, Mail, Github, Linkedin } from '@lucide/svelte';
	import {
		getProfile,
		getExperience,
		getCertifications,
		getAwards,
		getSkills,
		getFeaturedProjects,
		getNavItems
	} from '$lib/constants';
	import { getI18nContext } from '$lib/i18n';

	const i18n = getI18nContext();
	const messages = $derived(i18n.messages);
	const locale = $derived(i18n.locale);
	const profile = $derived(getProfile(locale));
	const featuredProjects = $derived(getFeaturedProjects(locale));
	const experience = $derived(getExperience(locale));
	const certifications = $derived(getCertifications(locale));
	const awards = $derived(getAwards(locale));
	const navItems = $derived(getNavItems(locale));

	function slugFor(itemId: string): string {
		return navItems.find((n) => n.id === itemId)?.slug ?? '';
	}
	const skills = $derived(getSkills(locale));
	const currentRole = $derived(experience.find((e) => e.current));
</script>

<section class="flex min-h-[88vh] items-center pt-20">
	<div class="container mx-auto px-6 md:px-12">
		<div class="max-w-5xl">
			<p class="mb-8 text-xs font-bold tracking-[0.3em] text-brand-accent uppercase">
				{profile.location} · {profile.tagline}
			</p>
			<h1
				class="mb-10 font-display text-6xl leading-[0.95] font-bold tracking-tight md:text-[120px]"
			>
				{profile.name.split(' ')[0]}<br />
				<span class="font-normal italic">Mohamad.</span>
			</h1>
			<p class="mb-12 max-w-2xl text-xl leading-relaxed text-brand-muted md:text-2xl">
				{profile.summary}
			</p>

			{#if currentRole}
				<div class="mb-12 rounded-2xl border border-brand-border bg-white p-6 md:p-8">
					<p class="mb-2 text-xs font-bold tracking-widest text-brand-accent uppercase">
						{messages.home.currently}
					</p>
					<p class="font-display text-xl font-bold md:text-2xl">
						{currentRole.role} <span class="text-brand-muted">@</span>
						{currentRole.company}
					</p>
					<p class="mt-1 text-sm text-brand-muted">
						{currentRole.location} · {currentRole.startDate} – {messages.common.present}
					</p>
				</div>
			{/if}

			<div class="flex flex-wrap items-center gap-4">
				<a
					href={`mailto:${profile.email}`}
					class="group flex items-center gap-4 rounded-full bg-brand-ink px-8 py-4 text-sm font-bold tracking-widest text-brand-bg uppercase transition-all duration-300 hover:bg-brand-accent hover:text-black"
				>
					{messages.nav.getInTouch}
					<span
						class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent text-black transition-all duration-300 group-hover:bg-brand-bg"
					>
						<ArrowRight size={16} />
					</span>
				</a>
				<a
					href="https://github.com/ihsanmohamad"
					rel="noopener noreferrer"
					target="_blank"
					aria-label="GitHub"
					class="flex h-14 w-14 items-center justify-center rounded-full border border-brand-ink/20 transition-colors hover:border-brand-accent hover:text-brand-accent"
				>
					<Github size={20} />
				</a>
				<a
					href="https://www.linkedin.com/in/ihsanmohamad13/"
					rel="noopener noreferrer"
					target="_blank"
					aria-label="LinkedIn"
					class="flex h-14 w-14 items-center justify-center rounded-full border border-brand-ink/20 transition-colors hover:border-brand-accent hover:text-brand-accent"
				>
					<Linkedin size={20} />
				</a>
			</div>
		</div>
	</div>
</section>

{#if featuredProjects.length > 0}
	<section class="border-t border-brand-border bg-white py-32">
		<div class="container mx-auto px-6 md:px-12">
			<div class="mb-16 flex items-end justify-between">
				<div>
					<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
						{messages.home.selectedProjects}
					</p>
					<h2 class="font-display text-4xl font-bold text-brand-ink md:text-5xl">
						{messages.home.thingsBuilt}
					</h2>
				</div>
				<a
					href={i18n.localized(`/${slugFor('projects')}`)}
					class="text-xs font-bold tracking-widest text-brand-accent uppercase underline-offset-8 hover:underline"
				>
					{messages.home.viewAllWorks}
				</a>
			</div>

			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				{#each featuredProjects as project (project.slug)}
					<a href={i18n.localized(`/projects/${project.slug}`)} class="group block">
						<div
							class="relative mb-8 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-ink to-brand-muted"
						>
							<span
								class="font-display text-3xl font-bold text-white/20 transition-colors group-hover:text-white/40"
							>
								{project.title}
							</span>
							<div
								class="absolute inset-0 bg-brand-ink/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							></div>
						</div>
						<div class="flex items-start justify-between">
							<div>
								<h3
									class="mb-2 font-display text-2xl font-bold text-brand-ink transition-colors group-hover:text-brand-accent"
								>
									{project.title}
								</h3>
								<p class="text-sm font-medium tracking-widest text-brand-muted uppercase">
									{project.category} — {project.year}
								</p>
								<p class="mt-3 max-w-md text-base text-brand-muted">
									{project.shortDescription}
								</p>
							</div>
							<ArrowRight class="text-brand-ink transition-colors group-hover:text-brand-accent" />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<section class="border-t border-brand-border py-32">
	<div class="container mx-auto px-6 md:px-12">
		<div class="mb-16 max-w-3xl">
			<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
				{messages.common.stack}
			</p>
			<h2 class="mb-6 font-display text-4xl font-bold text-brand-ink md:text-5xl">
				{messages.home.toolsHeadingStart}
				<span class="font-normal italic">{messages.home.toolsHeadingEmphasis}</span>
			</h2>
			<p class="text-lg text-brand-muted">
				{messages.home.toolsDescription}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each skills as group (group.id)}
				<div class="rounded-2xl border border-brand-border bg-white p-8">
					<h3 class="mb-6 text-xs font-bold tracking-widest text-brand-accent uppercase">
						{group.category}
					</h3>
					<ul class="space-y-2">
						{#each group.items as skill (skill)}
							<li class="text-base text-brand-ink">{skill}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-brand-border bg-brand-ink py-32 text-brand-bg">
	<div class="container mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<div>
				<p class="mb-4 text-xs font-bold tracking-widest text-brand-bg/60 uppercase">
					{messages.common.experience}
				</p>
				<h2 class="mb-10 font-display text-4xl font-bold md:text-5xl">
					{messages.home.whereWorkedStart}
					<span class="font-normal italic">{messages.home.whereWorkedEmphasis}</span>
				</h2>

				<div class="space-y-8">
					{#each experience.slice(0, 3) as job (job.id)}
						<div>
							<p class="mb-1 font-display text-xl font-bold">{job.role}</p>
							<p class="text-sm text-brand-bg/70">
								{job.company} · {job.startDate} – {job.current
									? messages.common.present
									: job.endDate}
							</p>
						</div>
					{/each}
				</div>

				<a
					href={i18n.localized(`/${slugFor('about')}`)}
					class="mt-12 inline-block text-xs font-bold tracking-widest uppercase underline-offset-8 hover:underline"
				>
					{messages.home.fullCareerHistory}
				</a>
			</div>

			<div>
				<p class="mb-4 text-xs font-bold tracking-widest text-brand-bg/60 uppercase">
					{messages.common.recognition}
				</p>
				<h2 class="mb-10 font-display text-4xl font-bold md:text-5xl">
					{messages.home.proudMomentsStart}
					<span class="font-normal italic">{messages.home.proudMomentsEmphasis}</span>
				</h2>
				<div class="space-y-6">
					{#each [...certifications, ...awards] as item (item.id)}
						<div class="border-l-2 border-brand-accent pl-4">
							<p class="font-bold">{item.title}</p>
							<p class="text-sm text-brand-bg/70">
								{item.issuer} · {'issueDate' in item ? item.issueDate : item.date}
							</p>
							{#if 'achievement' in item && item.achievement}
								<p class="mt-1 text-xs font-bold tracking-widest text-brand-accent uppercase">
									{item.achievement}
								</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-32">
	<div class="container mx-auto px-6 text-center md:px-12">
		<div class="mx-auto max-w-2xl">
			<h2 class="mb-8 font-display text-4xl font-bold text-brand-ink md:text-6xl">
				{messages.home.buildTogetherStart}
				<span class="font-normal italic">{messages.home.buildTogetherEmphasis}</span>
			</h2>
			<p class="mb-12 text-lg text-brand-muted">
				{messages.home.buildTogetherDescription}
			</p>
			<a
				href={`mailto:${profile.email}`}
				class="inline-flex items-center gap-3 rounded-full bg-brand-ink px-10 py-5 text-sm font-bold tracking-widest text-brand-bg uppercase transition-all duration-300 hover:bg-brand-accent hover:text-black"
			>
				<Mail size={18} />
				{profile.email}
			</a>
		</div>
	</div>
</section>
