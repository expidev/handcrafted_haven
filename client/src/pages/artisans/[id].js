import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

import styles from "../../styles/Artisan.module.css";
import { config } from "../../../config/config";
import Head from "next/head";

const ArtisanDetails = () => {
	const router = useRouter();
	const { id } = router.query;
	const [artisan, setArtisan] = useState(null);

	const fetchArtisan = async (id) => {
		try {
			const res = await fetch(
				`${config.API_URL}/api/artisans/${id}`,
			);

			if (res.status === 404) {
				router.push("/404");
				return;
			}

			const data = await res.json();

			setArtisan(data);
		} catch (error) {
			console.error("Error fetching artisan details:", error);
		}
	};

	useEffect(() => {
		if (id) fetchArtisan(id);
	}, [id]);

	return (
		<>
			<Navbar />
			<Head>
				<title>{artisan?.name || "Artisan Details"} - Handcrafted Haven</title>
				<meta
					name="description"
					content={`Learn more about ${artisan?.name || "this artisan"} and their unique creations.`}
				/>
			</Head>
			<main className={styles.container}>
				<div className={styles.flexRow}>
					<Image
						src={artisan?.image || "/placeholder.png"}
						alt={artisan?.name}
						width={300}
						height={300}
						className={styles.avatar}
					/>
					<div className={styles.details}>
						<h1 className={styles.name}>{artisan?.name}</h1>
						<p>Speciality: {artisan?.speciality || "N/A"}</p>
						<p>Bio: {artisan?.bio || "N/A"}</p>
					</div>
				</div>
				<hr className={styles.divider} />
				<h2>Products</h2>
				<ul className={styles.productGrid}>
					{artisan?.products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</ul>
			</main>
			<Footer />
		</>
	);
};

export default ArtisanDetails;