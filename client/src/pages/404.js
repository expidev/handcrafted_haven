import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import colors from "../utils/colors";

export default function NotFound() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 200);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Navbar />
			<main
				style={{
					padding: "3rem 2rem",
					maxWidth: "900px",
					margin: "0 auto",
					height: "100vh",
					fontFamily: "Arial, sans-serif",
					lineHeight: "1.8",
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0)" : "translateY(20px)",
					transition: "opacity 1s ease, transform 1s ease",
					textAlign: "center",
				}}
			>
				<h1
					style={{
						fontSize: "2.75rem",
						marginBottom: "1.2rem",
						color: colors.terracotta,
						borderBottom: `3px solid ${colors.burntGold}`,
						paddingBottom: "0.5rem",
					}}
				>
					404 - Page Not Found
				</h1>
				<p
					style={{
						fontSize: "1.1rem",
						marginBottom: "1.5rem",
						color: colors.charcoalGray,
					}}
				>
					The page you are looking for doesn't exist.
				</p>
				<a
					href="/"
					style={{
						display: "inline-block",
						marginTop: "1.5rem",
						padding: "0.75rem 1.5rem",
						backgroundColor: colors.burntGold,
						color: "#fff",
						textDecoration: "none",
						borderRadius: "5px",
						fontWeight: "bold",
						transition: "background-color 0.3s ease",
					}}
					onMouseOver={(e) =>
						(e.target.style.backgroundColor = colors.terracotta)
					}
					onMouseOut={(e) =>
						(e.target.style.backgroundColor = colors.burntGold)
					}
				>
					Go Back Home
				</a>
			</main>
			<Footer />
		</>
	);
}