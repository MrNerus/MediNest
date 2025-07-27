import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaCalendarCheck,
  FaHistory,
  FaFilePrescription,
  FaUserInjured,
  FaHospital,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./DoctorDashboard.module.css";
import { useAuth } from "../golbal/AuthContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Upcoming", icon: FaCalendarCheck, key: "upcoming" },
  { label: "Past", icon: FaHistory, key: "past" },
  { label: "Prescription", icon: FaFilePrescription, key: "prescription" },
  { label: "Patients", icon: FaUserInjured, key: "patients" },
  { label: "Specialty", icon: FaHospital, key: "specialty" },
  { label: "Change Password", icon: FaKey, key: "changePassword" },
  { label: "Logout", icon: FaSignOutAlt, key: "logout" },
];

const specialties = [
  "General Physician",
  "Neurologist",
  "Gastroenterologist",
  "General Surgeon",
  "Cardiologist",
  "Pulmonologist",
  "Orthopedist",
  "Rheumatologist",
  "Otolaryngologist",
  "Ophthalmologist",
  "Allergist",
  "Dermatologist",
  "Gynecologist",
  "Infectious Disease Specialist",
  "Psychiatrist",
  "Endocrinologist",
  "Urologist",
  "Oncologist",
  "Phlebologist",
  "Hematologist",
  "Dentist",
  "Oral Surgeon",
  "Podiatrist",
  "Speech Therapist",
  "Hepatologist",
  "Nephrologist",
  "Pain Management Specialist",
  "Pediatrician",
  "Reproductive Endocrinologist",
  "Emergency Medicine",
  "Sports Medicine",
];

