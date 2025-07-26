import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styles from "./DocList.module.css";

const fetchDoctors = async () => {
  const res = await fetch("http://localhost:510/server/api/doctor/getDoctors");
  return res.json();
};

const DocList = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  if (isLoading) return <p>Loading doctors...</p>;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Doctors</h3>
      <ul className={styles.doctorList}>
        {data.map((doctor, index) => (
          <motion.li
            key={doctor._id}
            className={styles.doctorItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, backgroundColor: "#eef2ff" }}
          >
            {doctor.name}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default DocList;
