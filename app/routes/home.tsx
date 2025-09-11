import { ProjectsCarousel } from "~/components/Projects";
import { projects } from "~/utils/projects";
import { skills } from "~/utils/knowledge";
import type { Skill } from "~/utils/types";
import type { Route } from "./+types/home";
import { contacts } from "~/utils/contacts";
import { useState, useEffect, Fragment } from "react";
import Link from "~/components/Link";
import { Noise } from "~/components/noise";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "eemeli ruohomäki" },
		{ name: "description", content: "eemeli's website" },
	];
}

export default function Home() {
	return (
		<div className="flex flex-col gap-8">
			<section className="flex gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">eemeli ruohomäki</h1>
          <div className="flex flex-col gap-1">
            <p>a computer science student who enjoys making modest websites.</p>
            <p>
              based in Tampere, Finland, where it's currently <Time />.
            </p>
          </div>
        </div>
        <div className="w-full"><Noise /></div>
			</section>
			<section className="flex flex-col gap-4">
				<h2>projects</h2>
				<ProjectsCarousel projects={projects} />
			</section>
			<section className="flex flex-col gap-4">
				<h2>knowledge</h2>
				<Knowledge knowledge={skills} />
			</section>
			<section className="flex flex-col gap-4">
				<h2>contact</h2>
				<div className="flex gap-2 flex-wrap">
					{contacts.map((contact, index) => (
						<Fragment key={index}>
							<Link href={contact.link} key={index} target="_blank">
								{contact.title}
							</Link>
							{index < contacts.length - 1 && (
								<span className="text-neutral-700">|</span>
							)}
						</Fragment>
					))}
				</div>
			</section>
      <section className="w-full h-64 text-white">
        <Noise />
      </section>
		</div>
	);
}

function Section({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-4">
			<h2>Section</h2>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	);
}

function Knowledge({ knowledge }: { knowledge: Skill[] }) {
	return (
		<div className="flex flex-wrap border border-neutral-700">
			{knowledge.map((skill, index) => (
				<div
					key={index}
					className="p-4 flex-1 min-w-52 border-r border-b border-neutral-700 last:border-r-0"
				>
					<h3>{skill.category}</h3>
					<ul className="list-disc pl-4">
						{skill.items.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

function Time() {
	const [currentTime, setCurrentTime] = useState<Date | null>(null);

	useEffect(() => {
		// Set the initial time only on the client after mount
		setCurrentTime(new Date());

		// Update time every minute (60000ms)
		const intervalId = setInterval(() => setCurrentTime(new Date()), 60000);

		// Clean up the interval when component unmounts
		return () => clearInterval(intervalId);
	}, []);

	// Render nothing or a placeholder during SSR/initial client render
	if (!currentTime) {
		return null; // Or a placeholder like '--:--'
	}

	return (
		<span>
			{currentTime.getHours().toString().padStart(2, "0")}
			<span className="blink">:</span>
			{currentTime.getMinutes().toString().padStart(2, "0")}
		</span>
	);
}
