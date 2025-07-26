import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaUserMd } from "react-icons/fa";
import SideBar from "./SideBar";
import styles from "./PatientDashboard.module.css";

export default function PatientDashboard() {
  const [activeView, setActiveView] = useState("upcoming");

  const renderContent = () => {
    switch (activeView) {
      case "takeAppointment":
        return (
          <div className={styles.contentBox}>
            <h2 className={styles.title}>Take Appointment</h2>
            <p className={styles.textPrimary}>
              Appointment booking form will appear here.
            </p>
          </div>
        );
      case "upcoming":
        return <p className={styles.textPrimary}>Upcoming Appointments</p>;
      case "past":
        return <p className={styles.textPrimary}>Past Appointments</p>;
      case "prescription":
        return <p className={styles.textPrimary}>Your Prescriptions</p>;
      case "history":
        return <p className={styles.textPrimary}>Medical History</p>;
      case "changePassword":
        return <p className={styles.textPrimary}>Change Password Form</p>;
      case "logout":
        return <p className={styles.textDanger}>Logged Out</p>;
      default:
        return <p className={styles.textGray}>Welcome</p>;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <SideBar onNavigate={setActiveView} />

      {/* Main Content */}
      <div className={styles.contentArea}>
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.profileCard}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div className={styles.avatar} whileHover={{ scale: 1.1 }}>
            <FaUser className={styles.avatarIcon} />
          </motion.div>
          <p className={styles.profileName}>Bishal Thapa</p>
          <p className={styles.profileEmail}>bishal@example.com</p>
          <div className={styles.roleTag}>
            <FaUserMd className={styles.roleIcon} /> Patient Role
          </div>
        </motion.div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={styles.mainContent}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
