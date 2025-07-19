import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { ArtisanFilterMenu } from "@/components/ArtisanFilterMenu";
import ArtisanCard from "@/components/ArtisanCard";
import styles from "../styles/Artisans.module.css";

const fakeArtisans = [
  {
    _id: "1",
    name: "John Doe",
    category: "Woodworking",
    region: "North",
    bio: "Expert in handcrafted wooden furniture.",
    image: "https://picsum.photos/150?random=1",
    speciality: "Custom wooden tables and chairs",
  },
  {
    _id: "2",
    name: "Jane Smith",
    category: "Pottery",
    region: "South",
    bio: "Creates beautiful ceramic pieces.",
    image: "https://picsum.photos/150?random=8",
    speciality: "Hand-painted ceramic vases",
  },
  {
    _id: "3",
    name: "Carlos Rivera",
    category: "Textiles",
    region: "East",
    bio: "Specializes in traditional woven fabrics.",
    image: "https://picsum.photos/150?random=3",
    speciality: "Handwoven rugs and scarves",
  },
  {
    _id: "4",
    name: "Aisha Khan",
    category: "Jewelry",
    region: "West",
    bio: "Designs unique handmade jewelry.",
    image: "https://picsum.photos/150?random=4",
    speciality: "Custom gemstone necklaces",
  },
];

export default function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const router = useRouter();
  const [filter, setFilter] = useState({
    name: "",
    category: "",
    region: "",
    categories: [],
    regions: [],
  });

  useEffect(() => {
    fetch("http://localhost:5500/api/artisans")
      .then((res) => res.json())
      .then((data) => {
        setArtisans(fakeArtisans);
        // setArtisans(data)
      }
      )
      .catch((err) => console.error("Error fetching artisans:", err));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.container}>
          <h1 className={styles.title}>Our Artisans</h1>
          <ArtisanFilterMenu
            filter={filter}
            setFilter={setFilter}
          />
          <div className={styles.artisanList}>
            {artisans.map((artisan) => (
              <ArtisanCard
                key={artisan._id}
                artisan={artisan}
              />
            ))}
            {artisans.length === 0 && (
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