export default function DoctorDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState("upcoming");
  const [doctorInfo, setDoctorInfo] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [patientsError, setPatientsError] = useState(null);

  useEffect(() => {
    // Fetch doctor info using token
    const fetchDoctorInfo = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://ardhost:510/server/api/doctor/getDoctor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch doctor info");
        }

        const data = await res.json();

        setDoctorInfo({
          name: data.data?.name || "Unknown",
          email: data.data?.email || "No email",
        });
      } catch (err) {
        setError(err.message || "Error loading doctor info");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, []);

  // Fetch upcoming appointments when doctorInfo.name changes
  useEffect(() => {
    if (!doctorInfo.name) return;

    const fetchUpcomingAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://ardhost:510/server/api/doctor/getUpcommingAppointmentdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch upcoming appointments");
        const json = await res.json();
        if (json.status === "Success" && Array.isArray(json.data)) {
          // Filter appointments matching doctor's name
          const filtered = json.data.filter(
            (appt) => appt.doctorName === doctorInfo.name
          );
          setUpcomingAppointments(filtered);
        } else {
          setUpcomingAppointments([]);
        }
      } catch (err) {
        console.error("Error fetching upcoming appointments:", err);
        setUpcomingAppointments([]);
      }
    };

    fetchUpcomingAppointments();
  }, [doctorInfo.name]);

  // Fetch past appointments when doctorInfo.name changes
  useEffect(() => {
    if (!doctorInfo.name) return;

    const fetchPastAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://ardhost:510/server/api/doctor/getPastAppointmentdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch past appointments");
        const json = await res.json();
        if (json.status === "Success" && Array.isArray(json.data)) {
          // Filter appointments matching doctor's name
          const filtered = json.data.filter(
            (appt) => appt.doctorName === doctorInfo.name
          );
          setPastAppointments(filtered);
        } else {
          setPastAppointments([]);
        }
      } catch (err) {
        console.error("Error fetching past appointments:", err);
        setPastAppointments([]);
      }
    };

    fetchPastAppointments();
  }, [doctorInfo.name]);

  // Fetch patients list when activeView is 'patients'
  useEffect(() => {
    if (activeView !== "patients") return;

    const fetchPatients = async () => {
      setPatientsLoading(true);
      setPatientsError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://ardhost:510/server/api/patient/getPatients",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch patients");
        const json = await res.json();

        if (json.status === "Success" && Array.isArray(json.data)) {
          setPatients(json.data);
        } else {
          setPatients([]);
          setPatientsError("No patients found.");
        }
      } catch (err) {
        setPatientsError(err.message);
        setPatients([]);
      } finally {
        setPatientsLoading(false);
      }
    };

    fetchPatients();
  }, [activeView]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSpecialtySubmit = (e) => {
    e.preventDefault();
    alert(`Saved specialty: ${specialty} at hospital: ${hospital}`);
    setSpecialty("");
    setHospital("");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://ardhost:510/server/api/doctor/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (!res.ok) throw new Error("Password change failed");

      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "upcoming":
        return (
          <>
            <h2>Upcoming Appointments</h2>
            {upcomingAppointments.length === 0 ? (
              <p>No upcoming appointments</p>
            ) : (
              <table className={styles.appointmentTable}>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Hospital</th>
                    <th>Date</th>
                    <th>Actions</th> {/* Added buttons column */}
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map((appt) => (
                    <tr key={appt._id || appt.id}>
                      <td>{appt.patientName}</td>
                      <td>{appt.hospitalName}</td>
                      <td>{appt.date}</td>
                      <td>
                        <button
                          onClick={() =>
                            alert(`View appointment ${appt._id || appt.id}`)
                          }
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            alert(`Cancel appointment ${appt._id || appt.id}`)
                          }
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        );
      case "past":
        return (
          <>
            <h2>Past Appointments</h2>
            {pastAppointments.length === 0 ? (
              <p>No past appointments</p>
            ) : (
              <table className={styles.appointmentTable}>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Hospital</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pastAppointments.map((appt) => (
                    <tr key={appt._id || appt.id}>
                      <td>{appt.patientName}</td>
                      <td>{appt.hospitalName}</td>
                      <td>{appt.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        );
      case "patients":
        return (
          <>
            <h2>Patients List</h2>
            {patientsLoading ? (
              <p>Loading patients...</p>
            ) : patientsError ? (
              <p style={{ color: "red" }}>{patientsError}</p>
            ) : patients.length === 0 ? (
              <p>No patients found</p>
            ) : (
              <table className={styles.appointmentTable}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id || patient.username}>
                      <td>{patient.username}</td>
                      <td>{patient.name}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.email}</td>
                      <td>{patient.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        );
      case "prescription":
        return <p className={styles.textPrimary}>Manage Prescriptions</p>;
      case "specialty":
        return (
          <form onSubmit={handleSpecialtySubmit}>
            <label>Specialty:</label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              required
            >
              <option value="">Select specialty</option>
              {specialties.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <label>Hospital:</label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="Enter hospital name"
              required
            />
            <button type="submit">Save</button>
          </form>
        );
      case "changePassword":
        return (
          <form onSubmit={handleChangePassword}>
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Change Password</button>
          </form>
        );
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
          {navItems.map(({ label, icon: Icon, key }) => {
            if (key === "logout") {
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.navButton}
                  onClick={handleLogout}
                >
                  <Icon className={styles.navIcon} />
                  <span>{label}</span>
                </motion.button>
              );
            }
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView(key)}
                className={`${styles.navButton} ${
                  activeView === key ? styles.navActive : ""
                }`}
              >
                <Icon className={styles.navIcon} />
                <span>{label}</span>
              </motion.button>
            );
          })}
        </motion.nav>
      </motion.aside>

      <div className={styles.contentArea}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.profileCard}
        >
          <motion.div whileHover={{ scale: 1.1 }} className={styles.avatar}>
            <FaUserMd className={styles.avatarIcon} />
          </motion.div>
          {loading ? (
            <p>Loading doctor info...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <>
              <p className={styles.profileName}>{doctorInfo.name}</p>
              <p className={styles.profileEmail}>{doctorInfo.email}</p>
            </>
          )}
          <div className={styles.roleTag}>
            <FaUserMd className={styles.roleIcon} /> Doctor Role
          </div>
        </motion.div>

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
