import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import About from "./component/about/About";
import Service from "./component/servicepage/Service";
import Contact from "./component/contact/Contact";
import PatientDashboard from "./component/patient/PatientDashboard";
import DoctorDashboard from "./component/Doctor/DoctorDashboard";
import SuperAdminDashboard from "./component/superadmin/SuperAdminDashBoard";
import Hospital from "./component/hospital/Hospital";
import { useAuth } from "./component/golbal/AuthContext";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />

        {/* Role-based dashboards */}
        <Route path="/user-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/hospital-dashboard" element={<Hospital />} />

        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
