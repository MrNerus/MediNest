import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PatientLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Logging in with:", formData);
      alert("Login successful!");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Login Form */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Patient Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., ramlal.singh"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Right: Quote Section */}
      <motion.div
        className="hidden md:flex w-1/2 bg-blue-100 text-blue-800 items-center justify-center p-10"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md text-center">
          <blockquote className="text-2xl italic font-semibold mb-4">
            “The art of medicine consists in amusing the patient while nature
            cures the disease.”
          </blockquote>
          <p className="text-sm">– Voltaire</p>
        </div>
      </motion.div>
    </div>
  );
}
