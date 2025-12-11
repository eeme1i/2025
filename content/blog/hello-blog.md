---
title: "hello, blog"
date: 2025-12-10
description: "a technical walkthrough of how i built this blog using markdown files, gray-matter for frontmatter parsing, and marked for rendering."
tags:
  - tutorial
  - react
  - typescript
---

## the stack

this blog is built with:

- **React Router v7** - the framework
- **gray-matter** - parses frontmatter from markdown files
- **marked** - converts markdown to HTML
- **highlight.js** - syntax highlighting

let me walk you through how it all works.

## reading markdown files

the core utility lives in `app/utils/blog.server.ts`. it's a server-only file (note the `.server.ts` extension) that reads from the filesystem:

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts() {
	const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

	return files.map((file) => {
		const content = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
		const { data } = matter(content);
		return { slug: file.replace(".md", ""), ...data };
	});
}
```

## frontmatter

frontmatter is YAML at the top of the markdown file, wrapped in `---`:

```yaml
---
title: "my post title"
date: 2025-12-10
description: "a brief description"
tags:
  - tag1
  - tag2
---
```

## highlighting code

i use `highlight.js` to highlight code blocks. it's a simple and effective way to highlight code blocks in markdown files.

```typescript
import hljs from "highlight.js";

const renderer = new marked.Renderer();
renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
	const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
	const highlighted = hljs.highlight(text, { language }).value;
	return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.use({ renderer });
```

## routes

react router v7 makes it easy to set up dynamic routes:

```typescript
// routes.ts
export default [
	route("blog", "routes/blog.tsx"),
	route("blog/:slug", "routes/blog.$slug.tsx"),
] satisfies RouteConfig;
```

the `blog.$slug.tsx` route catches any path like `/blog/hello-world` and loads the corresponding markdown file:

```typescript
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const htmlContent = marked(content) as string;

  return {
    ...
  }
}
```

and then handle loading the post in the route:

```typescript
export function loader({ params }: LoaderArgs) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw new Response("Not Found", { status: 404 });
	}

	// we also want to show the next and previous posts
	const allPosts = getAllPosts();
	const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
	const prevPost =
		currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
	const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

	return { post, prevPost, nextPost };
}
```

## conclusion

that's the basic setup! the beauty of this approach is its simplicity – no CMS, no database, just markdown files in a folder.
