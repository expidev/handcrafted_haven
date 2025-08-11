import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

import styles from './seller.module.css';
import { config } from '../../config/config';

const Seller = () => {
	const [id, setId] = useState(null);
	const [seller, setSeller] = useState(null);

	const fetchSeller = async (id) => {
		try {
			const res = await fetch(`${config.API_URL}/api/artisans/${id}`);
			console.log("Fetching seller with ID:", id);

			if (res.status === 404) {
				router.push('/404');
				return;
			}

			const data = await res.json();
			console.log("Seller data fetched:", data);
			setSeller(data);
		} catch (error) {
			console.error('Error fetching seller details:', error);
		}
	};

	useEffect(() => {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const decodedToken = JSON.parse(atob(token.split('.')[1]));
				if (decodedToken) {
					setId(decodedToken.id);
					fetchSeller(decodedToken.id);
				}

			}
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [id]);

	return (
		<>
			<Navbar />
			<Head>
				<title>{'Seller Dashboard'} - Handcrafted Haven</title>
				<meta
					name="description"
					content={`Learn more about ${seller?.name || 'this seller'} and their unique creations.`}
				/>
			</Head>
			<main className={styles.container}>
				<div className={styles.profile}>
					<h2>Seller Management</h2>
					<button
						className={styles.editButton}
					>
						Edit Profile
					</button>
				</div>
				<div className={styles.flexRow}>
					<Image
						src={seller?.image || '/placeholder.png'}
						alt={seller?.name || 'Seller Avatar'}
						width={300}
						height={300}
						className={styles.avatar}
					/>
					<div className={styles.details}>
						<h1 className={styles.name}>{seller?.name}</h1>
						<p>Speciality: {seller?.speciality || 'N/A'}</p>
						<p>Bio: {seller?.bio || 'N/A'}</p>
					</div>
				</div>
				<hr className={styles.divider} />
				<h2>Products</h2>
				<ul className={styles.productGrid}>
					{seller?.products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
					{!seller?.products?.length && (
						<p className={styles.nothing}>No products found for this artisan.</p>
					)}
				</ul>
			</main>
			<Footer />
		</>
	);
};

export default Seller;