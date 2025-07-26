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
import { useAuth } from "./component/golbal/AuthContext";
import Hospital from "./component/hospital/Hospital";

const App = () => {
  const { currentUser } = useAuth();

  const renderDashboard = () => {
    switch (currentUser?.role) {
      case "User":
        return <PatientDashboard />;
      case "Doctor":
        return <DoctorDashboard />;
      case "SuperAdmin":
        return <SuperAdminDashboard />;
      // case "Hospital":
      //   return <HospitalDashboard />;
      default:
        return null;
    }
  };

  return (
    <>
      {!currentUser && <Navbar />}
      {currentUser ? (
        renderDashboard()
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}

      {/* <PatientDashboard />
      <DoctorDashboard />
      <SuperAdminDashboard /> */}
      {/* <Hospital /> */}
    </>
  );
};

export default App;
