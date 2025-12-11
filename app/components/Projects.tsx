import type { Project } from "~/utils/types";
import Link from "./Link";

export function ProjectItem({ title, description, tags, link }: Project) {
	return (
		<div className="flex flex-col border-r border-y last:border-r-0 first:border-l border-neutral-700 p-2 min-w-72 h-64">
			<div className="flex flex-col gap-2 flex-1 overflow-y-auto">
				<h3 className="tracking-tight ">{title}</h3>
				{description && <p className="overflow-y-auto">{description}</p>}
				{tags && tags.length > 0 && (
					<div className="flex gap-1 flex-wrap">
						{tags.map((tag) => (
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
			{link && (
				<Link href={link} target="_blank">
					view
				</Link>
			)}
		</div>
	);
}

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
	return (
		<div className="flex overflow-x-auto pb-4">
			{projects.map((project: Project, idx: number) => (
				<ProjectItem key={idx} {...project} />
			))}
		</div>
	);
}
