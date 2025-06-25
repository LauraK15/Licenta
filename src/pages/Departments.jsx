import React, { useState, useEffect } from "react";
import { db } from "../helper/firebaseConfig.js";
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs, onSnapshot } from "firebase/firestore";
import "../styles/Departments.css"; // Fișierul CSS pentru stiluri

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Citirea departamentelor din Firestore folosind onSnapshot (pentru actualizare în timp real)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "departments"), (snapshot) => {
      const departmentList = snapshot.docs.map((doc) => ({
        id: doc.id, // Adăugăm ID-ul documentului
        ...doc.data(),
      }));
      setDepartments(departmentList); // Salvează datele în state-ul componentului
    });

    // Cleanup - se va opri ascultătorul când componenta este demontată
    return () => unsubscribe();
  }, []);

  // Validarea formularului
  const validateForm = () => {
    const newErrors = {};
    if (!newDepartment.trim()) {
      newErrors.name = "Numele departamentului este obligatoriu.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Adăugarea unui departament în Firestore
  const handleAddDepartment = async () => {
    if (!validateForm()) return;

    try {
      const docRef = await addDoc(collection(db, "departments"), {
        name: newDepartment,
      });
      console.log("Department added with ID: ", docRef.id);
      setNewDepartment("");
      setErrors({});
      setShowAddModal(false);
    } catch (e) {
      console.error("Error adding department: ", e);
    }
  };

  // Actualizarea unui departament în Firestore
  const handleUpdateDepartment = async () => {
    if (!validateForm()) return;

    const updatedDepartment = {
      name: newDepartment,
    };

    const departmentDocRef = doc(db, "departments", editIndex); // Folosim ID-ul documentului
    await updateDoc(departmentDocRef, updatedDepartment);
    setDepartments(departments.map((dep) => (dep.id === editIndex ? updatedDepartment : dep)));
    setNewDepartment("");
    setErrors({});
    setShowEditModal(false);
  };

  // Ștergerea unui departament din Firestore
  const handleDelete = async (id) => {
    try {
      const departmentDocRef = doc(db, "departments", id); // Folosim ID-ul documentului pentru ștergere
      await deleteDoc(departmentDocRef);
    } catch (e) {
      console.error("Error deleting department: ", e);
    }
  };

  // Modificarea unui departament
  const handleEdit = (id) => {
    const department = departments.find((dep) => dep.id === id);
    setEditIndex(id);
    setNewDepartment(department.name);
    setShowEditModal(true);
  };

  return (
    <div className="departments-page">
      <div className="departments-header">
        <h1>Departamente</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută departament..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add 
          </button>
        </div>
      </div>

      {/* Modal Add */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Department</h2>
            <input
              type="text"
              placeholder="Nume departament"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddDepartment}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Department</h2>
            <input
              type="text"
              placeholder="Nume departament"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateDepartment}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="departments-table-container">
        <table className="departments-table">
          <thead>
            <tr>
              <th>Departament</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {departments
              .filter((dept) =>
                dept.name && dept.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.name}</td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(dept.id)}>
                      ✏️
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(dept.id)}>
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

export default Departments;
