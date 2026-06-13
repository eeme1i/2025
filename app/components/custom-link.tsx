import { Link } from "react-router";
type LinkProps = {
	href: string;
	children: React.ReactNode;
	target?: string;
};

export default function CustomLink({ href, children, target }: LinkProps) {
	return (
		<Link
			to={href}
			target={target}
			rel="noopener noreferrer"
			className="text-blue-400 hover:underline flex items-start w-max"
		>
			<span>{children}</span>
		</Link>
	);
}
