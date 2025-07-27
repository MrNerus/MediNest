import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <h3>Medical And Health</h3>
          <h1 className="text-5xl font-bold text-blue-500 leading-tight">
            Connecting Care, <br /> Empowering Health
          </h1>
          <p>
            Connecting hospitals, doctors, and patients in one smart system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
