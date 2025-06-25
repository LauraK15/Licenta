// src/pages/Deplasari.jsx
import React, { useState, useEffect } from "react";
import { db } from "../helper/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import "../styles/Deplasari.css";

const Deplasari = () => {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialState());
  const [errors, setErrors] = useState({});

  function initialState() {
    return {
      employee: "",
      country: "",
      mission: "",
      budget: "",
      departureDate: "",
      returnDate: "",
    };
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "deplasari"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrips(data);
    });
    return () => unsub();
  }, []);

  const validate = () => {
    const err = {};
    if (!form.employee) err.employee = "Numele angajatului este obligatoriu.";
    if (!form.country) err.country = "Țara este obligatorie.";
    if (!form.mission) err.mission = "Misiunea este obligatorie.";
    if (!form.budget) err.budget = "Bugetul este obligatoriu.";
    if (!form.departureDate) err.departureDate = "Data plecării este obligatorie.";
    if (!form.returnDate) err.returnDate = "Data întoarcerii este obligatorie.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      if (editId) {
        await updateDoc(doc(db, "deplasari", editId), form);
      } else {
        await addDoc(collection(db, "deplasari"), form);
        setEditId(null); // Reset editId după adăugare
      }

      setForm(initialState());
      setShowAddModal(false);
      setShowEditModal(false);
      setErrors({});
    } catch (err) {
      console.error("Eroare la salvare:", err);
      alert("A apărut o eroare. Verifică consola.");
    }
  };

  const handleEdit = (trip) => {
    setForm(trip);
    setEditId(trip.id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "deplasari", id));
  };

  return (
    <div className="deplasari-page">
      <div className="deplasari-header">
        <h1>Deplasări</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>+ Add</button>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editId ? "Editare" : "Adaugă deplasare"}</h2>
            <input type="text" placeholder="Angajat" value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} />
            {errors.employee && <p className="error-text">{errors.employee}</p>}

            <input type="text" placeholder="Țara" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            {errors.country && <p className="error-text">{errors.country}</p>}

            <input type="text" placeholder="Misiune" value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} />
            {errors.mission && <p className="error-text">{errors.mission}</p>}

            <input type="number" placeholder="Buget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            {errors.budget && <p className="error-text">{errors.budget}</p>}

            <input type="date" value={form.departureDate} onChange={(e) => setForm({ ...form, departureDate: e.target.value })} />
            {errors.departureDate && <p className="error-text">{errors.departureDate}</p>}

            <input type="date" value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} />
            {errors.returnDate && <p className="error-text">{errors.returnDate}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleSave}>Salvează</button>
              <button className="cancel-button" onClick={() => { setShowAddModal(false); setShowEditModal(false); setForm(initialState()); setErrors({}); setEditId(null); }}>Renunță</button>
            </div>
          </div>
        </div>
      )}

      <div className="deplasari-table-container">
        <table className="deplasari-table">
          <thead>
            <tr>
              <th>Angajat</th>
              <th>Țara</th>
              <th>Misiune</th>
              <th>Buget</th>
              <th>Plecare</th>
              <th>Întoarcere</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {trips.filter(t => Object.values(t).join(" ").toLowerCase().includes(searchTerm.toLowerCase())).map(trip => (
              <tr key={trip.id}>
                <td>{trip.employee}</td>
                <td>{trip.country}</td>
                <td>{trip.mission}</td>
                <td>{trip.budget} €</td>
                <td>{trip.departureDate}</td>
                <td>{trip.returnDate}</td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(trip)}>✏️</button>
                  <button className="delete-button" onClick={() => handleDelete(trip.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deplasari;