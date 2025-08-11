import Navbar from "../components/Navbar";
import { FaUsers, FaLeaf, FaGift, FaHandshake } from "react-icons/fa";
import { useEffect, useState } from "react";
import colors from "../utils/colors";
import Footer from "../components/Footer"
export default function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "3rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.8",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <h1
          style={{
            fontSize: "2.75rem",
            marginBottom: "1.2rem",
            color: colors.terracotta,
            borderBottom: `3px solid ${colors.burntGold}`,
            paddingBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          About Handcrafted Haven
        </h1>

        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: colors.charcoalGray }}>
          <strong>Handcrafted Haven</strong> is a digital marketplace created to celebrate and support artisans,
          crafters, and small-scale creators. Every item you find here is crafted with care, creativity, and meaning.
          Our platform connects talented artisans with people who value unique, sustainable, and handmade treasures.
        </p>

        <h2 style={sectionTitleStyle}>Our Mission</h2>
        <p style={paragraphStyle}>We strive to support conscious consumption by:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <FaUsers style={iconStyle(colors.terracotta)} />
            Empowering local artisans and independent creators
          </li>
          <li style={liStyle}>
            <FaLeaf style={iconStyle(colors.mossGreen)} />
            Encouraging eco-friendly and low-waste purchasing habits
          </li>
          <li style={liStyle}>
            <FaGift style={iconStyle(colors.burntGold)} />
            Offering unique, meaningful alternatives to mass-produced goods
          </li>
        </ul>

        <h2 style={sectionTitleStyle}>Why Handcrafted?</h2>
        <p style={paragraphStyle}>
          Each product on Handcrafted Haven tells a story. When you buy handmade, you're supporting not just a
          product but a person, a passion, and a purpose.
        </p>

        <h2 style={sectionTitleStyle}>Community & Sustainability</h2>
        <p style={paragraphStyle}>
          <FaHandshake style={iconStyle(colors.lightOliveGreen)} />
          We're committed to creating a thoughtful, ethical shopping experience. Our artisans follow sustainable
          practices, and every purchase strengthens small businesses.
        </p>

        <p
          style={{
            marginTop: "2.5rem",
            fontSize: "1.1rem",
            color: colors.mediumGray,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Thank you for being part of the Handcrafted Haven community 🌿
        </p>
      </main>
      <Footer />
    </>
  );
}
const sectionTitleStyle = {
  fontSize: "1.75rem",
  marginTop: "2rem",
  marginBottom: "0.75rem",
  color: colors.charcoalGray,
  borderLeft: `5px solid ${colors.burntGold}`,
  paddingLeft: "0.75rem",
};

const paragraphStyle = {
  fontSize: "1.05rem",
  color: colors.mediumGray,
  marginBottom: "1rem",
};

const ulStyle = {
  paddingLeft: "0",
  listStyle: "none",
  marginTop: "1rem",
};

const liStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "0.75rem",
  transition: "transform 0.3s ease",
};

const iconStyle = (color) => ({
  marginRight: "10px",
  color,
  fontSize: "1.4rem",
});
