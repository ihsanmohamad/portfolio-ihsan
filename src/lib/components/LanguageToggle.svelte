<script lang="ts">
	import { getI18nContext, LOCALE_OPTIONS } from '$lib/i18n';

	const i18n = getI18nContext();
	const messages = $derived(i18n.messages);
</script>

<div
	role="group"
	aria-label={messages.language.selectorLabel}
	class="inline-flex items-center rounded-full border border-brand-ink/20 bg-white/70 p-1"
>
	{#each LOCALE_OPTIONS as option (option.code)}
		<button
			type="button"
			aria-label={messages.language.switchTo[option.code]}
			aria-pressed={i18n.locale === option.code}
			onclick={() => i18n.setLocale(option.code)}
			class={[
				'rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest transition-colors',
				i18n.locale === option.code
					? 'bg-brand-ink text-brand-bg'
					: 'text-brand-muted hover:text-brand-accent'
			]}
		>
			{option.label}
		</button>
	{/each}
</div>
