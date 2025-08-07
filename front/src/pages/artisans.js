import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArtisanFilterMenu } from "@/components/ArtisanFilterMenu";
import ArtisanCard from "@/components/ArtisanCard";
import styles from "../styles/Artisans.module.css";

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [filter, setFilter] = useState({});
  const router = useRouter();

  const fetchArtisans = async (query) => {
    const filterQuery = new URLSearchParams({ ...query }).toString();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/artisans?${filterQuery}`,
      );
      const data = await res.json();

      setArtisans(data);
    } catch (error) {
      console.error("Error fetching artisans", error);
    }
  };

  useEffect(() => {
    setFilter({ ...router.query });

    fetchArtisans({ ...router.query });
  }, [router.query]);

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    await fetchArtisans({ ...filter });

    router.push(
      {
        pathname: router.pathname,
        query: filter,
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.container}>
          <h1 className={styles.title}>Our Artisans</h1>
          <ArtisanFilterMenu
            filter={filter}
            setFilter={setFilter}
            onFilterSubmit={handleFilterSubmit}
          />
          <div className={styles.artisanList}>
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan._id} artisan={artisan} />
            ))}
            {artisans.length === 0 && <p>No artisans found.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
