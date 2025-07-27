import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styles from "./DocList.module.css";

const fetchDoctors = async () => {
  const token = localStorage.getItem("token"); // or sessionStorage

  if (!token) {
    throw new Error("User not authenticated. Token missing.");
  }

  const res = await fetch(
    "http://ardhost:510/server/api/doctor/getWorkingDoctors",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return res.json(); // returns the full response object
};

const DocList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>Error: {error.message}</p>;
  }

  // Extract doctors array safely
  const doctors = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Available Doctors</h3>
      {doctors.length === 0 ? (
        <p className={styles.noDoctors}>No doctors available at the moment.</p>
      ) : (
        <ul className={styles.doctorList}>
          {doctors.map((doctor, index) => (
            <motion.li
              key={doctor.id || index}
              className={styles.doctorItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, backgroundColor: "#eef2ff" }}
            >
              <strong>{doctor.name}</strong>
              {doctor.qualification && (
                <p className={styles.subInfo}>{doctor.qualification}</p>
              )}
              {doctor.hospitalName && (
                <p className={styles.subInfo}>{doctor.hospitalName}</p>
              )}
              {doctor.email && <p className={styles.subInfo}>{doctor.email}</p>}
              {doctor.phone && <p className={styles.subInfo}>{doctor.phone}</p>}
              <button
                className={`${styles.button} ${styles.view}`}
                onClick={() => handleView(patient)}
              >
                View
              </button>
              <button
                className={`${styles.button} ${styles.edit}`}
                onClick={() => handleEdit(patient)}
              >
                Edit
              </button>
              <button
                className={`${styles.button} ${styles.delete}`}
                onClick={() => handleDelete(patient.id)}
              >
                Delete
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocList;
