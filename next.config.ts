import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: "/api/metmuseum/:path*",
				destination:
					"https://collectionapi.metmuseum.org/public/collection/v1/:path*",
			},
		];
	},
	images: {
		remotePatterns: [new URL("https://images.metmuseum.org/**")],
		minimumCacheTTL: 60,
	},
};

export default nextConfig;
