import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedProducts.module.css";
import { config } from "../../config/config";

export default function FeaturedProducts() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(`${config.API_URL}/api/products/featured`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => setProducts(data))
			.catch((err) => console.error("Fetch error:", err));
	}, []);

	return (
		<section className={styles.container}>
			<h2 className={styles.heading}>Featured Products</h2>
			<div className={styles.grid}>
				{products.map((item) => (
					<div key={item._id} className={styles.card}>
						<Link
							href={`/products/${item._id}`}
							className={styles.viewButtonLink}
							aria-label={`View details for ${item.title}`}
						>

							<Image
								src={item.image || "/placeholder.png"}
								width={200}
								height={200}
								placeholder="blur"
								blurDataURL="/placeholder.png"
								alt={item.title + ` ${item.category} product`}
								className={styles.productImage}
							/>
						</Link>
						<div className={styles.details}>
							<div className={styles.title}>
								<Link
									href={`/products/${item._id}`}
									className={styles.viewButtonLink}
									aria-label={`View product of ${item.title}`}
								>
									<h3>{item.title}</h3>
								</Link>
							</div>
							<p className={styles.description}>{item.description}</p>
							<p className={styles.price}>${item.price}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}