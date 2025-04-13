import type { Project } from "~/utils/types";
import Link from "./Link";

export function ProjectItem({ title, description, tags, link }: Project) {
  return (
    <div className="flex flex-col gap-2 border border-neutral-700 p-2 min-w-64 h-64">
      <div className="flex flex-col gap-2 flex-1 overflow-y-scroll">
        <h3 className="tracking-tight ">{title}</h3>
        {description && <p className="overflow-y-scroll">{description}</p>}
        {tags && tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-neutral-400 border p-0.5 border-neutral-700"
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
    <div className="flex gap-2 overflow-x-auto pb-4">
      {projects.map((project: Project, idx: number) => (
        <ProjectItem key={idx} {...project} />
      ))}
    </div>
  );
}
