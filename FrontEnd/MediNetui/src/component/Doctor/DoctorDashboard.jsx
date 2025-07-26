// DoctorDashboard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaUserInjured,
  FaCalendarCheck,
  FaHistory,
  FaFilePrescription,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./DoctorDashboard.module.css";

const navItems = [
  { label: "Upcoming", icon: FaCalendarCheck, key: "upcoming" },
  { label: "Past", icon: FaHistory, key: "past" },
  { label: "Prescription", icon: FaFilePrescription, key: "prescription" },
  { label: "Patients", icon: FaUserInjured, key: "patients" },
  { label: "Change Password", icon: FaKey, key: "changePassword" },
  { label: "Logout", icon: FaSignOutAlt, key: "logout" },
];

export default function DoctorDashboard() {
  const [activeView, setActiveView] = useState("upcoming");

  const renderContent = () => {
    switch (activeView) {
      case "patients":
        return <p className={styles.textPrimary}>Viewing All Patients</p>;
      case "upcoming":
        return <p className={styles.textPrimary}>Upcoming Appointments</p>;
      case "past":
        return <p className={styles.textPrimary}>Past Appointments</p>;
      case "prescription":
        return <p className={styles.textPrimary}>Manage Prescriptions</p>;
      case "changePassword":
        return <p className={styles.textPrimary}>Change Password</p>;
      case "logout":
        return <p className={styles.textDanger}>Logged Out</p>;
      default:
        return <p className={styles.textGray}>Welcome, Doctor</p>;
    }
  };

  return (
    <motion.div
      className={styles.dashboardContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.sidebar}
      >
        <div className={styles.sidebarHeader}>
          <motion.h1 whileHover={{ scale: 1.05 }} className={styles.logo}>
            MediNest
          </motion.h1>
          <p className={styles.subtext}>Doctor Panel</p>
        </div>

        <motion.nav
          className={styles.navSection}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {navItems.map(({ label, icon: Icon, key }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              onClick={() => setActiveView(key)}
              className={`${styles.navButton} ${
                activeView === key ? styles.navActive : ""
              }`}
            >
              <Icon className={styles.navIcon} />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.nav>
      </motion.aside>

      {/* Main Content */}
      <div className={styles.contentArea}>
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.profileCard}
        >
          <motion.div whileHover={{ scale: 1.1 }} className={styles.avatar}>
            <FaUserMd className={styles.avatarIcon} />
          </motion.div>
          <p className={styles.profileName}>Dr. Bishal Thapa</p>
          <p className={styles.profileEmail}>drbishal@example.com</p>
          <div className={styles.roleTag}>
            <FaUserMd className={styles.roleIcon} /> Doctor Role
          </div>
        </motion.div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={styles.mainContent}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
