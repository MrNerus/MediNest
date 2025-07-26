import React from "react";
import styles from "./Service.module.css";
import { motion } from "framer-motion";
import { AiOutlineFileText } from "react-icons/ai";
import { FaUserMd } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";

const services = [
  {
    title: "Patient Health Records",
    description:
      "Access each patient’s digital health record including diagnosis history, ongoing treatments, allergies, lab results, and prescriptions — securely available to authorized hospitals and doctors across the system.",
    icon: <AiOutlineFileText className={styles.icon} />,
  },
  {
    title: "Verified Doctor Profiles",
    description:
      "Each doctor’s profile includes verified credentials, specializations, experience, availability, and hospital affiliations — helping patients make informed choices and hospitals schedule efficiently.",
    icon: <FaUserMd className={styles.icon} />,
  },
  {
    title: "Comprehensive Hospital Directory",
    description:
      "Every hospital profile includes department listings, services offered, location, and doctor rosters — enabling patients to compare and select facilities that best suit their needs.",
    icon: <MdLocalHospital className={styles.icon} />,
  },
];

const Service = () => {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Smart Healthcare Services
        </motion.h2>

        <div className={styles.cards}>
          {services.map((service1, index) => (
            <motion.div
              className={styles.card}
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {service1.icon}
              <h3>{service1.title}</h3>
              <p>{service1.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
