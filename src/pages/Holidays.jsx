import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Holidays.css";
import { db } from "../helper/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Holidays = () => {
  const [holidaysList, setHolidaysList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchHolidays = async () => {
    const snapshot = await getDocs(collection(db, "holidays"));
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setHolidaysList(data);
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const { name, date, description } = newHoliday;

    if (!name.trim()) newErrors.name = "Numele este obligatoriu.";
    if (!date.trim()) newErrors.date = "Data este obligatorie.";
    if (!description.trim()) newErrors.description = "Descrierea este obligatorie.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setNewHoliday({ ...newHoliday, [e.target.name]: e.target.value });
  };

  const handleAddHoliday = async () => {
    if (!validateForm()) return;

    await addDoc(collection(db, "holidays"), newHoliday);
    setNewHoliday({ name: "", date: "", description: "" });
    setErrors({});
    setShowAddModal(false);
    fetchHolidays();
  };

  const handleUpdateHoliday = async () => {
    if (!validateForm() || !editId) return;

    const ref = doc(db, "holidays", editId);
    await updateDoc(ref, newHoliday);
    setNewHoliday({ name: "", date: "", description: "" });
    setErrors({});
    setShowEditModal(false);
    fetchHolidays();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "holidays", id));
    fetchHolidays();
  };

  const handleEdit = (holiday) => {
    setEditId(holiday.id);
    setNewHoliday({
      name: holiday.name,
      date: holiday.date,
      description: holiday.description,
    });
    setShowEditModal(true);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return holidaysList.some((holiday) => {
        const d = new Date(holiday.date);
        return (
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
        );
      })
        ? "highlight"
        : null;
    }
  };

  return (
    <div className="holidays-page">
      <div className="holidays-header">
        <h1>Zile libere</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută sărbătoare..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar tileClassName={tileClassName} />
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add</h2>
            <input type="text" name="name" placeholder="Nume" value={newHoliday.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input type="date" name="date" value={newHoliday.date} onChange={handleChange} />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <input type="text" name="description" placeholder="Descriere" value={newHoliday.description} onChange={handleChange} />
            {errors.description && <p className="error-text">{errors.description}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddHoliday}>Save</button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Holiday</h2>
            <input type="text" name="name" placeholder="Nume" value={newHoliday.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input type="date" name="date" value={newHoliday.date} onChange={handleChange} />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <input type="text" name="description" placeholder="Descriere" value={newHoliday.description} onChange={handleChange} />
            {errors.description && <p className="error-text">{errors.description}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateHoliday}>Save Changes</button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="holidays-table-container">
        <table className="holidays-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Dată</th>
              <th>Descriere</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {holidaysList
              .filter((item) =>
                Object.values(item).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(item)}>✏️</button>
                    <button className="delete-button" onClick={() => handleDelete(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;
