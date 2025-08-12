import { useState, useEffect } from 'react';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'

import { config } from '../../../config/config';

import s from './edit.module.css';

export default function Profile() {
  const [loading, setLoading]               = useState(false);
  const [message, setMessage]               = useState('');
  const [id, setId]                         = useState(null);
  const [seller, setSeller]                 = useState(null);
  const [artisanDetails, setArtisanDetails] = useState({
    bio: '',
    speciality: '',
    region: '',
    image: '',
    category: '',
    name: '',
  });

  const fetchSeller = async (id) => {
		try {
			const res = await fetch(`${config.API_URL}/api/artisans/${id}`);

			if (res.status === 404) {
				router.push('/404');
				return;
			}

			const data = await res.json();

			setSeller(data);
      setArtisanDetails({
        bio: data.bio,
        name: data.name,
        regiod: data.region,
        image: data.image,
        category: data.category,
        speciality: data.speciality,
        region: data.region,
      })
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setArtisanDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage('User is not authenticated');
        setLoading(false);
        return;
      }

      const res = await fetch(`${config.API_URL}/api/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ artisanDetails }),
      });

      if (!res.ok) throw new Error('Failed to update details');
      setMessage('✅ Artisan details updated!');
    } catch (err) {
      setMessage(err.message || 'Error updating details');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <Navbar />
      <div className={s.container}>
        <h1 className={s.header}>Update Artisan Profile</h1>
        <div>
          <Link href={'/seller'}>← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className={s.form}>
          <label className={s.formGroup}>
            Name:
            <input
              type='text'
              name='name'
              value={artisanDetails.name}
              onChange={handleChange}
              className={s.input}
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Speciality:
            <input
              type='text'
              name='speciality'
              value={artisanDetails.speciality}
              onChange={handleChange}
              className={s.input}
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Region:
            <input
              type='text'
              name='region'
              value={artisanDetails.region}
              onChange={handleChange}
              className={s.input}
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Image URL:
            <input
              type='text'
              name='image'
              value={artisanDetails.image}
              onChange={handleChange}
              className={s.input}
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Category:
            <input
              type='text'
              name='category'
              value={artisanDetails.category}
              onChange={handleChange}
              className={s.input}
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Bio:
            <textarea
              name='bio'
              value={artisanDetails.bio}
              onChange={handleChange}
              className={s.bio}
            />
          </label>
          <br />
          <button type='submit' disabled={loading} className={s.button}>
            {loading ? 'Updating...' : 'Update Details'}
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
