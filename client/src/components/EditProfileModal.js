import React, { useEffect, useState } from 'react';
import styles from './EditProfileModal.module.css';

const EditProfileModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
	const [formData, setFormData] = useState(() => ({
		name: initialData.name || '',
		profilePicture: initialData.image || '',
		bio: initialData.bio || '',
		speciality: initialData.speciality || '',
	}));

	useEffect(() => {
		if (initialData) {
			setFormData({
				name: initialData.name || '',
				profilePicture: initialData.image || '',
				bio: initialData.bio || '',
				speciality: initialData.speciality || '',
			});
		}
	}, [initialData]);

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
			profilePicture: file,
		}));
	};

	const handleSave = () => {
		const data = new FormData();
		data.append('name', formData.name);
		data.append('bio', formData.bio);
		data.append('speciality', formData.speciality);
		if (formData.profilePicture instanceof File) {
			data.append('profile', formData.profilePicture);
		}
		onSave(data);
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
						<h2>Edit Profile</h2>
						<div className={styles.formGroup}>
							<label htmlFor='name'>Name <span className={styles.required}>*</span></label>
							<input
								type="text"
								id='name'
								required
								name="name"
								className={styles.input}
								placeholder="Enter your name"
								autoComplete="name"
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='bio'>Bio</label>
							<textarea
								id='bio'
								name="bio"
								value={formData.bio}
								placeholder='Enter your bio'
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='speciality'>Speciality</label>
							<input
								type="text"
								id='speciality'
								name="speciality"
								value={formData.speciality}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='profilePicture'>Avatar</label>
							<input
								type="file"
								id='profilePicture'
								name="profilePicture"
								className={styles.input}
								autoComplete="off"
								accept="image/*"
								onChange={handleFileChange}
							/>
						</div>
						<div className={styles.modalActions}>
							<button onClick={onClose}>Cancel</button>
							<button onClick={handleSave}>Save</button>
						</div>
					</div>
				</div>)}
		</>
	);
}

export default EditProfileModal;