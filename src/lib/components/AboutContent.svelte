<script lang="ts">
	import { Award, GraduationCap, Briefcase, Download } from '@lucide/svelte';
	import {
		getProfile,
		getExperience,
		getCertifications,
		getAwards,
		getSkills
	} from '$lib/constants';
	import { getI18nContext } from '$lib/i18n';

	const i18n = getI18nContext();
	const locale = $derived(i18n.locale);
	const messages = $derived(i18n.messages);
	const profile = $derived(getProfile(locale));
	const experience = $derived(getExperience(locale));
	const certifications = $derived(getCertifications(locale));
	const awards = $derived(getAwards(locale));
	const skills = $derived(getSkills(locale));

	function formatRange(start: string, end: string | null, current: boolean): string {
		return `${start} – ${current ? messages.common.present : (end ?? messages.common.now)}`;
	}
</script>

<section class="border-b border-brand-border pt-32 pb-20">
	<div class="container mx-auto px-6 md:px-12">
		<p class="mb-8 text-xs font-bold tracking-[0.3em] text-brand-accent uppercase">
			{messages.about.eyebrow}
		</p>
		<h1
			class="mb-12 font-display text-6xl leading-[0.9] font-bold tracking-tight text-brand-ink md:text-[100px]"
		>
			{messages.about.heroStart} <br /><span class="font-normal italic"
				>{messages.about.heroEmphasis}</span
			>
		</h1>
	</div>
</section>

