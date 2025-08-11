import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import ArtisanCard from "@/components/ArtisanCard";
import styles from "../styles/Artisans.module.css";
import { config } from "../../config/config";
import Head from "next/head";

export default function Artisans() {
  const [artisans, setArtisans] = useState(null);


  useEffect(() => {
    fetch(`${config.API_URL}/api/artisans`)
      .then((res) => res.json())
      .then((data) => {
        setArtisans(data);
      })
      .catch((err) => console.error("Error fetching artisans:", err));
  }, []);

  return (
    <>
      <Navbar />
      <Head>
        <title>Artisans - Handcrafted Haven</title>
        <meta name="description" content="Explore our talented artisans and their unique creations." />
      </Head>
      <main>
        <div className={styles.container}>
          <h1 className={styles.title}>Our Artisans</h1>

          <div className={styles.artisanList}>
            {artisans && artisans.map((artisan) => (
              <ArtisanCard
                key={artisan._id}
                artisan={artisan}
              />
            ))}
            {artisans && artisans.length === 0 && (
              <p>
                No artisans found.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
