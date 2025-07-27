import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "./SideBar";
import styles from "./PatientDashboard.module.css";
import { useAuth } from "../golbal/AuthContext";
import { useNavigate } from "react-router-dom";
import Changepassword from "./Changepassword";
import Chatbox from "../hero/Chatbox";

export default function PatientDashboard() {
  const [activeView, setActiveView] = useState("upcoming");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);

  const [formData, setFormData] = useState({
    patientName: currentUser?.name || "",
    doctorId: "",
    hospitalId: "",
    date: "",
  });

  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (!token) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [docRes, hospRes, appointRes, patientRes] = await Promise.all([
        fetch("http://ardhost:510/server/api/doctor/getDoctors", { headers }),
        fetch("http://ardhost:510/server/api/hospital/getHospitals", {
          headers,
        }),
        fetch(
          "http://ardhost:510/server/api/patient/getUpcommingAppointmentdetails",
          { headers }
        ),
        fetch("http://ardhost:510/server/api/patient/getPatient", { headers }),
      ]);

      const [docData, hospData, appointData, patientData] = await Promise.all([
        docRes.json(),
        hospRes.json(),
        appointRes.json(),
        patientRes.json(),
      ]);

      setDoctors(docData.data || []);
      setHospitals(hospData.data || []);
      setAppointments(appointData.data || []);
      setPatientInfo(patientData.data || null);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("User not authenticated.");

    try {
      const res = await fetch(
        "http://ardhost:510/server/api/patient/getUpcommingAppointmentdetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Appointment Booked Successfully");
        setFormData((prev) => ({
          ...prev,
          doctorId: "",
          hospitalId: "",
          date: "",
        }));
        fetchData();
        setActiveView("upcoming");
      } else {
        alert("Failed to book appointment");
      }
    } catch (error) {
      alert("Error booking appointment");
      console.error(error);
    }
  };

  const fetchWithAuth = async (url) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  };

  const handleOptionClick = async (value) => {
    setUserInput(value);
    setMessages((prev) => [...prev, { role: "user", content: value }]);

    try {
      if (value === "HOSPITAL LIST") {
        const json = await fetchWithAuth(
          "http://ardhost:510/server/api/hospital/getHospitals"
        );
        const hospitals = json.data;
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: (
              <div className={styles.cardGrid}>
                {hospitals.map((hosp, i) => (
                  <motion.div
                    key={hosp.id || i}
                    className={styles.card}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4>{hosp.name}</h4>
                    <p>
                      <b>Address:</b> {hosp.address}
                    </p>
                    <p>
                      <b>Phone:</b> {hosp.phone}
                    </p>
                    <p>
                      <b>Email:</b> {hosp.email}
                    </p>
                    {hosp.website && (
                      <p>
                        <b>Website:</b>{" "}
                        <a href={hosp.website} target="_blank" rel="noreferrer">
                          {hosp.website}
                        </a>
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ),
          },
        ]);
      } else if (value === "DOCTOR LIST") {
        const json = await fetchWithAuth(
          "http://ardhost:510/server/api/doctor/getDoctors"
        );
        const doctors = json.data;
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: (
              <div className={styles.cardGrid}>
                {doctors.map((doc, i) => (
                  <motion.div
                    key={doc.id || i}
                    className={styles.card}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4>Dr. {doc.name}</h4>
                    <p>
                      <b>Specialty:</b> {doc.specialty || "N/A"}
                    </p>
                    <p>
                      <b>Phone:</b> {doc.phone || "N/A"}
                    </p>
                    <p>
                      <b>Email:</b> {doc.email || "N/A"}
                    </p>
                  </motion.div>
                ))}
              </div>
            ),
          },
        ]);
      } else if (value === "APPOINTMENT OPTIONS") {
        const json = await fetchWithAuth(
          "http://ardhost:510/server/api/ML/getAppointmentOptionMessage"
        );
        const options = json.data || [];

        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: (
              <ul className={styles.optionList}>
                {options.map((opt, i) => (
                  <li key={i} className={styles.optionItem}>
                    {opt}
                  </li>
                ))}
              </ul>
            ),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Failed to fetch data." },
      ]);
    }
  };

  const handleChatSubmit = () => {
    if (!userInput.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setUserInput("");
  };

  useEffect(() => {
    if (activeView === "logout") {
      logout();
      navigate("/");
    }
  }, [activeView, logout, navigate]);

  const renderMainContent = () => {
    switch (activeView) {
      case "changePassword":
        return <Changepassword />;
      case "takeAppointment":
        return (
          <div className={styles.contentBox}>
            <h2 className={styles.title}>Take Appointment</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>Patient Name:</label>
              <input type="text" value={formData.patientName} disabled />

              <label>Doctor:</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id || doc.id} value={doc._id || doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>

              <label>Hospital:</label>
              <select
                name="hospitalId"
                value={formData.hospitalId}
                onChange={handleChange}
                required
              >
                <option value="">Select Hospital</option>
                {hospitals.map((hosp) => (
                  <option key={hosp._id || hosp.id} value={hosp._id || hosp.id}>
                    {hosp.name}
                  </option>
                ))}
              </select>

              <label>Appointment Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <button type="submit" className={styles.submitBtn}>
                Book Appointment
              </button>
            </form>
          </div>
        );
      case "upcoming":
        return (
          <div className={styles.contentBox}>
            <h2 className={styles.title}>Upcoming Appointments</h2>
            {appointments.length === 0 ? (
              <p>No upcoming appointments.</p>
            ) : (
              <table className={styles.appointmentTable}>
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Hospital</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id || app.id}>
                      <td>{app.doctorName}</td>
                      <td>{app.hospitalName}</td>
                      <td>{app.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case "profile":
        return renderPatientProfile();
      default:
        return (
          <p className={styles.textGray}>Welcome to the Patient Dashboard</p>
        );
    }
  };

  const renderPatientProfile = () => {
    if (!patientInfo)
      return <p>Loading patient profile or no data available.</p>;

    return (
      <div className={styles.profileCard}>
        <h2>Patient Profile</h2>
        <p>
          <strong>Name:</strong>{" "}
          {patientInfo.name || currentUser?.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {patientInfo.email || currentUser?.email || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {patientInfo.phone || "N/A"}
        </p>
        <p>
          <strong>Gender:</strong> {patientInfo.gender || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {patientInfo.address || "N/A"}
        </p>
        <p>
          <strong>Age:</strong> {patientInfo.age || "N/A"}
        </p>
      </div>
    );
  };

  const renderUserProfile = () => (
    <div className={styles.userProfile}>
      <strong>{currentUser?.name || currentUser?.email || "User"}</strong>
    </div>
  );

  const renderChatBox = () => (
    <div className={styles.chatBoxSide}>
      <h3 className={styles.title}>🤖 Assistant</h3>
      <div className={styles.chatMessages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user" ? styles.userMessage : styles.botMessage
            }
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className={styles.chatOptions}>
        <button onClick={() => handleOptionClick("HOSPITAL LIST")}>
          🏥 Hospital List
        </button>
        <button onClick={() => handleOptionClick("DOCTOR LIST")}>
          🩺 Doctor List
        </button>
        <button onClick={() => handleOptionClick("APPOINTMENT OPTIONS")}>
          📋 Appointment Options
        </button>
        <button onClick={() => setActiveView("takeAppointment")}>
          📅 Book Appointment
        </button>
        <button onClick={() => setActiveView("profile")}>👤 Profile</button>
      </div>

      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Ask something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleChatSubmit();
          }}
        />
        <button onClick={handleChatSubmit}>Send</button>
      </div>
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>
      <SideBar onNavigate={setActiveView} />
      <div className={styles.contentArea}>
        <div className={styles.header}>{renderUserProfile()}</div>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          ⬅ Back
        </button>
        <div className={styles.mainSection}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.mainContent}
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
          {renderChatBox()}
        </div>
      </div>
      <Chatbox token={token} />
    </div>
  );
}
