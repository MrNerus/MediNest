import React from "react";
import styles from "./About.module.css";
import { FaHospitalSymbol, FaStethoscope, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <motion.h2
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About MediNEST
        </motion.h2>

        <motion.p
          className={styles.intro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Your health, one click away. At MediNest?, we’re transforming the way
          you experience healthcare — making it accessible, reliable, and
          patient-centered.
        </motion.p>

        <div className={styles.grid}>
          <motion.div
            className={styles.box}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaHospitalSymbol className={styles.icon} />
            <h3>Why MediNest?</h3>
            <p>
              We connect patients with trusted hospitals and verified doctors —
              all in one place. Search, compare, and consult with confidence.
            </p>
          </motion.div>

          <motion.div
            className={styles.box}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FaStethoscope className={styles.icon} />
            <h3>Our Mission</h3>
            <p>
              Empower healthcare access with smart, digital tools that enhance
              outcomes and simplify care for patients and providers.
            </p>
          </motion.div>

          <motion.div
            className={styles.box}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <FaUserShield className={styles.icon} />
            <h3>What We Offer</h3>
            <p>
              Appointments, health records, hospital info, and verified doctors
              — all at your fingertips. A complete digital ecosystem.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
