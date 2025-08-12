import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
	return (
		<div key={product._id} className={styles.card}>
			<Link
				href={`/products/${product._id}`}
				className={styles.viewButtonLink}
				aria-label={`View details for ${product.title}`}
			>

				<Image
					src={product.image || "/placeholder.png"}
					width={200}
					height={200}
					placeholder="blur"
					blurDataURL="/placeholder.png"
					alt={product.title + ` ${product.category} product`}
					className={styles.productImage}
				/>
			</Link>
			<div className={styles.details}>
				<div className={styles.title}>
					<Link
						href={`/products/${product._id}`}
						className={styles.viewButtonLink}
						aria-label={`View product of ${product.title}`}
					>
						<h3>{product.title}</h3>
					</Link>
				</div>
				<p className={styles.description}>{product.description}</p>
				<p className={styles.price}>${product.price}</p>
			</div>
		</div>
	)
}
