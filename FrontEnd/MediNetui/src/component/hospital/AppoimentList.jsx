import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styles from "./AppoimentList.module.css";

const fetchAppointments = async () => {
  const res = await fetch(
    "http://localhost:510/server/api/appointment/getAppointments"
  );
  return res.json();
};

const AppointmentList = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });

  if (isLoading) return <p>Loading appointments...</p>;

  const upcoming = data.filter((a) => new Date(a.date) > new Date());
  const scheduled = data.filter((a) => new Date(a.date) <= new Date());

  const renderAppointments = (list, type) =>
    list.map((app, index) => (
      <motion.li
        key={app._id}
        className={styles.appointmentItem}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className={styles.appointmentDetails}>
          <div>
            <strong>Patient:</strong> {app.patientName}
          </div>
          <div>
            <strong>Doctor:</strong> {app.doctorName}
          </div>
          <div>
            <strong>Date:</strong> {new Date(app.date).toLocaleString()}
          </div>
          <div
            className={`${styles.status} ${
              type === "scheduled" ? styles.scheduled : ""
            }`}
          >
            {type === "upcoming" ? "Upcoming" : "Scheduled"}
          </div>
        </div>
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.cancel}`}>
            Cancel
          </button>
          <button className={`${styles.button} ${styles.reschedule}`}>
            Reschedule
          </button>
        </div>
      </motion.li>
    ));

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Appointments</h3>

      <h4 className={styles.subheading}>Upcoming</h4>
      <motion.ul
        className={styles.appointmentList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderAppointments(upcoming, "upcoming")}
      </motion.ul>

      <h4 className={styles.subheading}>Scheduled</h4>
      <motion.ul
        className={styles.appointmentList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderAppointments(scheduled, "scheduled")}
      </motion.ul>
    </div>
  );
};

export default AppointmentList;
