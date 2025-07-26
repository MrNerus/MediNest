import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import styles from "./PatientRegister.module.css";

const PatientRegister = ({ onClose }) => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    gender: "Male",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerPatient = async (formData) => {
    const res = await fetch("http://ardhost:510/server/api/patient/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return res.json();
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: registerPatient,
    onSuccess: () => {
      alert("Registered successfully!");
      setForm({
        username: "",
        name: "",
        gender: "Male",
        phone: "",
        email: "",
        address: "",
      });
      setErrors({});
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      mutate(form);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Close Register Form"
        >
          &times;
        </button>

        <h2 className={styles.title}>Sign up</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {[
            { label: "Username", name: "username", type: "text" },
            { label: "Name", name: "name", type: "text" },
            {
              label: "Phone",
              name: "phone",
              type: "tel",
              placeholder: "Digits only",
            },
            { label: "Email", name: "email", type: "email" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className={styles.label}>
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors[name] ? styles.errorBorder : ""
                }`}
              />
              {errors[name] && (
                <p className={styles.errorText}>{errors[name]}</p>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="gender" className={styles.label}>
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={styles.input}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="address" className={styles.label}>
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea} ${
                errors.address ? styles.errorBorder : ""
              }`}
              rows={3}
            />
            {errors.address && (
              <p className={styles.errorText}>{errors.address}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>

          {isError && (
            <p className={styles.errorText}>Error: {error.message}</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PatientRegister;
