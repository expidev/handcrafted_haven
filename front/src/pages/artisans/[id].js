import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

import styles from "../../styles/Artisan.module.css";

const ArtisanDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artisan, setArtisan] = useState(null);

  const fetchArtisan = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/artisans/${id}`,
      );
      
      if (res.status === 404) {
        router.push("/404");
        return;
      }

      const data = await res.json();

      setArtisan(data);
    } catch (error) {
      console.error("Error fetching artisan details:", error);
    }
  };

  useEffect(() => {
    if (id) fetchArtisan(id);
  }, [id]);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.flexRow}>
          <Image
						src={artisan?.image || "https://via.placeholder.com/150"}
						alt={artisan?.name}
						width={50}
						height={50}
						className={styles.avatar}
					/>

					<h1>{artisan?.name}</h1>
        </div>
        <p>{artisan?.speciality}</p>
        <p>{artisan?.bio}</p>
        <h2>Products</h2>
        <ul className={styles.productGrid}>
  				{artisan?.products?.map((product) => (
   					<ProductCard key={product._id} product={product} />
  				))}
  			</ul>
      </main>
      <Footer />
    </>
  );
};

export default ArtisanDetails;
