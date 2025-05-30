import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../helper/firebaseConfig";
import "../styles/Leaves.css";

const Leaves = () => {
  const [leavesList, setLeavesList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newLeave, setNewLeave] = useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const leavesCollection = collection(db, "leaves");

  useEffect(() => {
    const fetchLeaves = async () => {
      const data = await getDocs(leavesCollection);
      const formatted = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLeavesList(formatted);
    };
    fetchLeaves();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const { name, type, startDate, endDate, status } = newLeave;

    if (!name.trim()) newErrors.name = "Numele este obligatoriu.";
    if (!type.trim()) newErrors.type = "Tipul concediului este obligatoriu.";
    if (!startDate.trim()) newErrors.startDate = "Data de început este obligatorie.";
    if (!endDate.trim()) newErrors.endDate = "Data de sfârșit este obligatorie.";
    if (!status.trim()) newErrors.status = "Statusul cererii este obligatoriu.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  const handleAddLeave = async () => {
    if (!validateForm()) return;
    await addDoc(leavesCollection, newLeave);
    setLeavesList([...leavesList, newLeave]);
    setNewLeave({ name: "", type: "", startDate: "", endDate: "", status: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateLeave = async () => {
    if (!validateForm()) return;
    const leaveRef = doc(db, "leaves", editId);
    await updateDoc(leaveRef, newLeave);

    const updatedList = leavesList.map((item) =>
      item.id === editId ? { ...newLeave, id: editId } : item
    );
    setLeavesList(updatedList);
    setNewLeave({ name: "", type: "", startDate: "", endDate: "", status: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = async (id) => {
    const leaveRef = doc(db, "leaves", id);
    await deleteDoc(leaveRef);
    setLeavesList(leavesList.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setNewLeave(item);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="leaves-page">
      <div className="leaves-header">
        <h1>Leaves</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută angajat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Leave Request
          </button>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{showAddModal ? "Add Leave" : "Edit Leave"}</h2>

            <input
              type="text"
              name="name"
              placeholder="Nume angajat"
              value={newLeave.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="text"
              name="type"
              placeholder="Tip concediu"
              value={newLeave.type}
              onChange={handleChange}
            />
            {errors.type && <p className="error-text">{errors.type}</p>}

            <input
              type="date"
              name="startDate"
              value={newLeave.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <p className="error-text">{errors.startDate}</p>}

            <input
              type="date"
              name="endDate"
              value={newLeave.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <p className="error-text">{errors.endDate}</p>}

            <select name="status" value={newLeave.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button
                className="save-button"
                onClick={showAddModal ? handleAddLeave : handleUpdateLeave}
              >
                {showAddModal ? "Save" : "Save Changes"}
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="leaves-table-container">
        <table className="leaves-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Tip concediu</th>
              <th>Început</th>
              <th>Final</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {leavesList
              .filter((item) =>
                Object.values(item)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(item)}>
                      ✏️
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(item.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;
