import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/FeaturedProducts.module.css";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/products")
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
        {products.slice(0, 5).map((item) => (
          <div key={item._id} className={styles.card}>
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.title}
              className={styles.productImage}
            />
            <div className={styles.details}>
              <h3>{item.title}</h3>
              <p className={styles.price}>${item.price}</p>
              <Link href={`/products/${item._id}`}>
                <button className={styles.viewButton}>View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}