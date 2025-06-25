
import React, { useState, useEffect } from "react";
import "../styles/Employees.css";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../helper/firebaseConfig.js";
import { Toaster, toast } from "react-hot-toast";

const Employees = () => {
  const [employeeList, setEmployeeList] = useState([]);
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployeeList(data);
      } catch (error) {
        console.error("Eroare la citire angajați:", error);
        toast.error("Eroare la încărcarea angajaților.");
      }
    };

    fetchEmployees();
  }, []);

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

  const handleAddEmployee = async () => {
    if (!validateForm()) return;

    try {
      const docRef = await addDoc(collection(db, "employees"), newEmployee);
      setEmployeeList([...employeeList, { ...newEmployee, id: docRef.id }]);
      setNewEmployee({ name: "", position: "", department: "", email: "" });
      setErrors({});
      setShowAddModal(false);
      toast.success("Angajat adăugat cu succes!");
    } catch (error) {
      console.error("Eroare la adăugare angajat:", error);
      toast.error("Eroare la adăugare angajat.");
    }
  };

  const handleUpdateEmployee = async () => {
    if (!validateForm()) return;

    try {
      const { id, ...dataWithoutId } = newEmployee;
      await updateDoc(doc(db, "employees", id), dataWithoutId);

      const updatedList = [...employeeList];
      updatedList[editIndex] = newEmployee;
      setEmployeeList(updatedList);
      setNewEmployee({ name: "", position: "", department: "", email: "" });
      setErrors({});
      setShowEditModal(false);
      toast.success("Angajat actualizat cu succes!");
    } catch (error) {
      console.error("Eroare la actualizarea angajatului:", error);
      toast.error("Eroare la actualizare angajat.");
    }
  };

  const handleDelete = async (index) => {
    const employeeToDelete = employeeList[index];
    try {
      await deleteDoc(doc(db, "employees", employeeToDelete.id));
      const updatedList = employeeList.filter((_, i) => i !== index);
      setEmployeeList(updatedList);
      toast.success("Angajat șters cu succes!");
    } catch (error) {
      console.error("Eroare la ștergerea angajatului:", error);
      toast.error("Eroare la ștergere angajat.");
    }
  };

  const handleEdit = (index) => {
    const emp = employeeList[index];
    setEditIndex(index);
    setNewEmployee(emp);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="employees-page">
      <Toaster position="top-right" />
      <div className="employees-header">
        <h1>Angajați</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută angajat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add 
          </button>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Employee</h2>
            <input type="text" name="name" placeholder="Nume complet" value={newEmployee.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}
            <input type="text" name="position" placeholder="Poziție" value={newEmployee.position} onChange={handleChange} />
            {errors.position && <p className="error-text">{errors.position}</p>}
            <input type="text" name="department" placeholder="Departament" value={newEmployee.department} onChange={handleChange} />
            {errors.department && <p className="error-text">{errors.department}</p>}
            <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddEmployee}>Save</button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Employee</h2>
            <input type="text" name="name" placeholder="Nume complet" value={newEmployee.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}
            <input type="text" name="position" placeholder="Poziție" value={newEmployee.position} onChange={handleChange} />
            {errors.position && <p className="error-text">{errors.position}</p>}
            <input type="text" name="department" placeholder="Departament" value={newEmployee.department} onChange={handleChange} />
            {errors.department && <p className="error-text">{errors.department}</p>}
            <input type="email" name="email" placeholder="Email" value={newEmployee.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateEmployee}>Save Changes</button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
                <tr key={employee.id}>
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
