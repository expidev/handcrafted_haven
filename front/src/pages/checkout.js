import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Checkout.module.css";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
  });

  const { userId, total, products } = router.query;
  const parsedProducts = products ? JSON.parse(products) : [];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productIds = parsedProducts.map((item) => item.productId).join(",");
        const res = await fetch(`http://localhost:5500/api/products?ids=${productIds}`);
        const fullProducts = await res.json();

        const enrichedItems = parsedProducts.map((item) => {
          const product = fullProducts.find((p) => p._id === item.productId);
          return {
            ...item,
            product,
          };
        });

        setCart({ items: enrichedItems });
      } catch (err) {
        console.error("Product search error:", err);
      }
    };

    if (parsedProducts.length > 0) {
      fetchProductDetails();
    }
  }, [products]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    // ✅ Check mandatory fields (shiping address)
    if (!form.fullName || !form.address || !form.city || !form.zip) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5500/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        products: parsedProducts,
        total: parseFloat(total),
        fullName: form.fullName,
        address: form.address,
        city: form.city,
        zip: form.zip,
      }),
    });

    if (res.ok) {
      alert("Order placed successfully!");
      await fetch("http://localhost:5500/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/orders");
    } else {
      alert("Failed to place order");
    }
  };

  if (!cart) {
    return <p style={{ padding: "2rem" }}>Loading checkout...</p>;
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1>Checkout</h1>

        <section className={styles.summary}>
          <h2>Order Summary</h2>
          {cart.items.map((item, index) => (
            <div key={index} className={styles.item}>
              <span>{item.product?.title || "Unnamed Product"}</span>
              <span>{item.quantity} × ${item.product?.price.toFixed(2)}</span>
            </div>
          ))}
          <h3>Total: ${parseFloat(total).toFixed(2)}</h3>
        </section>

        <section className={styles.form}>
          <h2>Shipping Details</h2>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            name="zip"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button onClick={placeOrder} className={styles.button}>
            Place Order
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}