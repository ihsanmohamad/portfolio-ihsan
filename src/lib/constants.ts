import type {
	Award,
	BlogPostMeta,
	CanonicalPage,
	Category,
	Certification,
	Experience,
	FooterLink,
	NavItem,
	Profile,
	ProjectMeta,
	SiteFooter,
	Skill
} from './types';
import { LOCALE_OPTIONS, type Locale } from './i18n';

type ProfileFile = Omit<Profile, 'languages'> & { languages: Profile['languages'] };
type NavFile = { items: NavItem[] };
type FooterFile = { tagline: string; socials: FooterLink[] };
type ProjectModule = { metadata: ProjectMeta };

const NAV_ITEM_TO_PAGE: Record<string, CanonicalPage> = {
	about: 'about',
	projects: 'projects',
	blog: 'blog',
	contact: 'contact'
};

const DEFAULT_NAV_SLUGS: Record<CanonicalPage, string> = {
	about: 'about',
	projects: 'projects',
	blog: 'blog',
	contact: 'contact'
};

export function defaultSlugFor(page: CanonicalPage): string {
	return DEFAULT_NAV_SLUGS[page];
}

function withNavSlug(raw: NavItem): NavItem {
	const canonical = NAV_ITEM_TO_PAGE[raw.id];
	const fallback = canonical ? DEFAULT_NAV_SLUGS[canonical] : '';
	const sanitized = (raw.slug ?? '').trim();
	return { ...raw, slug: sanitized || fallback };
}

