declare module '*.md' {
	import type { SvelteComponent } from 'svelte';

	export const metadata: Record<string, unknown>;
	export default class Comp extends SvelteComponent {}
}

declare module '*.yaml' {
	const value: unknown;
	export default value;
}
