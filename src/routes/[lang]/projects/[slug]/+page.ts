import { error } from '@sveltejs/kit';
import { getProjectBySlug, getProjects, getProjectSlugs, getProfile } from '$lib/constants';
import { isLocale } from '$lib/i18n';
import type { EntryGenerator, PageLoad } from './$types';
import type { ProjectMeta } from '$lib/types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return getProjectSlugs().filter((entry) => isLocale(entry.lang));
};

export const load: PageLoad = ({ params }) => {
	const locale = isLocale(params.lang) ? params.lang : 'en';
	const entry = getProjectBySlug(locale, params.slug);
	if (!entry) {
		error(404, `Project '${params.slug}' not found`);
	}

	const projects = getProjects(locale);
	const index = projects.findIndex((p: ProjectMeta) => p.slug === params.slug);
	if (index < 0) error(404, 'Project not found');
	const project = projects[index];
	const previous = index > 0 ? projects[index - 1] : null;
	const next = index < projects.length - 1 ? projects[index + 1] : null;

	return {
		project,
		component: entry.default,
		previous,
		next,
		author: getProfile(locale).name
	};
};
