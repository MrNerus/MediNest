import React from "react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import styles from "./Home.module.css";

import Banner from "../banner/Banner";
import Hero from "../hero/Hero";
import WelcomeSection from "../welcome/Welcome";

const Home = () => {
  return (
    <div className={styles.main}>
      <Hero />
      <WelcomeSection />
    </div>
  );
};

export default Home;
