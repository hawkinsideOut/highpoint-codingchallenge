"use client";

import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "The Met Museum of Art",
	description: "Met Museum of Art used to display their art collections.",
};

const MyApp = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
			</head>
			<body
				className={` max-h-screen flex flex-col${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
					<div className="overflow-x-hidden px-8 pb-4">
						<main>{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
};
export default MyApp;
