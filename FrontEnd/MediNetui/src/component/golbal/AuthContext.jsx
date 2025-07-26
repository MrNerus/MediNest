import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

const fetchPatients = async () => {
  const res = await fetch("http://ard:510/server/api/patient/getPatients");
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
};

const fetchDoctors = async () => {
  const res = await fetch("http://ardhost:510/server/api/doctor/getDoctors");
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};

// const fetchSuperAdmins = async () => {
//   const res = await fetch(
//     "http://ardhost:510/server/api/superadmin/getSuperAdmins"
//   );
//   if (!res.ok) throw new Error("Failed to fetch super admins");
//   return res.json();
// };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const {
    data: patients = [],
    error: patientError,
    isLoading: loadingPatients,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const {
    data: doctors = [],
    error: doctorError,
    isLoading: loadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  // const {
  //   data: superadmins = [],
  //   error: superadminError,
  //   isLoading: loadingSuperadmins,
  // } = useQuery({
  //   queryKey: ["superadmins"],
  //   queryFn: fetchSuperAdmins,
  // });

  const isLoading = loadingPatients || loadingDoctors || loadingSuperadmins;
  // const hasError = patientError || doctorError || superadminError;

  // Log errors if any
  if (patientError) console.error("Patient fetch error:", patientError);
  if (doctorError) console.error("Doctor fetch error:", doctorError);
  // if (superadminError)
  //   console.error("SuperAdmin fetch error:", superadminError);

  const login = ({ username, password, role }) => {
    if (hasError) {
      alert("Something went wrong. Please try again later.");
      return false;
    }

    if (isLoading) {
      alert("User data is still loading. Please wait.");
      return false;
    }

    let foundUser = null;
    const uname = username.toLowerCase();
    const urole = role.toLowerCase();

    if (urole === "user" || urole === "patient") {
      foundUser = patients.find(
        (p) => p.username.toLowerCase() === uname && p.password === password
      );
      if (foundUser) foundUser.role = "User";
    } else if (urole === "doctor") {
      foundUser = doctors.find(
        (d) => d.username.toLowerCase() === uname && d.password === password
      );
      if (foundUser) foundUser.role = "Doctor";
    } else if (urole === "superadmin") {
      foundUser = superadmins.find(
        (s) => s.username.toLowerCase() === uname && s.password === password
      );
      if (foundUser) foundUser.role = "SuperAdmin";
    } else {
      alert("Invalid role.");
      return false;
    }

    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    } else {
      alert("Invalid credentials.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
