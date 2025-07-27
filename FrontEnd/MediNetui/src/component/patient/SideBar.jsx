import React, { useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaHistory,
  FaFilePrescription,
  FaClipboardList,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./SideBar.module.css";

export default function SideBar({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  const token = localStorage.getItem("token");

  const handleClick = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);

    if (tab === "prescription" || tab === "history") {
      fetchUploadedImages();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "http://ardhost:510/server/api/patient/uploadImage",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (res.ok) {
        alert("Upload successful!");
        fetchUploadedImages();
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload error occurred.");
    }
  };

  const fetchUploadedImages = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        "http://ardhost:510/server/api/patient/getImageList",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUploadedImages(data?.data || []);
      } else {
        console.error("Failed to fetch image list.");
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>MediNest</div>
        <div className={styles.subtext}>Patient Dashboard</div>
      </div>

      <nav className={styles.navSection}>
        <button
          className={styles.navButton}
          onClick={() => handleClick("upcoming")}
          type="button"
        >
          <FaCalendarCheck className={styles.navIcon} />
          Upcoming
        </button>

        <button
          className={styles.navButton}
          onClick={() => handleClick("past")}
          type="button"
        >
          <FaHistory className={styles.navIcon} />
          Past
        </button>

        <button
          className={styles.navButton}
          onClick={() => handleClick("prescription")}
          type="button"
        >
          <FaFilePrescription className={styles.navIcon} />
          Prescription
        </button>

        {activeTab === "prescription" && (
          <div className={styles.uploadBox}>
            <label htmlFor="prescriptionUpload" className={styles.uploadLabel}>
              Upload Prescription
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              id="prescriptionUpload"
              className={styles.uploadInput}
              onChange={handleFileUpload}
            />
          </div>
        )}

        <button
          className={styles.navButton}
          onClick={() => handleClick("history")}
          type="button"
        >
          <FaClipboardList className={styles.navIcon} />
          History
        </button>

        {activeTab === "history" && (
          <div className={styles.historyTableBox}>
            <h4>Uploaded Prescription History</h4>
            {uploadedImages.length === 0 ? (
              <p>No prescriptions found.</p>
            ) : (
              <table className={styles.historyTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Preview</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedImages.map((img, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{img?.fileName || `File ${i + 1}`}</td>
                      <td>
                        {img?.url?.endsWith(".pdf") ? (
                          <span>PDF</span>
                        ) : (
                          <img
                            src={img?.url}
                            alt="preview"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <a href={img?.url} target="_blank" rel="noreferrer">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <button
          className={styles.navButton}
          onClick={() => handleClick("changePassword")}
          type="button"
        >
          <FaKey className={styles.navIcon} />
          Change Password
        </button>

        <button
          className={styles.navButton}
          onClick={() => handleClick("logout")}
          type="button"
        >
          <FaSignOutAlt className={styles.navIcon} />
          Logout
        </button>
      </nav>
    </div>
  );
}
