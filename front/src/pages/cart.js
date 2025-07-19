import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Cart.module.css";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoadCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5500/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        fetchCart(token);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuthAndLoadCart();
  }, []);

  const fetchCart = async (token) => {
    try {
      const res = await fetch("http://localhost:5500/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Erro ao buscar o carrinho:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (!newQty || newQty < 1) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch("http://localhost:5500/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQty }),
      });

      setCart((prevCart) => {
        const updatedItems = prevCart.items.map((item) => {
          if (item.productId && item.productId._id === productId) {
            return { ...item, quantity: newQty };
          }
          return item;
        });
        return { ...prevCart, items: updatedItems };
      });
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch("http://localhost:5500/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      fetchCart(token);
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  };

  const totalPrice = cart?.items?.reduce((acc, item) => {
    if (!item.productId || !item.productId.price) return acc;
    return acc + item.productId.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to proceed to checkout.");
      router.push("/login");
      return;
    }

    router.push({
      pathname: "/checkout",
      query: {
        userId: cart.userId,
        total: totalPrice.toFixed(2),
        products: JSON.stringify(
          cart.items
            .filter((item) => item.productId && item.productId._id)
            .map((item) => ({
              productId: item.productId._id,
              quantity: item.quantity,
            }))
        ),
      },
    });
  };

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading cart...</p>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className={styles.container}>
          <h1>Please log in to access your cart.</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1>Your Cart</h1>

        {!cart?.items || cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.items.map((item) => {
              const product = item.productId;
              if (!product) return null;

              return (
                <div key={item._id} className={styles.item}>
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.title}
                    className={styles.image}
                    style={{ objectFit: "cover", maxHeight: "180px" }}
                  />
                  <div className={styles.details}>
                    <h3>{product.title}</h3>
                    <p>${product.price} each</p>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(product._id, parseInt(e.target.value))
                      }
                      className={styles.qty}
                    />
                    <button
                      className={styles.remove}
                      onClick={() => removeItem(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <h2>Total: ${totalPrice?.toFixed(2)}</h2>

            <button className={styles.checkout} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}