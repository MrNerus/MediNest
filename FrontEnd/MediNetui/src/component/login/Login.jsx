import React, { useState } from "react";
import { useAuth } from "../golbal/AuthContext";
import styles from "./Login.module.css"; // Styles from your CSS module
import { motion } from "framer-motion";

const Login = ({ onClose }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "User",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const success = await login(form);
    if (success) {
      onClose();
    } else {
      setError("Invalid credentials or role.");
    }
  };

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.loginContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 className={styles.heading}>Sign in</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            value={form.username}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className={styles.input}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={styles.select}
          >
            <option>User</option>
            <option>Doctor</option>
            <option>SuperAdmin</option>
            <option>Hospital</option>
          </select>
          <button type="submit" className={styles.loginBtn}>
            Sign in
          </button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
