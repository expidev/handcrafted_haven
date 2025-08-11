import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import colors from "../utils/colors";
import { useEffect, useState } from "react";

const navItemStyle = {
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

const activeStyle = {
  borderBottom: `2px solid ${colors.burntGold}`,
  paddingBottom: "2px",
};

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: colors.terracotta,
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        boxShadow: `0 2px 10px ${colors.charcoalGray}`,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div>
        <Link
          href="/"
          style={{
            fontSize: "22px",
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Handcrafted Haven
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginTop: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ ...navItemStyle, ...(router.pathname === "/" ? activeStyle : {}) }}>
          <FaHome /> Home
        </Link>
        <Link href="/products" style={{ ...navItemStyle, ...(router.pathname === "/products" ? activeStyle : {}) }}>
          <FaBoxOpen /> Products
        </Link>
        <Link href="/artisans" style={{ ...navItemStyle, ...(router.pathname === "/artisans" ? activeStyle : {}) }}>
          <FaUsers /> Artisans
        </Link>
        <Link href="/orders" style={{ ...navItemStyle, ...(router.pathname === "/orders" ? activeStyle : {}) }}>
          <FaShoppingCart /> Orders
        </Link>
        <Link href="/cart" style={{ ...navItemStyle, ...(router.pathname === "/cart" ? activeStyle : {}) }}>
          <MdShoppingCartCheckout /> Cart
        </Link>
        <Link href="/about" style={{ ...navItemStyle, ...(router.pathname === "/about" ? activeStyle : {}) }}>
          <FaInfoCircle /> About
        </Link>

        {isAuthenticated ? (
          <div
            onClick={handleLogout}
            style={{ ...navItemStyle, cursor: "pointer" }}
          >
            <FaSignOutAlt /> Logout
          </div>
        ) : (
          <>
            <Link href="/login" style={{ ...navItemStyle, ...(router.pathname === "/login" ? activeStyle : {}) }}>
              <FaSignInAlt /> Login
            </Link>
            <Link href="/register" style={{ ...navItemStyle, ...(router.pathname === "/register" ? activeStyle : {}) }}>
              <FaUserPlus /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;