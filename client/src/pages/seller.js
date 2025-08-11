import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

import styles from './seller.module.css';
import { config } from '../../config/config';
import EditProfileModal from '@/components/EditProfileModal';
import AddProductModal from '@/components/AddProductModal';

const Seller = () => {
	const [id, setId] = useState(null);
	const [seller, setSeller] = useState({
		name: '',
		image: '',
		speciality: '',
		bio: '',
		products: [],
	});
	const [isUpdated, setIsUpdated] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [addProductModal, setAddProductModal] = useState(false);

	const fetchSeller = async (id) => {
		try {
			const res = await fetch(`${config.API_URL}/api/artisans/${id}`);

			if (res.status === 404) {
				router.push('/404');
				return;
			}

			const data = await res.json();
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
	}, [id, !isUpdated]);

	const handleSaveProfile = async (formData) => {
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${config.API_URL}/api/artisans/${id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			if (!res.ok) {
				throw new Error('Failed to update profile');
			}
			const updatedSeller = await res.json();
			setSeller(updatedSeller);
			setEditModal(false);
			setIsUpdated(!isUpdated);
		} catch (error) {
			alert('Failed to save profile. Please try again.');
			console.error('Error saving profile:', error);
		}
	};

	const handleSaveProduct = async (formData) => {
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`${config.API_URL}/api/products`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			if (!res.ok) {
				throw new Error('Failed to add product');
			}
			const newProduct = await res.json();
			setSeller((prev) => ({
				...prev,
				products: [...prev.products, newProduct],
			}));
			setAddProductModal(false);
			setIsUpdated(!isUpdated);
		} catch (error) {
			alert('Failed to add product. Please try again.');
			console.error('Error adding product:', error);
		}
	};


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
						onClick={() => setEditModal(true)}
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
				<div className={styles.productsSection}>
					<h2>Products</h2>
					<button
						className={styles.addProductButton}
						onClick={() => setAddProductModal(true)}
					>
						Add product
					</button>
				</div>
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

			<EditProfileModal
				isOpen={editModal}
				initialData={seller}
				onClose={() => setEditModal(false)}
				onSave={handleSaveProfile}
			/>

			<AddProductModal
				isOpen={addProductModal}
				onClose={() => setAddProductModal(false)}
				onSave={handleSaveProduct}
			/>
		</>
	);
};

export default Seller;
