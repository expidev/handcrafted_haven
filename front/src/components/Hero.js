import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <Image
        src="/hero.jpg"
        alt="Handcrafted Showcase"
        fill
        priority
        className={styles.backgroundImage}
      />
      <div className={styles.overlayContent}>
        <h1 className={styles.heroTitle}>Discover Handmade Treasures</h1>
        <Link href="/products">
          <button className={styles.heroButton}>Shop Now</button>
        </Link>
      </div>
    </section>
  );
}
