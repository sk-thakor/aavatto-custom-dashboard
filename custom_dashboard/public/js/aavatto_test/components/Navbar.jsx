import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <h3 style={styles.logo}>Aavatto App</h3>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/customers" style={styles.link}>Customers</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#171717",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default Navbar;