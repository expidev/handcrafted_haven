import React, { useEffect, useState } from 'react';
import styles from './EditProfileModal.module.css';

const AddProductModal = ({ isOpen, onClose, onSave }) => {
	const [formData, setFormData] = useState(() => ({
		title: '',
		description: '',
		price: '',
		category: '',
		image: '',
	}));

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData((prevData) => ({
			...prevData,
			image: file,
		}));
	};

	const handleSave = () => {
		const data = new FormData();
		data.append('title', formData.title);
		data.append('description', formData.description);
		data.append('price', formData.price);
		data.append('category', formData.category);
		if (formData.image instanceof File) {
			console.log('File is a valid File object:', formData.image);
			data.append('image', formData.image);
		}
		onSave(data);
		setFormData({
			title: '',
			description: '',
			price: '',
			category: '',
			image: '',
		});
		onClose();
	};

	return (
		<>
			{isOpen && (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<button className={styles.closeButton} onClick={onClose}>
							x
						</button>
						<h2>Add Product</h2>
						<div className={styles.formGroup}>
							<label htmlFor='name'>Product Name <span className={styles.required}>*</span></label>
							<input
								type="text"
								id='name'
								required
								name="title"
								className={styles.input}
								placeholder="Enter product name"
								autoComplete="off"
								value={formData.title}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='description'>Description</label>
							<textarea
								id='description'
								name="description"
								value={formData.description}
								placeholder='Enter product description'
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='price'>Price <span className={styles.required}>*</span></label>
							<input
								type="number"
								id='price'
								name="price"
								required
								min="0"
								step="0.01"
								value={formData.price}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='category'>Category</label>
							<input
								type="text"
								id='category'
								name="category"
								value={formData.category}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='image'>Product Image</label>
							<input
								type="file"
								id='image'
								name="image"
								className={styles.input}
								autoComplete="off"
								accept="image/*"
								onChange={handleFileChange}
							/>
						</div>
						<div className={styles.modalActions}>
							<button onClick={onClose}>Cancel</button>
							<button onClick={handleSave}>Add</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddProductModal;