import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import colors from "../utils/colors";
import Footer from "../components/Footer";
import Link from "next/link";
import { config } from "../../config/config";
import Image from "next/image";
import Head from "next/head";

export default function Orders() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		fetch(`${config.API_URL}/api/orders`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setOrders(data))
			.catch((err) => console.error("Failed to fetch orders", err));
	}, []);

	return (
		<>
			<Navbar />
			<Head>
				<title>Order History - Handcrafted Haven</title>
				<meta name="description" content="View your past orders and their details." />
			</Head>
			<main style={{ padding: "2rem", minHeight: "80vh", maxWidth: "1200px", margin: "0 auto" }}>
				<h1>Order History</h1>
				{orders.map((order) => (
					<div
						key={order._id}
						style={{
							border: `1px solid ${colors.mediumGray}`,
							margin: "1rem 0",
							padding: "1rem",
							borderRadius: "12px",
							background: colors.softSand,
						}}
					>
						<h2>Status: {order.status}</h2>
						<p>Total: ${order.total.toFixed(2)}</p>
						<ul style={{ listStyle: "none", padding: 0 }}>
							{order.products.map((item, idx) => {
								const product = item.productId;
								if (!product) return null;

								return (
									<li
										key={idx}
										style={{
											display: "flex",
											alignItems: "center",
											marginBottom: "1rem",
										}}
									>
										<Image
											src={product.image || "/placeholder.png"}
											alt={product.title}
											width={80}
											height={80}
											style={{
												width: "80px",
												height: "80px",
												objectFit: "cover",
												marginRight: "1rem",
												borderRadius: "8px",
											}}
										/>
										<div>
											<Link href={`/product/${product._id}`}>
												<strong style={{ fontSize: "1rem", color: "green", cursor: "pointer" }}>
													{product.title}
												</strong>
											</Link>
											<p style={{ margin: 0 }}>
												{item.quantity} × ${product.price.toFixed(2)} = $
												{(item.quantity * product.price).toFixed(2)}
											</p>
										</div>
									</li>
								);
							})}
						</ul>
						<p style={{ fontSize: "0.8rem", color: colors.mediumGray }}>
							Placed on: {new Date(order.createdAt).toLocaleDateString()}
						</p>
					</div>
				))}
			</main>
			<Footer />
		</>
	);
}