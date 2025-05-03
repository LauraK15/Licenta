import React, { useState } from "react";
import "../styles/Leaves.css";

const Leaves = () => {
  const [leavesList, setLeavesList] = useState([
    { name: "Ion Popescu", type: "Concediu de odihnă", startDate: "2025-05-01", endDate: "2025-05-10", status: "Pending" },
    { name: "Maria Ionescu", type: "Concediu medical", startDate: "2025-04-20", endDate: "2025-04-24", status: "Approved" },
  ]);

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
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleAddLeave = () => {
    if (!validateForm()) return;

    setLeavesList([...leavesList, newLeave]);
    setNewLeave({ name: "", type: "", startDate: "", endDate: "", status: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateLeave = () => {
    if (!validateForm()) return;

    const updatedList = [...leavesList];
    updatedList[editIndex] = newLeave;
    setLeavesList(updatedList);
    setNewLeave({ name: "", type: "", startDate: "", endDate: "", status: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...leavesList];
    updatedList.splice(index, 1);
    setLeavesList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewLeave(leavesList[index]);
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

      {/* Modal Add Leave */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Leave</h2>
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
              <button className="save-button" onClick={handleAddLeave}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Leave */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Leave</h2>
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
              <button className="save-button" onClick={handleUpdateLeave}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Leaves */}
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
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
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

export default Leaves;
