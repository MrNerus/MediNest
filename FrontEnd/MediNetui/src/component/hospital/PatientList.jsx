import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styles from "./PatientList.module.css";

const fetchPatients = async () => {
  const res = await fetch(
    "http://localhost:510/server/api/patient/getPatients"
  );
  return res.json();
};

const PatientList = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  if (isLoading) return <p>Loading patients...</p>;

  const handleView = (patient) => {
    alert(`Viewing details for ${patient.name}`);
  };

  const handleEdit = (patient) => {
    alert(`Editing ${patient.name}`);
  };

  const handleDelete = (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      alert(`Deleting patient with ID: ${patientId}`);
      // Call DELETE API here
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Patients</h3>
      <motion.ul
        className={styles.patientList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {data.map((patient, index) => (
          <motion.li
            key={patient._id}
            className={styles.patientItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={styles.details}>
              <div>
                <strong>Name:</strong> {patient.name}
              </div>
              <div>
                <strong>Age:</strong> {patient.age}
              </div>
              <div>
                <strong>Email:</strong> {patient.email}
              </div>
            </div>
            <div className={styles.actions}>
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
                onClick={() => handleDelete(patient._id)}
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default PatientList;
