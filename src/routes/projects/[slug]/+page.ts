import { error } from '@sveltejs/kit';
import { PROJECTS_BY_SLUG, PROJECTS_SORTED, PROFILE } from '$lib/constants';
import type { EntryGenerator, PageLoad } from './$types';
import type { ProjectMeta } from '$lib/types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return PROJECTS_SORTED.map((p: ProjectMeta) => ({ slug: p.slug }));
};

export const load: PageLoad = ({ params }) => {
	const entry = PROJECTS_BY_SLUG[params.slug];
	if (!entry) {
		error(404, `Project '${params.slug}' not found`);
	}

	const index = PROJECTS_SORTED.findIndex((p: ProjectMeta) => p.slug === params.slug);
	const project = PROJECTS_SORTED[index];
	if (!project) error(404, 'Project not found');

	const previous = index > 0 ? PROJECTS_SORTED[index - 1] : null;
	const next = index < PROJECTS_SORTED.length - 1 ? PROJECTS_SORTED[index + 1] : null;

	return {
		project,
		component: entry.default,
		previous,
		next,
		author: PROFILE.name
	};
};
