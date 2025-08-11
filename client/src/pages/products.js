import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Footer from "../components/Footer";
import styles from "./products.module.css";
import { config } from "../../config/config";
import { useParams } from "next/navigation";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${config.API_URL}/api/products`)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Unexpected response: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("❌ Failed to load products:", err.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (products && products.length != 0) {
      let result = [...products];

      if (category !== "all") {
        result = result.filter((p) => p.category === category);
      }

      if (priceRange !== "all") {
        result = result.filter((p) => {
          if (priceRange === "low") return p.price < 50;
          if (priceRange === "mid") return p.price >= 50 && p.price <= 100;
          if (priceRange === "high") return p.price > 100;
        });
      }

      if (sort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (sort === "newest") {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setFilteredProducts(result);
    }
  }, [category, priceRange, sort, products]);

  return (
    <>
      <Navbar />
      <Head>
        <title>Products - Handcrafted Haven</title>
        <meta name="description" content="Browse our collection of unique handmade products." />
      </Head>
      <main style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "2rem" }}>Browse Handcrafted Products</h1>

        <div className={styles.filterContainer}>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className={styles.filterInput}
          >
            <option value="all">All Categories</option>
            <option value="jewelry">Jewelry</option>
            <option value="decor">Decor</option>
            <option value="clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            onChange={(e) => setPriceRange(e.target.value)}
            value={priceRange}
            className={styles.filterInput}
          >
            <option value="all">All Prices</option>
            <option value="low">Under $50</option>
            <option value="mid">$50 - $100</option>
            <option value="high">Over $100</option>
          </select>

          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className={styles.filterInput}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {isLoading && (
          <div className={styles.skeletonLoader}>
            <p>Loading products...</p>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "3rem",
            rowGap: "4rem",
            padding: "2rem",
          }}
        >
          {filteredProducts && filteredProducts.length === 0 && (
            <p
              style={{
                height: "50vh",
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#666",
                alignContent: "center",
              }}
            >
              No products match the criteria.
            </p>
          )}
          {filteredProducts && filteredProducts.length > 0 && (
            filteredProducts.map((item) => (
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
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}