
import styles from "../styles/ArtisanCard.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ArtisanCard({ artisan }) {
	return (
		<Link href={`/artisans/${artisan._id}`} className={styles.link}>
			<div className={styles.card}>
				<div>
					<Image
						src={artisan.image || "https://via.placeholder.com/150"}
						alt={artisan.name}
						width={300}
						height={300}
						className={styles.image}
					/>	
				</div>
				<h3 className={styles.name}>{artisan.name}</h3>
				<p className={styles.specialty}>{artisan.specialty}</p>
				<p className={styles.category}>{artisan.category}</p>
				<p className={styles.region}>{artisan.region}</p>
			</div>
		</Link>
	);
}