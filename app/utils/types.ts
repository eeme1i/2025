export type Project = {
	title: string;
	description?: string;
	tags?: string[];
	link?: string;
};

export type Skill = {
	category: "language" | "frameworks/libraries" | "other";
	items: string[];
};