function fileKey(path: string): string {
	return path.replace(/^.*\//, '').replace(/\.[^.]+$/, '');
}

function buildCollectionByLocale<T extends { id: string; order: number }>(
	base: Record<string, T>,
	ms: Record<string, T>
): Record<Locale, T[]> {
	const byKey: Record<string, { base?: T; ms?: T }> = {};
	for (const [path, entry] of Object.entries(base)) {
		const key = fileKey(path);
		byKey[key] = { ...byKey[key], base: entry };
	}
	for (const [path, entry] of Object.entries(ms)) {
		const key = fileKey(path);
		byKey[key] = { ...byKey[key], ms: entry };
	}

	const orderedKeys = Object.keys(byKey).sort((a, b) => {
		const oa = byKey[a].base?.order ?? byKey[a].ms?.order ?? 0;
		const ob = byKey[b].base?.order ?? byKey[b].ms?.order ?? 0;
		return oa - ob;
	});

	return {
		en: orderedKeys.map((k) => byKey[k].base ?? byKey[k].ms).filter((v): v is T => !!v),
		'ms-MY': orderedKeys.map((k) => byKey[k].ms ?? byKey[k].base).filter((v): v is T => !!v)
	};
}

function buildProjectMap(
	base: Record<string, ProjectModule>,
	ms: Record<string, ProjectModule>
): Record<Locale, Record<string, ProjectMeta>> {
	const map: Record<Locale, Record<string, ProjectMeta>> = { en: {}, 'ms-MY': {} };
	for (const [path, mod] of Object.entries(base)) {
		const slug = fileKey(path);
		map.en[slug] = { ...mod.metadata, slug };
	}
	for (const [path, mod] of Object.entries(ms)) {
		const slug = fileKey(path);
		map['ms-MY'][slug] = { ...mod.metadata, slug };
	}
	for (const slug of Object.keys(map.en)) {
		if (!map['ms-MY'][slug]) map['ms-MY'][slug] = map.en[slug];
	}
	for (const slug of Object.keys(map['ms-MY'])) {
		if (!map.en[slug]) map.en[slug] = map['ms-MY'][slug];
	}
	return map;
}

function buildProjectModules(
	base: Record<string, ProjectModule>,
	ms: Record<string, ProjectModule>
): Record<Locale, Record<string, ProjectModule>> {
	const map: Record<Locale, Record<string, ProjectModule>> = { en: {}, 'ms-MY': {} };
	for (const [path, mod] of Object.entries(base)) {
		const slug = fileKey(path);
		map.en[slug] = mod;
	}
	for (const [path, mod] of Object.entries(ms)) {
		const slug = fileKey(path);
		map['ms-MY'][slug] = mod;
	}
	for (const slug of Object.keys(map.en)) {
		if (!map['ms-MY'][slug]) map['ms-MY'][slug] = map.en[slug];
	}
	for (const slug of Object.keys(map['ms-MY'])) {
		if (!map.en[slug]) map.en[slug] = map['ms-MY'][slug];
	}
	return map;
}

function normalizePost(meta: BlogPostMeta, slug: string): BlogPostMeta {
	const rawCategory = (meta as unknown as { category?: unknown }).category;
	let category: string[] | null = null;
	if (Array.isArray(rawCategory)) {
		category = rawCategory.filter((c): c is string => typeof c === 'string');
		if (category.length === 0) category = null;
	} else if (typeof rawCategory === 'string' && rawCategory.trim().length > 0) {
		category = [rawCategory];
	}
	return { ...meta, slug, category };
}

function buildPostsByLocale(
	base: Record<string, { metadata: BlogPostMeta }>,
	ms: Record<string, { metadata: BlogPostMeta }>
): Record<Locale, BlogPostMeta[]> {
	const byKey: Record<string, { base?: BlogPostMeta; ms?: BlogPostMeta }> = {};
	for (const [path, mod] of Object.entries(base)) {
		const key = fileKey(path);
		byKey[key] = { ...byKey[key], base: normalizePost(mod.metadata, key) };
	}
	for (const [path, mod] of Object.entries(ms)) {
		const key = fileKey(path);
		byKey[key] = { ...byKey[key], ms: normalizePost(mod.metadata, key) };
	}
	const merged: Record<Locale, BlogPostMeta[]> = {
		en: [],
		'ms-MY': []
	};
	for (const { base: b, ms: m } of Object.values(byKey)) {
		if (b) merged.en.push(b);
		if (m) merged['ms-MY'].push(m);
		else if (b) merged['ms-MY'].push(b);
	}
	merged.en.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
	merged['ms-MY'].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
	return merged;
}

const profileModules = import.meta.glob<ProfileFile>(
	['../content/site/profile.yaml', '../content/site/ms-MY/profile.yaml'],
	{ eager: true, import: 'default' }
);
const navModules = import.meta.glob<NavFile>(
	['../content/site/nav.yaml', '../content/site/ms-MY/nav.yaml'],
	{ eager: true, import: 'default' }
);
const footerModules = import.meta.glob<FooterFile>(
	['../content/site/footer.yaml', '../content/site/ms-MY/footer.yaml'],
	{ eager: true, import: 'default' }
);

type CategoryFile = Omit<Category, 'id'>;

const categoryBase = import.meta.glob<CategoryFile>('../content/categories/*.yaml', {
	eager: true,
	import: 'default'
});
const categoryMs = import.meta.glob<CategoryFile>('../content/categories/ms-MY/*.yaml', {
	eager: true,
	import: 'default'
});

const experienceBase = import.meta.glob<Experience>('../content/experience/*.json', {
	eager: true,
	import: 'default'
});
const experienceMs = import.meta.glob<Experience>('../content/experience/ms-MY/*.json', {
	eager: true,
	import: 'default'
});

const projectBase = import.meta.glob<ProjectModule>('../content/projects/*.md', {
	eager: true
});
const projectMs = import.meta.glob<ProjectModule>('../content/projects/ms-MY/*.md', {
	eager: true
});

const certificationBase = import.meta.glob<Certification>('../content/certifications/*.json', {
	eager: true,
	import: 'default'
});
const certificationMs = import.meta.glob<Certification>('../content/certifications/ms-MY/*.json', {
	eager: true,
	import: 'default'
});

const awardBase = import.meta.glob<Award>('../content/awards/*.json', {
	eager: true,
	import: 'default'
});
const awardMs = import.meta.glob<Award>('../content/awards/ms-MY/*.json', {
	eager: true,
	import: 'default'
});

const skillBase = import.meta.glob<Skill>('../content/skills/*.json', {
	eager: true,
	import: 'default'
});
const skillMs = import.meta.glob<Skill>('../content/skills/ms-MY/*.json', {
	eager: true,
	import: 'default'
});

const postBase = import.meta.glob<{ metadata: BlogPostMeta }>('../content/posts/*.md', {
	eager: true
});
const postMs = import.meta.glob<{ metadata: BlogPostMeta }>('../content/posts/ms-MY/*.md', {
	eager: true
});

const EXPERIENCE_BY_LOCALE = buildCollectionByLocale(experienceBase, experienceMs);
const CERTIFICATIONS_BY_LOCALE = buildCollectionByLocale(certificationBase, certificationMs);
const AWARDS_BY_LOCALE = buildCollectionByLocale(awardBase, awardMs);
const SKILLS_BY_LOCALE = buildCollectionByLocale(skillBase, skillMs);
const PROJECTS_BY_LOCALE = buildProjectMap(projectBase, projectMs);
const PROJECTS_MODULES_BY_LOCALE = buildProjectModules(projectBase, projectMs);
const POSTS_BY_LOCALE = buildPostsByLocale(postBase, postMs);

function pickSingleton<T>(
	modules: Record<string, T>,
	locale: Locale,
	basePath: string
): T | undefined {
	if (locale === 'ms-MY') {
		const localized = modules[`../content/site/ms-MY/${basePath}`];
		if (localized) return localized;
	}
	return modules[`../content/site/${basePath}`];
}

export function getProfile(locale: Locale): Profile {
	return (
		pickSingleton(profileModules, locale, 'profile.yaml') ??
		pickSingleton(profileModules, 'en', 'profile.yaml') ?? {
			name: '',
			tagline: '',
			location: '',
			email: '',
			phone: '',
			website: '',
			summary: '',
			languages: []
		}
	);
}

export function getNavItems(locale: Locale): NavItem[] {
	const file = pickSingleton(navModules, locale, 'nav.yaml') ??
		pickSingleton(navModules, 'en', 'nav.yaml') ?? { items: [] };
	return file.items
		.map(withNavSlug)
		.slice()
		.sort((a, b) => a.order - b.order);
}

export function getNavSlugs(locale: Locale): Record<CanonicalPage, string> {
	const result = {} as Record<CanonicalPage, string>;
	for (const item of getNavItems(locale)) {
		const canonical = NAV_ITEM_TO_PAGE[item.id];
		if (canonical && item.slug) result[canonical] = item.slug;
	}
	return result;
}

export function getSiteFooter(locale: Locale): SiteFooter {
	const file = pickSingleton(footerModules, locale, 'footer.yaml') ??
		pickSingleton(footerModules, 'en', 'footer.yaml') ?? { tagline: '', socials: [] };
	return {
		tagline: file.tagline,
		socials: file.socials.slice().sort((a, b) => a.order - b.order)
	};
}

export function getExperience(locale: Locale): Experience[] {
	return EXPERIENCE_BY_LOCALE[locale] ?? [];
}

export function getCertifications(locale: Locale): Certification[] {
	return CERTIFICATIONS_BY_LOCALE[locale] ?? [];
}

export function getAwards(locale: Locale): Award[] {
	return AWARDS_BY_LOCALE[locale] ?? [];
}

export function getSkills(locale: Locale): Skill[] {
	return SKILLS_BY_LOCALE[locale] ?? [];
}

export function getProjects(locale: Locale): ProjectMeta[] {
	const map = PROJECTS_BY_LOCALE[locale] ?? {};
	return Object.values(map).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(locale: Locale): ProjectMeta[] {
	return getProjects(locale).filter((p) => p.featured);
}

function buildCategoryByLocale(): Record<Locale, Record<string, Category>> {
	const byKey: Record<string, { base?: CategoryFile; ms?: CategoryFile }> = {};
	for (const [path, file] of Object.entries(categoryBase)) {
		const key = path.replace(/^.*\//, '').replace(/\.yaml$/, '');
		byKey[key] = { ...byKey[key], base: file };
	}
	for (const [path, file] of Object.entries(categoryMs)) {
		const key = path.replace(/^.*\//, '').replace(/\.yaml$/, '');
		byKey[key] = { ...byKey[key], ms: file };
	}
	const out: Record<Locale, Record<string, Category>> = { en: {}, 'ms-MY': {} };
	for (const [key, { base, ms }] of Object.entries(byKey)) {
		if (base) out.en[key] = { ...base, id: key, slug: key };
		if (ms) out['ms-MY'][key] = { ...ms, id: key, slug: key };
		else if (base) out['ms-MY'][key] = { ...base, id: key, slug: key };
	}
	return out;
}

const CATEGORY_BY_LOCALE = buildCategoryByLocale();

export function getCategories(locale: Locale): Category[] {
	return Object.values(CATEGORY_BY_LOCALE[locale] ?? {}).sort((a, b) =>
		a.title.localeCompare(b.title)
	);
}

export function getCategoryById(locale: Locale, id: string): Category | undefined {
	const map = CATEGORY_BY_LOCALE[locale] ?? {};
	return map[id] ?? map[id.toLowerCase()];
}

export function getProjectBySlug(
	locale: Locale,
	slug: string
): { metadata: ProjectMeta; default?: unknown } | undefined {
	return PROJECTS_MODULES_BY_LOCALE[locale]?.[slug];
}

export function getProjectSlugs(): Array<{ lang: Locale; slug: string }> {
	const result: Array<{ lang: Locale; slug: string }> = [];
	for (const { code } of LOCALE_OPTIONS) {
		const map = PROJECTS_BY_LOCALE[code] ?? {};
		for (const slug of Object.keys(map)) {
			result.push({ lang: code, slug });
		}
	}
	return result;
}

export function getPosts(locale: Locale): BlogPostMeta[] {
	return POSTS_BY_LOCALE[locale] ?? [];
}

export function getNavSlugMap(): Record<Locale, Record<string, CanonicalPage>> {
	const result = {} as Record<Locale, Record<string, CanonicalPage>>;
	for (const { code } of LOCALE_OPTIONS) {
		const map: Record<string, CanonicalPage> = {};
		for (const item of getNavItems(code)) {
			const canonical = NAV_ITEM_TO_PAGE[item.id];
			if (!canonical || !item.slug) continue;
			map[item.slug] = canonical;
		}
		result[code] = map;
	}
	return result;
}

export function getNavCanonicalSlugMap(): Record<Locale, Record<string, string>> {
	const result = {} as Record<Locale, Record<string, string>>;
	for (const { code } of LOCALE_OPTIONS) {
		const map: Record<string, string> = {};
		for (const item of getNavItems(code)) {
			const canonical = NAV_ITEM_TO_PAGE[item.id];
			if (!canonical || !item.slug) continue;
			map[canonical] = item.slug;
		}
		result[code] = map;
	}
	return result;
}

export const PROFILE = getProfile('en');
export const NAV_ITEMS = getNavItems('en');
export const SITE_FOOTER = getSiteFooter('en');
export const EXPERIENCE = EXPERIENCE_BY_LOCALE.en;
export const CERTIFICATIONS = CERTIFICATIONS_BY_LOCALE.en;
export const AWARDS = AWARDS_BY_LOCALE.en;
export const SKILLS = SKILLS_BY_LOCALE.en;
export const PROJECTS = Object.values(PROJECTS_BY_LOCALE.en ?? {}).sort(
	(a, b) => a.order - b.order
);
export const PROJECTS_BY_SLUG = PROJECTS_MODULES_BY_LOCALE.en ?? {};
export const PROJECTS_SORTED = PROJECTS.slice();
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
