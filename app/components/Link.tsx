type LinkProps = {
	href: string;
	children: React.ReactNode;
	target?: string;
};

export default function Link({ href, children, target }: LinkProps) {
	return (
		<a
			href={href}
			target={target}
			rel="noopener noreferrer"
			className="text-blue-400 hover:underline flex items-start w-max"
		>
			<span>{children}</span>
		</a>
	);
}
