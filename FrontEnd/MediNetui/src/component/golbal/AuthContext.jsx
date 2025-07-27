import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode"; // ✅ FIXED

const AuthContext = createContext();

const fetchDoctors = async () => {
  const res = await fetch("http://ardhost:510/server/api/doctor/getDoctors", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
};

const fetchPatients = async () => {
  const res = await fetch("http://ardhost:510/server/api/patient/getPatients", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const login = async ({ username, password, role }) => {
    try {
      const res = await fetch("http://ardhost:510/server/api/identity/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) return false;

      const data = await res.json();

      if (data.data && data.data.token) {
        const ROLE_CLAIM =
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

        const decoded = jwtDecode(data.data.token); // ✅ FIXED usage
        const userRole = decoded[ROLE_CLAIM] || "User";

        localStorage.setItem("token", data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.data.username,
            role: userRole,
          })
        );

        setCurrentUser({
          username: data.data.username,
          role: userRole,
        });

        return true;
      } else {
        console.error("Invalid login response:", data);
        return false;
      }
    } catch (err) {
      console.error("Login error", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const {
    data: doctors = [],
    error: doctorError,
    isLoading: loadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    enabled: !!currentUser,
  });

  const {
    data: patients = [],
    error: patientError,
    isLoading: loadingPatients,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    enabled: !!currentUser,
  });

  if (doctorError) console.error("Doctors fetch error:", doctorError);
  if (patientError) console.error("Patients fetch error:", patientError);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        doctors,
        patients,
        loadingDoctors,
        loadingPatients,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
