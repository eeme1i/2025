import { useRef, useEffect } from "react";

const charsByBrightness: string[] = [
	" ",
	".",
	":",
	"-",
	"=",
	"+",
	"*",
	"#",
	"%",
	"@",
];

// 4D Perlin noise implementation
const permutation = [
	151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
	36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
	75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
	149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
	27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
	92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
	209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
	164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
	147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
	28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
	155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
	178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
	191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
	181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
	138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
	61, 156, 180,
];

const p = [...permutation, ...permutation];

const gradients4D = [
	[1, 1, 1, 1],
	[1, 1, 1, -1],
	[1, 1, -1, 1],
	[1, 1, -1, -1],
	[1, -1, 1, 1],
	[1, -1, 1, -1],
	[1, -1, -1, 1],
	[1, -1, -1, -1],
	[-1, 1, 1, 1],
	[-1, 1, 1, -1],
	[-1, 1, -1, 1],
	[-1, 1, -1, -1],
	[-1, -1, 1, 1],
	[-1, -1, 1, -1],
	[-1, -1, -1, 1],
	[-1, -1, -1, -1],
];

function fade(t: number): number {
	return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
	return a + t * (b - a);
}

function grad4D(
	hash: number,
	x: number,
	y: number,
	z: number,
	w: number
): number {
	const g = gradients4D[hash % 16];
	return g[0] * x + g[1] * y + g[2] * z + g[3] * w;
}

function perlinNoise4D(x: number, y: number, z: number, w: number): number {
	const xi = Math.floor(x) & 255;
	const yi = Math.floor(y) & 255;
	const zi = Math.floor(z) & 255;
	const wi = Math.floor(w) & 255;
	const xf = x - Math.floor(x);
	const yf = y - Math.floor(y);
	const zf = z - Math.floor(z);
	const wf = w - Math.floor(w);

	const u = fade(xf);
	const v = fade(yf);
	const uu = fade(zf);
	const vv = fade(wf);

	const aaa = p[p[p[xi] + yi] + zi] + wi;
	const aab = p[p[p[xi] + yi] + zi + 1] + wi;
	const aba = p[p[p[xi] + yi + 1] + zi] + wi;
	const abb = p[p[p[xi] + yi + 1] + zi + 1] + wi;
	const baa = p[p[p[xi + 1] + yi] + zi] + wi;
	const bab = p[p[p[xi + 1] + yi] + zi + 1] + wi;
	const bba = p[p[p[xi + 1] + yi + 1] + zi] + wi;
	const bbb = p[p[p[xi + 1] + yi + 1] + zi + 1] + wi;

	const aaaa = p[aaa];
	const aaab = p[aaa + 1];
	const aaba = p[aab];
	const aabb = p[aab + 1];
	const abaa = p[aba];
	const abab = p[aba + 1];
	const abba = p[abb];
	const abbb = p[abb + 1];
	const baaa = p[baa];
	const baab = p[baa + 1];
	const baba = p[bab];
	const babb = p[bab + 1];
	const bbaa = p[bba];
	const bbab = p[bba + 1];
	const bbba = p[bbb];
	const bbbb = p[bbb + 1];

	const x1 = lerp(
		grad4D(aaaa, xf, yf, zf, wf),
		grad4D(baaa, xf - 1, yf, zf, wf),
		u
	);
	const x2 = lerp(
		grad4D(aaba, xf, yf, zf - 1, wf),
		grad4D(baba, xf - 1, yf, zf - 1, wf),
		u
	);
	const x3 = lerp(
		grad4D(abaa, xf, yf - 1, zf, wf),
		grad4D(bbaa, xf - 1, yf - 1, zf, wf),
		u
	);
	const x4 = lerp(
		grad4D(abba, xf, yf - 1, zf - 1, wf),
		grad4D(bbba, xf - 1, yf - 1, zf - 1, wf),
		u
	);

	const y1 = lerp(x1, x3, v);
	const y2 = lerp(x2, x4, v);

	const z1 = lerp(y1, y2, uu);

	const x5 = lerp(
		grad4D(aaab, xf, yf, zf, wf - 1),
		grad4D(baab, xf - 1, yf, zf, wf - 1),
		u
	);
	const x6 = lerp(
		grad4D(aabb, xf, yf, zf - 1, wf - 1),
		grad4D(babb, xf - 1, yf, zf - 1, wf - 1),
		u
	);
	const x7 = lerp(
		grad4D(abab, xf, yf - 1, zf, wf - 1),
		grad4D(bbab, xf - 1, yf - 1, zf, wf - 1),
		u
	);
	const x8 = lerp(
		grad4D(abbb, xf, yf - 1, zf - 1, wf - 1),
		grad4D(bbbb, xf - 1, yf - 1, zf - 1, wf - 1),
		u
	);

	const y3 = lerp(x5, x7, v);
	const y4 = lerp(x6, x8, v);

	const z2 = lerp(y3, y4, uu);

	return (lerp(z1, z2, vv) + 1) / 2; // normalize to 0-1
}

