import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Testimonials from "../components/Testimonials";
import { FaHandsHelping, FaLeaf, FaStar } from "react-icons/fa";
import Footer from "../components/Footer"
export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <main className={`${styles.main} ${fadeIn ? styles.fadeIn : ""}`}>
        <FeaturedProducts />
        <section className={styles.why}>
        <h2>Why Choose Handcrafted Haven?</h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <FaHandsHelping size={40} color="#D2691E" />
              <h3>Community</h3>
              <p>Support passionate local artisans with every purchase.</p>
            </div>
            <div className={styles.whyCard}>
              <FaLeaf size={40} color="#6B8E23" />
              <h3>Sustainability</h3>
              <p>Choose eco-friendly, low-waste handmade alternatives.</p>
            </div>
            <div className={styles.whyCard}>
              <FaStar size={40} color="#DAA520" />
              <h3>Uniqueness</h3>
              <p>Every product tells a story. Find truly one-of-a-kind pieces.</p>
            </div>
          </div>
      </section>
      <Testimonials />
      </main>
      <Footer />
    </>
  );
}
