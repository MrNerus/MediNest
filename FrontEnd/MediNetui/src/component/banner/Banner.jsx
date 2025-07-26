import React from "react";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <header className={styles.topBar}>
      <div className={styles.location}>📍 Khumaltar 44600, Lalitpur</div>
      <div className={styles.contact}>
        📧 medinest@gmail.com | 📞 01-5121022
      </div>
    </header>
  );
};

export default Banner;
