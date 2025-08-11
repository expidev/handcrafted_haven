
import styles from "../styles/ArtisanCard.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ArtisanCard({ artisan }) {
	return (
		<>
			<div className={styles.card}>
				<Link href={`/artisans/${artisan._id}`}>
					<div>
						<Image
							src={artisan.image || "https://via.placeholder.com/150"}
							alt={artisan.name}
							width={300}
							height={250}
							className={styles.image}
						/>
					</div>
				</Link>
				<div className={styles.details}>
					<Link href={`/artisans/${artisan._id}`}>
						<h2 className={styles.name}>{artisan.name}</h2>
					</Link>
					<div className={styles.metadata}>
						<p className={styles.speciality}>Speciality: {artisan.speciality ? artisan.speciality : "N/A"}</p>
						<p className={styles.category}>{artisan.bio ? artisan.bio : "N/A"}</p>
					</div>
				</div>
			</div >
		</>
	);
}