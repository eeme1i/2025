export type Project = {
  title: string;
  description?: string;
  tags?: string[];
  link?: string;
};

export type Skill = {
  category: "language" | "framework" | "other";
  items: string[];
};
