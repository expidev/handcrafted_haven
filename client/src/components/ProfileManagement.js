import React, { useState } from 'react';

const ProfileManagement = () => {
	const [profile, setProfile] = useState({
		name: '',
		email: '',
		bio: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Profile updated:', profile);
		// Add logic to save the profile data
	};

	return (
		<div className="profile-management">
			<h2>Profile Management</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={profile.name}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={profile.email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="bio">Bio:</label>
					<textarea
						id="bio"
						name="bio"
						value={profile.bio}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Save Profile</button>
			</form>
		</div>
	);
};

export default ProfileManagement;