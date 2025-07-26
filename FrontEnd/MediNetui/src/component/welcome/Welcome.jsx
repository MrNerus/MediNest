import React from "react";
import styles from "./Welcome.module.css";

const WelcomeSection = () => {
  return (
    <section className={styles.welcome}>
      <h2>Welcome to MediNest</h2>
      <h3>Your Health, One Click Away</h3>
      <p>
        Need a doctor for a checkup? Or looking for the best hospitals?
        <br />
        We help you find the right doctor and the most trusted hospitals — all
        in one place.
      </p>
    </section>
  );
};

export default WelcomeSection;
