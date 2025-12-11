import { Link } from "react-router";
import { getAllPosts } from "~/utils/blog.server";
import type { Route } from "./+types/blog";
import { Noise } from "~/components/noise";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "blog | eemeli ruohomäki" },
		{ name: "description", content: "thoughts and writings" },
	];
}

export function loader() {
	const posts = getAllPosts();
	return { posts };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
	const { posts } = loaderData;

	return (
		<div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
			{/* Header */}
			<header className="flex flex-col gap-4">
				<Link
					to="/"
					className="text-neutral-500 hover:text-neutral-300 transition-colors text-sm"
				>
					{"<"}- back home
				</Link>
				<h1 className="text-4xl">blog</h1>
				<p className="text-neutral-400">
					random thoughts, tutorials, and things i find interesting.
				</p>
			</header>

			{/* Posts list */}
			<section className="flex flex-col">
				{posts.length === 0 ? (
					<div className="border border-neutral-800 p-8 text-center">
						<p className="text-neutral-500">no posts yet. check back soon!</p>
					</div>
				) : (
					<div className="flex flex-col">
						{posts.map((post, index) => (
							<Link
								key={post.slug}
								to={`/blog/${post.slug}`}
								className="group border border-neutral-800 border-b-0 last:border-b p-4 hover:bg-neutral-900/50 transition-all duration-200"
							>
								<article className="flex flex-col gap-2">
									<div className="flex items-center gap-3 text-sm text-neutral-500">
										<time dateTime={post.date}>{post.date}</time>
										<span className="text-neutral-700">•</span>
										<span>{post.readingTime} min read</span>
									</div>
									<h2 className="text-xl group-hover:text-white transition-colors">
										{post.title}
									</h2>
									<p className="text-neutral-400 line-clamp-2">
										{post.description}
									</p>
									{post.tags && post.tags.length > 0 && (
										<div className="flex gap-2 mt-1">
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
								</article>
							</Link>
						))}
					</div>
				)}
			</section>

			{/* Decorative noise section */}
			<section className="w-full h-32 opacity-50">
				<Noise />
			</section>
		</div>
	);
}
