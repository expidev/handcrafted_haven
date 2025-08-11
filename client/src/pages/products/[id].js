import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/ProductDetails.module.css";
import Footer from "../../components/Footer"
import Head from "next/head";
import Image from "next/image";
import { config } from "../../../config/config";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      console.log(id);
      fetch(`${config.API_URL}/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => setError("Failed to load product"));
      fetch(`${config.API_URL}/api/reviews/${id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((err) => setError("Failed to load reviews"));
    }
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${config.API_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product._id, quantity: 1 }),
    });
    alert("Product added to cart!");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to leave a review.");
      return;
    }

    const response = await fetch(`${config.API_URL}/api/reviews/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product._id,
        rating,
        comment,
      }),
    });

    if (response.ok) {
      const newReview = await response.json();
      setReviews((prev) => [newReview, ...prev]);
      setRating(0);
      setComment("");
      alert("Review submitted!");
    } else {
      alert("Failed to submit review.");
    }
  };

  const renderStars = (ratingValue) => {
    const fullStars = Math.floor(ratingValue || 0);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < fullStars ? "#9F4F1D" : "#696969" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (!product) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Head>
        <title>{product.title} - Handcrafted Haven</title>
        <meta name="description" content={product.description} />
      </Head>
      <main className={styles.container}>
        <div className={styles.left}>
          {product.images && product.images.length > 0 ? (
            <div className={styles.carousel}>
              {product.images.map((img, i) => (
                <Image
                  width={500}
                  height={300}
                  key={i}
                  src={img}
                  alt={`Image ${i + 1}`}
                  className={styles.image}
                />
              ))}
            </div>
          ) : (
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.title + " category product"}
              className={styles.image}
              width={500}
              height={300}
            />
          )}
        </div>

        <div className={styles.right}>
          <h1>{product.title}</h1>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.desc}>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Rating:</strong> {renderStars(product.rating)}</p>
          <p><strong>Sold By:</strong> {product.artisanId?.name || "Unknown"}</p>

          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>

          {product.artisanId?.email && (
            <a
              href={`mailto:${product.artisanId.email}`}
              className={styles.contactButton}
              style={{ marginTop: "10px", display: "inline-block" }}
            >
              Contact Artisan
            </a>
          )}
        </div>
      </main>

      <section className={styles.reviews}>
        <h2>Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <blockquote key={r._id} className={styles.reviewBlock}>
              “{r.comment}”
              <footer>
                - {r.userId?.name || "Anonymous"} ({renderStars(r.rating)})
              </footer>
            </blockquote>
          ))
        )}
      </section>

      <section className={styles.reviewForm}>
        <h2>Leave a Review</h2>
        <form onSubmit={submitReview}>
          <div>
            Rating:{" "}
            {[1, 2, 3, 4, 5].map((val) => (
              <label key={val} htmlFor={`rating-${val}`} style={{ marginRight: "10px" }}>
                <input
                  id={`rating-${val}`}
                  type="radio"
                  name="rating"
                  value={val}
                  checked={rating === val}
                  required
                  onChange={() => setRating(val)}
                />
                {val}
              </label>
            ))}
          </div>
          <br />
          <label htmlFor="comment" className={styles.formLabel}>
            Comment:
          </label>
          <textarea
            rows="3"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className={styles.textarea}
          />
          <br />
          <button
            type="submit"
            style={{
              marginTop: "10px",
              backgroundColor: "#DAA520",
              color: "black",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Submit Review
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
