import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaUser,
  FaHospital,
  FaUserSlash,
  FaBuilding,
  FaUserTimes,
  FaUserCheck,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./SuperAdminDashboard.module.css";

const navItems = [
  { label: "Add Doctor", icon: FaUserMd, key: "addDoctor" },
  { label: "Add Patient", icon: FaUser, key: "addPatient" },
  { label: "Add Hospital", icon: FaHospital, key: "addHospital" },
  { label: "Inactive Doctors", icon: FaUserSlash, key: "inactiveDoctors" },
  { label: "Inactive Patients", icon: FaUserTimes, key: "inactivePatients" },
  { label: "Inactive Hospitals", icon: FaBuilding, key: "inactiveHospitals" },
  { label: "Logout", icon: FaSignOutAlt, key: "logout" },
];

export default function SuperAdminDashboard() {
  const [activeView, setActiveView] = useState("addDoctor");

  // Basic form state examples — extend or replace with real form handlers or hooks
  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [hospitalName, setHospitalName] = useState("");

  const renderForm = () => {
    switch (activeView) {
      case "addDoctor":
        return (
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h2 className={styles.title}>Add New Doctor</h2>
            <input
              type="text"
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className={styles.input}
              required
            />
            <button className={styles.submitBtn} type="submit">
              <FaPlusCircle className={styles.btnIcon} /> Add Doctor
            </button>
          </form>
        );
      case "addPatient":
        return (
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h2 className={styles.title}>Add New Patient</h2>
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className={styles.input}
              required
            />
            <button className={styles.submitBtn} type="submit">
              <FaPlusCircle className={styles.btnIcon} /> Add Patient
            </button>
          </form>
        );
      case "addHospital":
        return (
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h2 className={styles.title}>Add New Hospital</h2>
            <input
              type="text"
              placeholder="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className={styles.input}
              required
            />
            <button className={styles.submitBtn} type="submit">
              <FaPlusCircle className={styles.btnIcon} /> Add Hospital
            </button>
          </form>
        );
      case "inactiveDoctors":
        return (
          <div>
            <h2 className={styles.title}>Inactive Doctors</h2>
            <p className={styles.textGray}>
              List of inactive doctors will be shown here.
            </p>
          </div>
        );
      case "inactivePatients":
        return (
          <div>
            <h2 className={styles.title}>Inactive Patients</h2>
            <p className={styles.textGray}>
              List of inactive patients will be shown here.
            </p>
          </div>
        );
      case "inactiveHospitals":
        return (
          <div>
            <h2 className={styles.title}>Inactive Hospitals</h2>
            <p className={styles.textGray}>
              List of inactive hospitals will be shown here.
            </p>
          </div>
        );
      case "logout":
        return <p className={styles.textDanger}>Logged Out</p>;
      default:
        return <p className={styles.textGray}>Welcome, SuperAdmin</p>;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={styles.sidebar}
      >
        <div className={styles.sidebarHeader}>
          <motion.h1 whileHover={{ scale: 1.1 }} className={styles.logo}>
            MediNest
          </motion.h1>
          <p className={styles.subtext}>SuperAdmin Panel</p>
        </div>

        <nav className={styles.navSection}>
          {navItems.map(({ label, icon: Icon, key }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView(key)}
              className={styles.navButton}
              aria-label={label}
            >
              <Icon className={styles.navIcon} />
              <span>{label}</span>
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      <main className={styles.contentArea}>
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={styles.mainContent}
        >
          {renderForm()}
        </motion.div>
      </main>
    </div>
  );
}
