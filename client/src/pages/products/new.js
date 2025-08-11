import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'

import { config } from '../../../config/config';

import s from './new.module.css';

export default function Profile() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({ ...prev, [name]: value }));
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

      const res = await fetch(`${config.API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...product }),
      });

      if (!res.ok) throw new Error('Failed to update details');
      setMessage('✅ Product added!');

      router.push('/seller');
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
        <h1 className={s.header}>Add a new product</h1>
        <div>
          <Link href={'/seller'}>← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className={s.form}>
          <label className={s.formGroup}>
            Title:
            <input
              type='text'
              name='title'
              value={product.title}
              onChange={handleChange}
              className={s.input}
              required
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Description:
            <textarea
              type='text'
              name='description'
              value={product.description}
              onChange={handleChange}
              className={s.textarea}
              required
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Price ($):
            <input
              type='number'
              name='price'
              value={product.price}
              onChange={handleChange}
              className={s.input}
              required
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Image URL:
            <input
              type='text'
              name='image'
              value={product.image}
              onChange={handleChange}
              className={s.input}
              required
            />
          </label>
          <br />
          <label className={s.formGroup}>
            Category:
            <input
              type='text'
              name='category'
              value={product.category}
              onChange={handleChange}
              className={s.input}
              required
            />
          </label>
          <br />
          <button type='submit' disabled={loading} className={s.button}>
            {loading ? 'Creating product...' : 'Add Product'}
          </button>

         {message && <p>{message}</p>}
        </form>

      </div>
      <Footer />
    </>
  );
}
