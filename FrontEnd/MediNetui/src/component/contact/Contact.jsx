import React from "react";
import styles from "./Contact.module.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

const mapVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#0b5ed7",
    transition: { duration: 0.3 },
  },
};

const Contact = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Info */}
          <motion.div className={styles.info} variants={containerVariants}>
            <motion.p variants={itemVariants}>
              <FaEnvelope className={styles.icon} /> medinest@gmail.com
            </motion.p>
            <motion.p variants={itemVariants}>
              <FaPhoneAlt className={styles.icon} /> +977 9812345678
            </motion.p>
            <motion.p variants={itemVariants}>
              <FaMapMarkerAlt className={styles.icon} /> Khumaltar 44600,
              Lalitpur
            </motion.p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className={styles.form}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.input
              type="text"
              placeholder="Your Name"
              required
              variants={inputVariants}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              required
              variants={inputVariants}
              transition={{ delay: 0.1 }}
            />
            <motion.textarea
              placeholder="Your Message"
              rows="5"
              required
              variants={inputVariants}
              transition={{ delay: 0.2 }}
            />
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Map */}
        <motion.div
          className={styles.map}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover="hover"
          variants={mapVariants}
        >
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.418359132529!2d85.32228267489383!3d27.70469402581062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19971a6e54a9%3A0x3e2cb02d36416932!2sLalitpur!5e0!3m2!1sen!2snp!4v1721907776674!5m2!1sen!2snp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
