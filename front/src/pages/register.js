// pages/register.js
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5500/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      alert("Registered successfully. You can now login.");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "400px", margin: "4rem auto", backgroundColor: "white", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Create an Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Register As</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "1.5rem" }}
          >
            <option value="buyer">Buyer</option>
            <option value="artisan">Artisan (Seller)</option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#DAA520",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#DAA520" }}>
            Login here
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
