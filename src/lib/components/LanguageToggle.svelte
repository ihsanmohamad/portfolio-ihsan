<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getNavCanonicalSlugMap, getNavSlugMap } from '$lib/constants';
	import {
		getI18nContext,
		LOCALE_OPTIONS,
		persistLocale,
		swapLocaleInPath,
		type Locale
	} from '$lib/i18n';

	const i18n = getI18nContext();
	const messages = $derived(i18n.messages);
	const slugMaps = {
		byLocale: getNavSlugMap(),
		byCanonical: getNavCanonicalSlugMap()
	};

	function switchTo(code: Locale) {
		if (code === page.params.lang) return;
		persistLocale(code);
		goto(swapLocaleInPath(page.url.pathname, code, slugMaps));
	}
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
			aria-pressed={page.params.lang === option.code}
			onclick={() => switchTo(option.code)}
			class={[
				'rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest transition-colors',
				page.params.lang === option.code
					? 'bg-brand-ink text-brand-bg'
					: 'text-brand-muted hover:text-brand-accent'
			]}
		>
			{option.label}
		</button>
	{/each}
</div>