export function Noise() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let offset = 0;
		let animationId: number;
		let isResizing = false;

		// Get dynamic sizing based on container
		const getDimensions = () => {
			const rect = container.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;

			const displayWidth = rect.width;
			const displayHeight = rect.height;
			const canvasWidth = Math.round(displayWidth * dpr);
			const canvasHeight = Math.round(displayHeight * dpr);

			// Dynamic font size based on container size
			const minSize = 8;
			const maxSize = 20;
			const fontSize = Math.max(
				minSize,
				Math.min(maxSize, Math.min(displayWidth, displayHeight) / 30)
			);

			return {
				displayWidth,
				displayHeight,
				canvasWidth,
				canvasHeight,
				fontSize,
				cellWidth: fontSize * 1.2,
				cellHeight: fontSize * 2.4,
				dpr,
			};
		};

		const resizeCanvas = () => {
			const dims = getDimensions();

			// Set canvas internal size
			canvas.width = dims.canvasWidth;
			canvas.height = dims.canvasHeight;

			// Set canvas display size
			canvas.style.width = `${dims.displayWidth}px`;
			canvas.style.height = `${dims.displayHeight}px`;

			// Reset and scale context for crisp rendering
			ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
			ctx.scale(dims.dpr, dims.dpr);

			return dims;
		};

		const draw = () => {
			if (isResizing) return; // Skip drawing during resize

			const dims = resizeCanvas();

			// Clear canvas
			ctx.clearRect(0, 0, dims.displayWidth, dims.displayHeight);

			// Set font properties
			ctx.font = `${dims.fontSize}px monospace`;
			ctx.fillStyle = "white";
			ctx.textBaseline = "top";
			ctx.textAlign = "left";

			// Calculate grid - use floor to only render lines that wholly fit
			const rows = Math.floor(dims.displayHeight / dims.cellHeight);
			const cols = Math.ceil(dims.displayWidth / dims.cellWidth) + 2;

			// Draw noise pattern
			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					let noiseVal = perlinNoise4D(j * 0.1, i * 0.1, 0, offset);
					if (!Number.isFinite(noiseVal)) noiseVal = 0;
					noiseVal = Math.max(0, Math.min(1, noiseVal));

					const rawIndex = Math.floor(noiseVal * charsByBrightness.length);
					const charIndex = Math.max(
						0,
						Math.min(charsByBrightness.length - 1, rawIndex)
					);

					const char = charsByBrightness[charIndex] ?? " ";
					ctx.fillText(char, j * dims.cellWidth, i * dims.cellHeight);
				}
			}
		};

		const animate = () => {
			draw();
			offset += 0.01;
			animationId = requestAnimationFrame(animate);
		};

		// Optimized resize handler
		let resizeTimeout: NodeJS.Timeout | null = null;
		const handleResize = () => {
			isResizing = true;

			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}

			resizeTimeout = setTimeout(() => {
				isResizing = false;
				resizeCanvas(); // Ensure canvas is properly sized
			}, 16); // One frame delay for smooth resizing
		};

		// Use ResizeObserver for container-based resizing
		let resizeObserver: ResizeObserver | null = null;

		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					if (entry.target === container) {
						handleResize();
					}
				}
			});
			resizeObserver.observe(container);
		}

		// Fallback to window resize
		window.addEventListener("resize", handleResize);

		// Initial setup
		resizeCanvas();
		animate();

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			style={{
				width: "100%",
				height: "100%",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<canvas
				ref={canvasRef}
				style={{
					display: "block",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
}
