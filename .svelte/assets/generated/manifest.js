import * as layout from "/_app/assets/components/layout.svelte";

const components = [
	() => import("/_app/routes/interact/+page.svelte"),
	() => import("/_app/routes/+layout.svelte"),
	() => import("/_app/routes/+page.svelte")
];

export const pages = [
	{
		// interact/+page.svelte
		pattern: /^\/interact\/\+page\/?$/,
		parts: [
			[components[0]]
		]
	},

	{
		// +layout.svelte
		pattern: /^\/\+layout\/?$/,
		parts: [
			[components[1]]
		]
	},

	{
		// +page.svelte
		pattern: /^\/\+page\/?$/,
		parts: [
			[components[2]]
		]
	}
];

export const ignore = [
	
];

export { layout };