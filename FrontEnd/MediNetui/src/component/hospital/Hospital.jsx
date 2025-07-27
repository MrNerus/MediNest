import React from "react";
import { motion } from "framer-motion";
import PatientList from "./PatientList";

import styles from "./Hospital.module.css";
import DocList from "./Doclist";
import AppointmentList from "./AppoimentList";

const Hospital = () => {
  return (
    <div className={styles.dashboardContainer}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hospital Dashboard
      </motion.h2>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DocList />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PatientList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AppointmentList/>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hospital;
