import React, { useState } from "react";
import "../styles/Settings.css";
import { useAuth } from "../helper/authContext"; // 🔹 importă contextul

const Settings = () => {
  const { logout } = useAuth(); // 🔹 accesează funcția logout
  const [formData, setFormData] = useState({
    companyName: "HRM",
    email: "contact@hrm.com",
    timezone: "Europe/Bucharest",
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Setările au fost salvate!");
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout(); // 🔹 delogare reală cu Firebase + redirect
  };

  return (
    <div className="settings-page">
      <h1>Setări</h1>
      <form className="settings-form card" onSubmit={handleSubmit}>
        <h2 className="section-title">Informații Companie</h2>

        <label>
          Nume companie:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            disabled
          />
        </label>

        <label>
          Email contact:
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
          />
        </label>

        <label>
          Fus orar:
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
          >
            <option value="Europe/Bucharest">Europe/Bucharest</option>
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </label>

        <button type="submit" className="save-btn">
          Salvează modificările
        </button>
        <button
          type="button"
          className="logout-btn"
          onClick={() => setShowLogoutModal(true)}
        >
          Log out
        </button>
      </form>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmare delogare</h3>
            <p>Sigur vrei să te deloghezi?</p>
            <div className="modal-buttons">
              <button onClick={confirmLogout}>Da, deloghează-mă</button>
              <button className="cancel-button" onClick={() => setShowLogoutModal(false)}>Anulează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
