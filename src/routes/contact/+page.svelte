<script lang="ts">
	import { Mail, MapPin, Phone, Github, Linkedin } from '@lucide/svelte';
	import { PROFILE, SITE_FOOTER } from '$lib/constants';
	import { getI18nContext } from '$lib/i18n';

	const i18n = getI18nContext();
	const messages = $derived(i18n.messages);
</script>

<section class="border-b border-brand-border pt-32 pb-16">
	<div class="container mx-auto px-6 md:px-12">
		<p class="mb-8 text-xs font-bold tracking-[0.3em] text-brand-accent uppercase">
			{messages.contact.eyebrow}
		</p>
		<h1
			class="mb-12 font-display text-6xl leading-[0.9] font-bold tracking-tight text-brand-ink md:text-[100px]"
		>
			{messages.contact.heroStart}
			<span class="font-normal italic">{messages.contact.heroEmphasis}</span>
		</h1>
		<p class="max-w-2xl text-xl leading-relaxed text-brand-muted">
			{messages.contact.intro}
		</p>
	</div>
</section>

<section class="py-24">
	<div class="container mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
			<div class="lg:col-span-7">
				<div class="space-y-8">
					<a
						href={`mailto:${PROFILE.email}`}
						class="group flex items-start gap-6 rounded-2xl border border-brand-border bg-white p-6 transition-colors hover:border-brand-accent"
					>
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent"
						>
							<Mail size={20} />
						</div>
						<div>
							<p class="mb-1 text-xs font-bold tracking-widest text-brand-muted uppercase">
								{messages.contact.email}
							</p>
							<p
								class="font-display text-xl font-bold text-brand-ink group-hover:text-brand-accent"
							>
								{PROFILE.email}
							</p>
						</div>
					</a>

					{#if PROFILE.phone}
						<a
							href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
							class="group flex items-start gap-6 rounded-2xl border border-brand-border bg-white p-6 transition-colors hover:border-brand-accent"
						>
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent"
							>
								<Phone size={20} />
							</div>
							<div>
								<p class="mb-1 text-xs font-bold tracking-widest text-brand-muted uppercase">
									{messages.contact.phone}
								</p>
								<p
									class="font-display text-xl font-bold text-brand-ink group-hover:text-brand-accent"
								>
									{PROFILE.phone}
								</p>
							</div>
						</a>
					{/if}

					<div class="flex items-start gap-6 rounded-2xl border border-brand-border bg-white p-6">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent"
						>
							<MapPin size={20} />
						</div>
						<div>
							<p class="mb-1 text-xs font-bold tracking-widest text-brand-muted uppercase">
								{messages.contact.basedIn}
							</p>
							<p class="font-display text-xl font-bold text-brand-ink">{PROFILE.location}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="lg:col-span-5">
				<div class="rounded-2xl border border-brand-border bg-white p-8">
					<p class="mb-4 text-xs font-bold tracking-widest text-brand-muted uppercase">
						{messages.contact.aroundTheWeb}
					</p>
					<div class="space-y-3">
						{#each SITE_FOOTER.socials as link (link.url)}
							<a
								href={link.url}
								rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
								target={link.url.startsWith('http') ? '_blank' : undefined}
								class="group flex items-center justify-between rounded-xl border border-brand-border bg-brand-bg px-4 py-3 transition-colors hover:border-brand-accent hover:bg-white"
							>
								<span class="font-medium text-brand-ink group-hover:text-brand-accent">
									{link.label}
								</span>
								{#if link.label === 'GitHub'}
									<Github size={18} class="text-brand-muted" />
								{:else if link.label === 'LinkedIn'}
									<Linkedin size={18} class="text-brand-muted" />
								{:else}
									<span class="text-xs text-brand-muted">↗</span>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
