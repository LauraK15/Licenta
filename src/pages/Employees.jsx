import React, { useState } from "react";
import "../styles/Employees.css";

const Employees = () => {
  const [employeeList, setEmployeeList] = useState([
    { name: "Ion Popescu", position: "HR Specialist", department: "Resurse Umane", email: "ion.popescu@email.com" },
    { name: "Maria Ionescu", position: "Software Engineer", department: "IT", email: "maria.ionescu@email.com" },
    { name: "Andrei Pavel", position: "Marketing Manager", department: "Marketing", email: "andrei.pavel@email.com" },
    { name: "Ana Georgescu", position: "Accountant", department: "Financiar", email: "ana.georgescu@email.com" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, position, department, email } = newEmployee;

    if (!name.trim()) newErrors.name = "Numele este obligatoriu.";
    if (!position.trim()) newErrors.position = "Poziția este obligatorie.";
    if (!department.trim()) newErrors.department = "Departamentul este obligatoriu.";
    if (!email.trim()) {
      newErrors.email = "Emailul este obligatoriu.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Emailul nu este valid.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEmployee = () => {
    if (!validateForm()) return;

    setEmployeeList([...employeeList, newEmployee]);
    setNewEmployee({ name: "", position: "", department: "", email: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateEmployee = () => {
    if (!validateForm()) return;

    const updatedList = [...employeeList];
    updatedList[editIndex] = newEmployee;
    setEmployeeList(updatedList);
    setNewEmployee({ name: "", position: "", department: "", email: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...employeeList];
    updatedList.splice(index, 1);
    setEmployeeList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewEmployee(employeeList[index]);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="employees-page">
      <div className="employees-header">
        <h1>All Employees</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută angajat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Employee
          </button>
        </div>
      </div>

      {/* Modal Adaugare */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Employee</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume complet"
              value={newEmployee.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="text"
              name="position"
              placeholder="Poziție"
              value={newEmployee.position}
              onChange={handleChange}
            />
            {errors.position && <p className="error-text">{errors.position}</p>}

            <input
              type="text"
              name="department"
              placeholder="Departament"
              value={newEmployee.department}
              onChange={handleChange}
            />
            {errors.department && <p className="error-text">{errors.department}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddEmployee}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editare */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Employee</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume complet"
              value={newEmployee.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="text"
              name="position"
              placeholder="Poziție"
              value={newEmployee.position}
              onChange={handleChange}
            />
            {errors.position && <p className="error-text">{errors.position}</p>}

            <input
              type="text"
              name="department"
              placeholder="Departament"
              value={newEmployee.department}
              onChange={handleChange}
            />
            {errors.department && <p className="error-text">{errors.department}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateEmployee}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Angajați */}
      <div className="employees-table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Poziție</th>
              <th>Departament</th>
              <th>Email</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {employeeList
              .filter((employee) =>
                Object.values(employee)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
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

export default Employees;