import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { config } from "../../config/config";
import styles from "./register.module.css";

export default function Register() {
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		isSeller: "buyer",
	});
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState({
		success: false,
		message: ""
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus({ success: false, message: "" });
		setLoading(true);
		try {
			const submittedForm = {
				name: form.name,
				email: form.email,
				password: form.password,
				isSeller: form.role != "seller" ? false : true,
			};
			const res = await fetch(`${config.API_URL}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(submittedForm),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Registration failed");
			router.push("/login");
		} catch (err) {
			setStatus({
				success: false,
				message: err.message
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Register - Handcrafted Haven</title>
				<meta name="description" content="Create an account on Handcrafted Haven to explore and purchase unique handmade items or sell your own creations." />
			</Head>
			<Navbar />
			<div className={styles.container}>
				<h1 className={styles.title}>Create an Account</h1>
				{status.message && <p className={status.success ? styles.success : styles.error}>{status.message}</p>}
				<form onSubmit={handleSubmit}>
					<label className={styles.formLabel} htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						placeholder="Enter your name"
						value={form.name}
						onChange={handleChange}
						className={styles.input}
					/>

					<label className={styles.formLabel} htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						placeholder="Enter your email"
						value={form.email}
						onChange={handleChange}
						className={styles.input}
					/>

					<label className={styles.formLabel} htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						placeholder="Enter your password"
						minLength={5}
						value={form.password}
						onChange={handleChange}
						className={styles.input}
					/>

					<label className={styles.formLabel} htmlFor="role">Register As</label>
					<select
						id="role"
						name="role"
						value={form.role}
						onChange={handleChange}
						className={styles.select}
						required
					>
						<option value="buyer">Buyer</option>
						<option value="seller">Artisan (Seller)</option>
					</select>

					<button
						type="submit"
						className={styles.button}
					>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>
				<p className={styles.footerText}>
					Already have an account?{" "}
					<Link href="/login" className={styles.link}>
						Login here
					</Link>
				</p>
			</div>
			<Footer />
		</>
	);
}
