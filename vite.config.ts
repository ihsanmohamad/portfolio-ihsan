import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

const site = {
	name: 'site-content-resolver',
	enforce: 'pre' as const,
	resolveId(id: string, importer: string | undefined) {
		if (!importer || !id.endsWith('.yaml') || id.startsWith('virtual:')) return null;
		const here = dirname(importer);
		const absolute = resolve(here, id);
		return { id: absolute };
	},
	load(id: string) {
		if (!id.endsWith('.yaml') || id.includes('svelte-kit') || id.includes('node_modules'))
			return null;
		const raw = readFileSync(id, 'utf8');
		const parsed = parseYaml(raw);
		return { code: `export default ${JSON.stringify(parsed)};`, map: null };
	}
};

export default defineConfig({
	plugins: [site, tailwindcss(), sveltekit()]
});
