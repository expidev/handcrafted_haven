import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import colors from "../utils/colors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("buyer");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5500/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        router.push("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("An error occurred while logging in.");
    }
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          backgroundColor: colors.softSand,
          minHeight: "100vh",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <h1 style={{ marginBottom: "1rem", color: colors.charcoalGray }}>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>

            <button
              type="submit"
              style={{
                backgroundColor: colors.burntGold,
                color: "white",
                padding: "10px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c28e18")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.burntGold)}
            >
              Login
            </button>
          </form>

          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: colors.burntGold, textDecoration: "underline" }}>
              Register here
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
