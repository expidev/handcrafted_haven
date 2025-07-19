import { useEffect, useState } from "react";
import styles from "../styles/Testimonials.module.css";

const staticTestimonials = [
  {
    text: "Beautifully made. The craftsmanship is truly top-notch.",
    author: "Sarah A.",
  },
  {
    text: "I love supporting local creators and finding unique gifts.",
    author: "Daniel M.",
  },
  {
    text: "Fast shipping and incredible quality. Will buy again!",
    author: "Priya R.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((r) => ({
            text: r.comment || "No comment provided.",
            author: r.userId?.name || "Anonymous",
          }));
          setTestimonials([...formatted, ...staticTestimonials]);
        }
      })
      .catch((err) => console.error("Review fetch error:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const { text, author } = testimonials[index];

  return (
    <section className={styles.testimonials}>
      <h2>What Our Customers Say</h2>
      <blockquote className={styles.fadeIn}>
        “{text}”
        <footer>- {author}</footer>
      </blockquote>
    </section>
  );
}
