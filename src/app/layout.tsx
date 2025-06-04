import "./globals.css";
import Redux from "./redux/provider";
import MyApp from "./components/App";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Redux>
			<MyApp>{children}</MyApp>
		</Redux>
	);
}
