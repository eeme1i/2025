import type { Project } from "./types";

export const projects: Project[] = [
	{
		title: "eeru.net",
		description: "my personal website",
		link: "https://eeru.net",
		tags: ["react", "react-router", "development", "ui/ux design"],
	},
	{
		title: "home",
		description: "personal browser homepage using rust+svelte",
		link: "https://github.com/eeme1i/dashboard",
		tags: ["rust", "svelte", "development", "ui/ux design"],
	},
	{
		title: "cash",
		tags: ["svelte", "auth", "database", "ui/ux design"],
		description: "a simple and fast app to track your expenses",
		link: "https://cash.eeru.net",
	},
	{
		title: "write",
		description:
			"extremely minimal, fast and fully local place for quick note taking",
		link: "https://write.eeru.net",
		tags: ["vanilla js"],
	},
	{
		title: "sahko",
		description: "analyse data of finland's electricity grid",
		link: "https://sahko.eeru.net",
		tags: ["remix/react", "development", "ui/ux design"],
	},
	{
		title: "travel",
		description: "app to plan your trips with a llm travel agent",
		link: "https://travel.eeru.net",
		tags: ["svelte", "api", "ui/ux design"],
	},
	{
		title: "wiki",
		description:
			"app to learn about different topics via random wikipedia articles with a llm",
		link: "https://wiki.eeru.net",
		tags: ["svelte", "api", "ui/ux design"],
	},
	{
		title: "thevoid",
		description: "twitter like social media app",
		tags: ["nextjs/react", "development", "database", "ui/ux design"],
	},
	{
		title: "lettucewatch",
		description:
			"a web app that allows users to select what movie they want to watch through a tinder-style ui.",
		link: "https://lettuce.watch",
		tags: ["remix", "frontend", "ui/ux design"],
	},
	{
		title: "insync",
		description:
			"a web app that generates spotify playlists based on the user's choices.",
		link: "https://insync.vercel.app",
		tags: ["remix", "ui/ux design"],
	},
];
