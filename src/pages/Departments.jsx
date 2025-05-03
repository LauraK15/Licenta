import React, { useState } from "react";
import "../styles/Departments.css";

const Departments = () => {
  const [departments, setDepartments] = useState([
    { name: "Resurse Umane" },
    { name: "IT" },
    { name: "Marketing" },
    { name: "Financiar" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!newDepartment.trim()) {
      newErrors.name = "Numele departamentului este obligatoriu.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDepartment = () => {
    if (!validateForm()) return;

    setDepartments([...departments, { name: newDepartment }]);
    setNewDepartment("");
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateDepartment = () => {
    if (!validateForm()) return;

    const updatedList = [...departments];
    updatedList[editIndex] = { name: newDepartment };
    setDepartments(updatedList);
    setNewDepartment("");
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...departments];
    updatedList.splice(index, 1);
    setDepartments(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewDepartment(departments[index].name);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="departments-page">
      <div className="departments-header">
        <h1>All Departments</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută departament..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Department
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
              .filter((dept) => dept.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((dept, index) => (
                <tr key={index}>
                  <td>{dept.name}</td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(index)}>
                      ✏️
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(index)}>
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
