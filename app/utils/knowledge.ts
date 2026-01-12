import type { Skill } from "./types";
export const skills: Skill[] = [
	{
		category: "language",
		items: [
			"typescript (+ javascript)",
			"rust",
			"python",
			"go",
			"c++",
			"c",
			"html+css",
			"sql",
		],
	},
	{
		category: "frameworks/libraries",
		items: [
			"react (nextjs, react router)",
			"svelte (and sveltekit)",
			"tailwindcss",
			"echo",
			"axum",
			"spark",
			"postgresql",
			"sqlite",
			"drizzle orm",
			"various tanstack libs",
		],
	},
	{
		category: "other",
		items: ["git", "docker", "linux"],
	},
];
