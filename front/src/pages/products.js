import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch("http://localhost:5500/api/products")
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
      .catch((err) => console.error("❌ Failed to load products:", err.message));
  }, []);

  useEffect(() => {
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
  }, [category, priceRange, sort, products]);

  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "2rem" }}>Browse Handcrafted Products</h1>

        <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="all">All Categories</option>
            <option value="jewelry">Jewelry</option>
            <option value="decor">Decor</option>
            <option value="clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
            <option value="all">All Prices</option>
            <option value="low">Under $50</option>
            <option value="mid">$50 - $100</option>
            <option value="high">Over $100</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredProducts.length === 0 ? (
            <p>No products match the criteria.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "1rem",
                  }}
                />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <Link href={`/products/${product._id}`}>
                  <button
                    style={{
                      marginTop: "0.5rem",
                      backgroundColor: "#DAA520",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}