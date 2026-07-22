export interface Experience {
	id: string;
	order: number;
	company: string;
	role: string;
	location: string;
	startDate: string;
	endDate: string | null;
	current: boolean;
	description: string;
	bullets: string[];
	link?: string;
}

export interface ProjectMeta {
	id: string;
	slug: string;
	order: number;
	title: string;
	category: string;
	year: string;
	shortDescription: string;
	imageUrl: string;
	tech: string[];
	liveUrl?: string;
	repoUrl?: string;
	featured: boolean;
}

export interface Project extends ProjectMeta {
	body: string;
}

export interface Certification {
	id: string;
	order: number;
	title: string;
	issuer: string;
	issueDate: string;
	credentialUrl?: string;
	description: string;
}

export interface Award {
	id: string;
	order: number;
	title: string;
	issuer: string;
	date: string;
	description: string;
	achievement?: string;
}

export interface Skill {
	id: string;
	order: number;
	category: string;
	items: string[];
}

export interface BlogPostMeta {
	id: string;
	slug: string;
	title: string;
	publishedAt: string;
	category: string;
	author: string;
	readingMinutes: number;
	excerpt: string;
	imageUrl: string;
	featured: boolean;
}

export interface BlogPost extends BlogPostMeta {
	body: string;
}

export interface NavItem {
	id: string;
	order: number;
	label: string;
	slug: string;
	external: boolean;
}

export type CanonicalPage = 'about' | 'projects' | 'blog' | 'contact';

export interface FooterLink {
	id: string;
	order: number;
	label: string;
	url: string;
}

export interface SiteFooter {
	tagline: string;
	socials: FooterLink[];
}

export interface Profile {
	name: string;
	tagline: string;
	location: string;
	email: string;
	phone: string;
	website: string;
	summary: string;
	languages: string[];
}
