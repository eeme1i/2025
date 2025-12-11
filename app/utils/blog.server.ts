import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags?: string[];
	content: string;
	readingTime: number;
}

export interface BlogPostMeta {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags?: string[];
	readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

// Configure marked with highlight.js
marked.setOptions({
	gfm: true,
	breaks: true,
});

// Custom renderer for code blocks with syntax highlighting
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
	const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
	const highlighted = hljs.highlight(text, { language }).value;
	return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.use({ renderer });

export function getAllPosts(): BlogPostMeta[] {
	// Ensure the blog directory exists
	if (!fs.existsSync(BLOG_DIR)) {
		return [];
	}

	const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

	const posts = files.map((file) => {
		const filePath = path.join(BLOG_DIR, file);
		const fileContent = fs.readFileSync(filePath, "utf-8");
		const { data, content } = matter(fileContent);

		return {
			slug: file.replace(".md", ""),
			title: data.title || "Untitled",
			date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
			description: data.description || "",
			tags: data.tags || [],
			readingTime: calculateReadingTime(content),
		};
	});

	// Sort by date, newest first
	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export function getPostBySlug(slug: string): BlogPost | null {
	const filePath = path.join(BLOG_DIR, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);

	const htmlContent = marked(content) as string;

	return {
		slug,
		title: data.title || "Untitled",
		date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
		description: data.description || "",
		tags: data.tags || [],
		content: htmlContent,
		readingTime: calculateReadingTime(content),
	};
}
