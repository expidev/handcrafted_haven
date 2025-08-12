import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { config } from "../../config/config";
import styles from "./login.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import Head from "next/head";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch(`${config.API_URL}/api/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (res.ok) {
				localStorage.setItem("token", data.token);
				router.push("/");
			} else {
				setError(data.message || "Login failed");
			}
		} catch (err) {
			setError(err.message || "An error occurred while logging in.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Navbar />
			<Head>
				<title>Login - Handcrafted Haven</title>
				<meta name="description" content="Login to your account" />
			</Head>
			<div className={styles.container}>
				<h1 className={styles.title}>Login</h1>
				<form onSubmit={handleSubmit}>
					{error && <p className={styles.error}>{error}</p>}
					<label className={styles.formLabel} htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						className={styles.input}
						placeholder="Email"
						value={email}
						autoComplete="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label className={styles.formLabel} htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						className={styles.input}
						placeholder="Password"
						value={password}
						aria-label="Password"
						autoComplete="current-password"
						minLength={5}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type="submit"
						className={styles.button}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p>
					Don&apos;t have an account?{" "}
					<Link href="/register" aria-label="Register" className={styles.link} >
						Register here
					</Link>
				</p>
			</div>
			<Footer />
		</>
	);
}
