<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { NAV_ITEMS, PROFILE, SITE_FOOTER } from '$lib/constants';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import { isLocale, MESSAGES, setI18nContext, type I18nContext, type Locale } from '$lib/i18n';
	import { Menu, X, ArrowRight, Mail, Phone, Github, Linkedin, Globe } from '@lucide/svelte';

	let { children } = $props();

	let isMobileMenuOpen = $state(false);
	let scrolled = $state(false);
	let locale = $state<Locale>('en');
	let localeInitialized = false;
	let isAdmin = $derived(page.url.pathname.startsWith('/admin'));
	let messages = $derived(MESSAGES[locale]);

	function setLocale(nextLocale: Locale) {
		locale = nextLocale;
	}

	const i18n: I18nContext = {
		get locale() {
			return locale;
		},
		get messages() {
			return messages;
		},
		setLocale
	};

	setI18nContext(i18n);

	function handleScroll() {
		scrolled = window.scrollY > 50;
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			handleScroll();
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});

	$effect(() => {
		if (isAdmin || localeInitialized) return;

		localeInitialized = true;
		const storedLocale = localStorage.getItem('portfolio-locale');
		if (isLocale(storedLocale)) locale = storedLocale;
	});

	$effect(() => {
		if (isAdmin || !localeInitialized) return;

		document.documentElement.lang = locale;
		localStorage.setItem('portfolio-locale', locale);
	});

	$effect(() => {
		const pathname = page.url.pathname;
		isMobileMenuOpen = false;
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
		void pathname;
	});

	function isActive(path: string): boolean {
		return page.url.pathname === path;
	}

	function navLabel(path: string, fallback: string): string {
		if (path === '/about') return messages.nav.about;
		if (path === '/projects') return messages.nav.work;
		if (path === '/blog') return messages.nav.writing;
		return fallback;
	}

	function socialIcon(label: string) {
		const l = label.toLowerCase();
		if (l === 'email') return Mail;
		if (l === 'github') return Github;
		if (l === 'linkedin') return Linkedin;
		return Globe;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
		rel="stylesheet"
	/>
	{#if isAdmin}
		<title>Content Manager</title>
		<meta name="robots" content="noindex" />
		<script
			src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"
			crossorigin="anonymous"
		></script>
	{:else}
		<title>{PROFILE.name} — {PROFILE.tagline}</title>
		<meta name="description" content={PROFILE.summary} />
	{/if}
</svelte:head>

<div class="flex min-h-screen flex-col bg-brand-bg font-sans text-brand-ink">
	<div
		class="pointer-events-none fixed top-0 right-0 left-0 z-30 flex justify-center px-6 pt-6 md:p-6"
		class:hidden={isAdmin}
	>
		<nav
			class="pointer-events-auto relative mx-auto flex w-full items-center justify-between transition-all duration-500"
			style:max-width={scrolled ? '760px' : '1280px'}
			style:background-color={scrolled ? 'rgba(252, 250, 247, 0.9)' : 'transparent'}
			style:backdrop-filter={scrolled ? 'blur(12px)' : 'none'}
			style:border-radius={scrolled ? '100px' : '0'}
			style:padding={scrolled ? '12px 24px' : '16px 32px'}
			style:box-shadow={scrolled ? '0 20px 25px -5px rgb(0 0 0 / 0.1)' : 'none'}
			style:border-width={scrolled ? '1px' : '0'}
			style:border-color={scrolled ? 'rgba(15, 23, 42, 0.1)' : 'transparent'}
		>
			<a href="/" class="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
				<span class="rounded-sm bg-brand-ink px-2 py-0.5 text-brand-bg">I</span>
				<span
					class="overflow-hidden whitespace-nowrap transition-all duration-500"
					class:opacity-0={scrolled}
					class:w-0={scrolled}
					class:mr-0={scrolled}
					class:mr-2={!scrolled}
				>
					{PROFILE.name.toUpperCase()}
				</span>
			</a>

			<div class="hidden items-center space-x-10 md:flex">
				{#each NAV_ITEMS as item (item.path)}
					<a
						href={item.path}
						rel={item.external ? 'noopener noreferrer' : undefined}
						target={item.external ? '_blank' : undefined}
						class="text-xs font-bold tracking-widest uppercase transition-colors hover:text-brand-accent {item.external
							? 'text-brand-muted'
							: isActive(item.path)
								? 'text-brand-accent'
								: 'text-brand-muted'}"
					>
						{navLabel(item.path, item.label)}
					</a>
				{/each}
				<LanguageToggle />
				<a
					href={`mailto:${PROFILE.email}`}
					class="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-brand-ink/20 px-8 py-3 text-xs font-bold tracking-widest text-brand-ink uppercase transition duration-300 ease-out"
				>
					<span
						class="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-brand-accent text-black duration-300 group-hover:translate-x-0"
					>
						<ArrowRight size={16} />
					</span>
					<span
						class="absolute flex h-full w-full transform items-center justify-center text-brand-ink transition-all duration-300 group-hover:translate-x-full"
					>
						{messages.nav.hireMe}
					</span>
					<span class="invisible relative">{messages.nav.hireMe}</span>
				</a>
			</div>

			<button
				type="button"
				class="text-brand-ink md:hidden"
				aria-label={isMobileMenuOpen ? messages.nav.closeMenu : messages.nav.openMenu}
				aria-expanded={isMobileMenuOpen}
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			>
				{#if isMobileMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</nav>
	</div>

	<div
		class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-bg transition-all duration-500 {isMobileMenuOpen
			? 'pointer-events-auto opacity-100'
			: 'pointer-events-none opacity-0'}"
		class:overflow-hidden={isMobileMenuOpen}
	>
		<button
			type="button"
			class="absolute top-6 right-6 text-brand-ink"
			aria-label={messages.nav.closeMenu}
			onclick={() => (isMobileMenuOpen = false)}
		>
			<X size={32} />
		</button>
		<div class="flex flex-col space-y-6 text-center">
			<a href="/" class="font-display text-4xl font-bold transition-colors hover:text-brand-accent"
				>{messages.nav.home}</a
			>
			{#each NAV_ITEMS as item (item.path)}
				<a
					href={item.path}
					rel={item.external ? 'noopener noreferrer' : undefined}
					target={item.external ? '_blank' : undefined}
					class="font-display text-4xl font-bold transition-colors hover:text-brand-accent"
				>
					{navLabel(item.path, item.label)}
				</a>
			{/each}
			<div class="mt-2">
				<LanguageToggle />
			</div>
			<a href={`mailto:${PROFILE.email}`} class="mt-8 text-xl text-brand-accent"
				>{messages.nav.getInTouch}</a
			>
		</div>
	</div>

	<main class="grow pt-24" class:overflow-hidden={isMobileMenuOpen} class:!p-0={isAdmin}>
		{@render children()}
	</main>

	<footer class="border-t border-brand-border bg-white py-20" class:hidden={isAdmin}>
		<div class="container mx-auto px-6 md:px-12">
			<div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
				<div class="md:col-span-2">
					<a
						href="/"
						class="mb-6 flex items-center gap-2 font-display text-xl font-bold tracking-tight"
					>
						<span class="rounded-sm bg-brand-ink px-2 py-0.5 text-brand-bg">I</span>
						{PROFILE.name}
					</a>
					<p class="max-w-md leading-relaxed text-brand-muted">
						{SITE_FOOTER.tagline}
					</p>
					<div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-brand-muted">
						<a
							href={`mailto:${PROFILE.email}`}
							class="inline-flex items-center gap-2 hover:text-brand-accent"
						>
							<Mail size={16} />
							{PROFILE.email}
						</a>
						{#if PROFILE.phone}
							<a
								href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
								class="inline-flex items-center gap-2 hover:text-brand-accent"
							>
								<Phone size={16} />
								{PROFILE.phone}
							</a>
						{/if}
					</div>
				</div>
				<div>
					<h3 class="mb-6 text-xs font-bold tracking-widest text-brand-ink uppercase">
						{messages.nav.navigation}
					</h3>
					<ul class="space-y-4">
						<li>
							<a href="/" class="text-sm text-brand-muted transition-colors hover:text-brand-accent"
								>{messages.nav.home}</a
							>
						</li>
						{#each NAV_ITEMS as item (item.path)}
							<li>
								<a
									href={item.path}
									rel={item.external ? 'noopener noreferrer' : undefined}
									target={item.external ? '_blank' : undefined}
									class="text-sm text-brand-muted transition-colors hover:text-brand-accent"
								>
									{navLabel(item.path, item.label)}
								</a>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<h3 class="mb-6 text-xs font-bold tracking-widest text-brand-ink uppercase">
						{messages.nav.connect}
					</h3>
					<ul class="space-y-4">
						{#each SITE_FOOTER.socials as link (link.url)}
							{@const Icon = socialIcon(link.label)}
							<li>
								<a
									href={link.url}
									rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
									target={link.url.startsWith('http') ? '_blank' : undefined}
									class="inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-brand-accent"
								>
									<Icon size={16} />
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div
				class="flex flex-col items-center justify-between border-t border-brand-border pt-8 text-xs font-medium tracking-wide text-brand-muted md:flex-row"
			>
				<p>
					&copy; {new Date().getFullYear()}
					{PROFILE.name.toUpperCase()}. {messages.nav.allRightsReserved}
				</p>
				<div class="mt-4 flex gap-8 md:mt-0">
					<a href="/admin" class="transition-colors hover:text-brand-ink">CMS</a>
				</div>
			</div>
		</div>
	</footer>
</div>
