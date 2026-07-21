import type {
	Certification,
	FooterLink,
	NavItem,
	Profile,
	ProjectMeta,
	SiteFooter,
	Skill,
	Award,
	Experience
} from './types';

import profile from '../content/site/profile.yaml';
import navItems from '../content/site/nav.yaml';
import footerConfig from '../content/site/footer.yaml';

function loadCollection<T extends { order: number }>(modules: Record<string, T>): T[] {
	return Object.values(modules).sort((a, b) => a.order - b.order);
}

const experienceModules = import.meta.glob<Experience>('../content/experience/*.json', {
	eager: true,
	import: 'default'
});

const projectModules = import.meta.glob<{ metadata: ProjectMeta }>('../content/projects/*.md', {
	eager: true
});

const certificationModules = import.meta.glob<Certification>('../content/certifications/*.json', {
	eager: true,
	import: 'default'
});

const awardModules = import.meta.glob<Award>('../content/awards/*.json', {
	eager: true,
	import: 'default'
});

const skillModules = import.meta.glob<Skill>('../content/skills/*.json', {
	eager: true,
	import: 'default'
});

export const EXPERIENCE = loadCollection(experienceModules);
export const CERTIFICATIONS = loadCollection(certificationModules);
export const AWARDS = loadCollection(awardModules);
export const SKILLS = loadCollection(skillModules);

function getSlug(path: string): string {
	return path.replace(/^.*\//, '').replace(/\.md$/, '');
}

export const PROJECTS: ProjectMeta[] = Object.entries(projectModules).map(([path, mod]) => ({
	...(mod.metadata as unknown as ProjectMeta),
	slug: getSlug(path)
}));

export const FEATURED_PROJECTS: ProjectMeta[] = PROJECTS.filter((p) => p.featured).sort(
	(a, b) => a.order - b.order
);

export const PROJECTS_SORTED: ProjectMeta[] = PROJECTS.slice().sort((a, b) => a.order - b.order);

export const PROJECTS_BY_SLUG: Record<string, { metadata: ProjectMeta; default?: unknown }> =
	Object.fromEntries(Object.entries(projectModules).map(([path, mod]) => [getSlug(path), mod]));

export const NAV_ITEMS: NavItem[] = (navItems as unknown as { items: NavItem[] }).items
	.slice()
	.sort((a, b) => a.order - b.order);

export const SITE_FOOTER: SiteFooter = {
	tagline: (footerConfig as unknown as { tagline: string }).tagline,
	socials: (footerConfig as unknown as { socials: FooterLink[] }).socials
		.slice()
		.sort((a, b) => a.order - b.order)
};

export const PROFILE: Profile = profile as unknown as Profile;
