import { Link, data } from "react-router";
import { getPostBySlug, getAllPosts } from "~/utils/blog.server";
import type { Route } from "./+types/blog.$slug";
import { Noise } from "~/components/noise";

export function meta({ data }: Route.MetaArgs) {
	if (!data) {
		return [
			{ title: "post not found | eemeli ruohomäki" },
			{ name: "description", content: "this post could not be found" },
		];
	}
	return [
		{ title: `${data.post.title} | eemeli ruohomäki` },
		{ name: "description", content: data.post.description },
	];
}

export function loader({ params }: Route.LoaderArgs) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw data(null, { status: 404 });
	}

	const allPosts = getAllPosts();
	const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
	const prevPost =
		currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
	const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

	return { post, prevPost, nextPost };
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
	const { post, prevPost, nextPost } = loaderData;

	return (
		<div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
			{/* Navigation */}
			<header className="flex flex-col gap-4">
				<Link
					to="/blog"
					className="text-neutral-500 hover:text-neutral-300 transition-colors text-sm"
				>
					{"<"}- all posts
				</Link>
			</header>

			{/* Post header */}
			<div className="flex flex-col gap-4 border-b border-neutral-800 pb-8">
				<div className="flex items-center gap-3 text-sm text-neutral-500">
					<time dateTime={post.date}>{post.date}</time>
					<span className="text-neutral-700">•</span>
					<span>{post.readingTime} min read</span>
				</div>
				<h1 className="text-4xl leading-tight">{post.title}</h1>
				<p className="text-neutral-400 text-lg">{post.description}</p>
				{post.tags && post.tags.length > 0 && (
					<div className="flex gap-2">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="text-xs text-neutral-400 border px-1 py-0.5 border-neutral-700 bg-neutral-900"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>

			{/* Post content */}
			<article
				className="prose prose-invert prose-neutral max-w-none"
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>

			{/* Post navigation */}
			<nav className="flex flex-col sm:flex-row gap-4 border-t border-neutral-800 pt-8">
				{prevPost ? (
					<Link
						to={`/blog/${prevPost.slug}`}
						className="flex-1 group p-4 border border-neutral-800 hover:bg-neutral-900/50 transition-all"
					>
						<span className="text-sm text-neutral-500">{"<"}- older</span>
						<p className="text-neutral-300 group-hover:text-white transition-colors truncate">
							{prevPost.title}
						</p>
					</Link>
				) : (
					<div className="flex-1" />
				)}
				{nextPost ? (
					<Link
						to={`/blog/${nextPost.slug}`}
						className="flex-1 group p-4 border border-neutral-800 hover:bg-neutral-900/50 transition-all text-right"
					>
						<span className="text-sm text-neutral-500">newer -{">"}</span>
						<p className="text-neutral-300 group-hover:text-white transition-colors truncate">
							{nextPost.title}
						</p>
					</Link>
				) : (
					<div className="flex-1" />
				)}
			</nav>

			{/* Decorative noise section */}
			<section className="w-full h-32 opacity-50">
				<Noise />
			</section>
		</div>
	);
}
