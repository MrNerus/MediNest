import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiHome,
  HiInformationCircle,
  HiBriefcase,
  HiMail,
} from "react-icons/hi";
import styles from "./Navbar.module.css";
import Login from "../login/Login";
import PatientRegister from "../patient/PatientRegister";

const Navbar = ({ onLogin }) => {
  const [clickLogin, setClickLogin] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const handleLogin = () => setClickLogin(true);
  const handleRegister = () => setClickRegister(true);
  const closeLogin = () => setClickLogin(false);
  const closeRegister = () => setClickRegister(false);

  useEffect(() => {
    const onScroll = () => setScrolling(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolling ? styles.active : ""}`}>
      <div className={styles.logo}>❤️ MediNest</div>

      <ul className={styles.menu}>
        <li>
          <Link to="/" className={styles.menuItem}>
            <HiHome size={18} /> Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.menuItem}>
            <HiInformationCircle size={18} /> About
          </Link>
        </li>
        <li>
          <Link to="/service" className={styles.menuItem}>
            <HiBriefcase size={18} /> Services
          </Link>
        </li>
        <li>
          <Link to="/contact" className={styles.menuItem}>
            <HiMail size={18} /> Contact
          </Link>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleLogin}>
          Sign In
        </button>
        <button
          className={`${styles.btn} ${styles.primary}`}
          onClick={handleRegister}
        >
          Sign Up
        </button>
      </div>

      {clickLogin && <Login onClose={closeLogin} onLogin={onLogin} />}
      {clickRegister && <PatientRegister onClose={closeRegister} />}
    </nav>
  );
};

export default Navbar;
