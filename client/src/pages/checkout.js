import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Checkout.module.css";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { config } from "../../config/config";
import Head from "next/head";

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
        const res = await fetch(`${config.API_URL}/api/products?ids=${productIds}`);
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
    const res = await fetch(`${config.API_URL}/api/orders`, {
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
      await fetch(`${config.API_URL}/api/cart/clear`, {
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
      <Head>
        <title>Checkout - Handcrafted Haven</title>
        <meta name="description" content="Complete your purchase and place your order." />
      </Head>
      <main className={styles.page}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.container}>
          <section className={styles.summary}>
            <h2>Order Summary</h2>
            {cart.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <span>{item.product?.title || "Unnamed Product"}</span>
                <span>{item.quantity} × ${item.product?.price.toFixed(2)}</span>
              </div>
            ))}
            <h3 style={{ color: "green" }}>Total: ${parseFloat(total).toFixed(2)}</h3>
          </section>

          <section className={styles.form}>
            <h2>Shipping Details</h2>
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={styles.input}
              aria-label="Full Name"
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className={styles.input}
              aria-label="Address"
              required
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className={styles.input}
              aria-label="City"
              required
            />
            <input
              name="zip"
              placeholder="ZIP Code"
              value={form.zip}
              onChange={handleChange}
              className={styles.input}
              aria-label="ZIP Code"
              required
            />
            <button onClick={placeOrder} className={styles.button}>
              Place Order
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}