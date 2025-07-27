import React, { useEffect, useState } from "react";
import styles from "./upcoming.module.css";

export default function Upcoming() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://ardhost:510/serverapi/patient/getUpcomingAppointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upcoming Appointments</h2>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : appointments.length === 0 ? (
        <p className={styles.noData}>No upcoming appointments.</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Doctor</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={index}>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.doctorName}</td>
                  <td>{appt.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