<section class="bg-white py-32">
	<div class="container mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
			<div class="lg:col-span-7">
				<p class="mb-12 font-display text-2xl leading-snug text-brand-ink md:text-3xl">
					{profile.summary}
					{messages.about.profileDetail(profile.location)}
				</p>
				<p class="mb-12 text-lg leading-relaxed text-brand-muted">
					{messages.about.recentWork}
				</p>

				<div class="flex flex-wrap gap-3">
					{#each profile.languages as lang (lang)}
						<span
							class="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-4 py-2 text-xs font-bold tracking-widest text-brand-ink uppercase"
						>
							{lang}
						</span>
					{/each}
				</div>
			</div>
			<div class="lg:col-span-5">
				<div
					class="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-ink via-brand-muted to-brand-accent shadow-2xl"
				>
					<span class="font-display text-9xl font-bold text-white/30">
						{profile.name.charAt(0)}
					</span>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="border-y border-brand-border py-32">
	<div class="container mx-auto px-6 md:px-12">
		<div class="mb-16">
			<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
				<Briefcase class="mr-2 inline-block" size={14} />
				{messages.common.experience}
			</p>
			<h2 class="font-display text-4xl font-bold text-brand-ink md:text-5xl">
				{messages.about.careerHeadingStart}
				<span class="font-normal italic">{messages.about.careerHeadingEmphasis}</span>
			</h2>
		</div>

		<ol class="space-y-12">
			{#each experience as job (job.id)}
				<li
					class="grid grid-cols-1 gap-6 border-l-2 border-brand-border pb-12 pl-8 transition-colors hover:border-brand-accent md:grid-cols-4"
				>
					<div>
						<p class="font-mono text-xs font-bold tracking-widest text-brand-accent uppercase">
							{formatRange(job.startDate, job.endDate, job.current)}
						</p>
						<p class="mt-1 text-xs text-brand-muted">{job.location}</p>
					</div>
					<div class="md:col-span-3">
						<h3 class="font-display text-2xl font-bold text-brand-ink">
							{job.role}
							{#if job.link}
								<span class="text-brand-muted">·</span>
								<a
									href={job.link}
									rel="noopener noreferrer"
									target="_blank"
									class="text-brand-accent hover:underline">{job.company}</a
								>
							{:else}
								<span class="text-brand-muted">· {job.company}</span>
							{/if}
						</h3>
						<p class="mt-4 text-base leading-relaxed text-brand-muted">{job.description}</p>
						<ul class="mt-4 space-y-2 text-brand-muted">
							{#each job.bullets as bullet (bullet)}
								<li class="flex gap-3 text-sm leading-relaxed">
									<span class="mt-2 h-1 w-3 shrink-0 bg-brand-accent"></span>
									<span>{bullet}</span>
								</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="bg-white py-32">
	<div class="container mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<div>
				<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
					<GraduationCap class="mr-2 inline-block" size={14} />
					{messages.about.education}
				</p>
				<h2 class="mb-10 font-display text-3xl font-bold text-brand-ink md:text-4xl">
					{messages.about.learningHeadingStart}
					<span class="font-normal italic">{messages.about.learningHeadingEmphasis}</span>
				</h2>
				<div class="space-y-6">
					<div class="rounded-2xl border border-brand-border bg-brand-bg p-6">
						<p class="text-xs font-bold tracking-widest text-brand-accent uppercase">
							{messages.about.bachelorsDate}
						</p>
						<h3 class="mt-2 font-display text-xl font-bold text-brand-ink">
							{messages.about.bachelorsDegree}
						</h3>
						<p class="text-sm text-brand-muted">
							University Malaya · {messages.about.gradeLabel}
							<strong class="text-brand-ink">3.35</strong>
						</p>
					</div>
					<div class="rounded-2xl border border-brand-border bg-brand-bg p-6">
						<p class="text-xs font-bold tracking-widest text-brand-accent uppercase">
							{messages.about.diplomaDate}
						</p>
						<h3 class="mt-2 font-display text-xl font-bold text-brand-ink">
							{messages.about.diplomaDegree}
						</h3>
						<p class="text-sm text-brand-muted">
							UngkuOmar Polytechnic · {messages.about.gradeLabel}
							<strong class="text-brand-ink">3.69</strong>
						</p>
					</div>
				</div>
			</div>

			<div>
				<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
					<Award class="mr-2 inline-block" size={14} />
					{messages.about.skills}
				</p>
				<h2 class="mb-10 font-display text-3xl font-bold text-brand-ink md:text-4xl">
					{messages.about.skillsHeadingStart}
					<span class="font-normal italic">{messages.about.skillsHeadingEmphasis}</span>
				</h2>
				<div class="space-y-4">
					{#each skills as group (group.id)}
						<div class="rounded-2xl border border-brand-border bg-brand-bg p-5">
							<h3 class="mb-3 text-xs font-bold tracking-widest text-brand-accent uppercase">
								{group.category}
							</h3>
							<div class="flex flex-wrap gap-2">
								{#each group.items as skill (skill)}
									<span
										class="rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-medium text-brand-ink"
									>
										{skill}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="border-t border-brand-border py-32">
	<div class="container mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<div>
				<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
					{messages.about.certifications}
				</p>
				<h2 class="mb-10 font-display text-3xl font-bold text-brand-ink md:text-4xl">
					{messages.about.credentials}
				</h2>
				<div class="space-y-6">
					{#each certifications as cert (cert.id)}
						<div class="rounded-2xl border border-brand-border bg-white p-6">
							<div class="flex flex-wrap items-start justify-between gap-2">
								<div>
									<h3 class="font-display text-xl font-bold text-brand-ink">{cert.title}</h3>
									<p class="text-sm text-brand-muted">
										{cert.issuer} · {cert.issueDate}
									</p>
								</div>
								{#if cert.credentialUrl}
									<a
										href={cert.credentialUrl}
										rel="noopener noreferrer"
										target="_blank"
										class="text-xs font-bold tracking-widest text-brand-accent uppercase hover:underline"
									>
										{messages.common.view} →
									</a>
								{/if}
							</div>
							<p class="mt-4 text-sm leading-relaxed text-brand-muted">{cert.description}</p>
						</div>
					{/each}
				</div>
			</div>

			<div>
				<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
					{messages.about.awards}
				</p>
				<h2 class="mb-10 font-display text-3xl font-bold text-brand-ink md:text-4xl">
					{messages.about.highlights}
				</h2>
				<div class="space-y-6">
					{#each awards as award (award.id)}
						<div class="rounded-2xl border border-brand-border bg-white p-6">
							<h3 class="font-display text-xl font-bold text-brand-ink">{award.title}</h3>
							<p class="text-sm text-brand-muted">
								{award.issuer} · {award.date}
							</p>
							{#if award.achievement}
								<p class="mt-2 text-xs font-bold tracking-widest text-brand-accent uppercase">
									{award.achievement}
								</p>
							{/if}
							<p class="mt-3 text-sm leading-relaxed text-brand-muted">{award.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-brand-ink py-32 text-brand-bg">
	<div class="container mx-auto px-6 text-center md:px-12">
		<div class="mx-auto max-w-2xl">
			<h2 class="mb-8 font-display text-4xl font-bold md:text-6xl">{messages.about.fullPicture}</h2>
			<p class="mb-12 text-lg text-brand-bg/60">
				{messages.about.fullPictureDescription}
			</p>
			<a
				href={`mailto:${profile.email}`}
				class="inline-flex items-center gap-3 rounded-full bg-brand-accent px-10 py-5 text-sm font-bold tracking-widest text-black uppercase transition-all duration-300 hover:bg-brand-bg hover:text-brand-ink"
			>
				<Download size={18} />
				{messages.about.requestCv}
			</a>
		</div>
	</div>
</section>
