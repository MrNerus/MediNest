import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaHistory,
  FaFileMedical,
  FaUser,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./SideBar.module.css";

const navItems = [
  { label: "Take Appointment", icon: FaCalendarAlt, key: "takeAppointment" },
  { label: "Upcoming", icon: FaCalendarAlt, key: "upcoming" },
  { label: "Past", icon: FaHistory, key: "past" },
  { label: "Prescription", icon: FaFileMedical, key: "prescription" },
  { label: "History", icon: FaHistory, key: "history" },
  { label: "Change Password", icon: FaKey, key: "changePassword" },
  { label: "Logout", icon: FaSignOutAlt, key: "logout" },
];

export default function SideBar({ onNavigate }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <motion.h1 whileHover={{ scale: 1.05 }} className={styles.logo}>
          MediNest
        </motion.h1>
        <p className={styles.subtext}>Patient Panel</p>
      </div>

      <nav className={styles.navSection}>
        {navItems.map(({ label, icon: Icon, key }) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(key)}
            className={styles.navButton}
          >
            <Icon className={styles.navIcon} />
            <span>{label}</span>
          </motion.button>
        ))}
      </nav>
    </aside>
  );
}
