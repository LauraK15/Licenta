import React, { useState } from "react";
import "../styles/Attendance.css";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([
    { name: "Ion Popescu", date: "2025-04-24", status: "Present" },
    { name: "Maria Ionescu", date: "2025-04-24", status: "Absent" },
    { name: "Andrei Pavel", date: "2025-04-24", status: "Late" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    name: "",
    date: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const { name, date, status } = newAttendance;

    if (!name.trim()) newErrors.name = "Numele este obligatoriu.";
    if (!date.trim()) newErrors.date = "Data este obligatorie.";
    if (!status.trim()) newErrors.status = "Statusul este obligatoriu.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
  };

  const handleAddAttendance = () => {
    if (!validateForm()) return;

    setAttendanceList([...attendanceList, newAttendance]);
    setNewAttendance({ name: "", date: "", status: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateAttendance = () => {
    if (!validateForm()) return;

    const updatedList = [...attendanceList];
    updatedList[editIndex] = newAttendance;
    setAttendanceList(updatedList);
    setNewAttendance({ name: "", date: "", status: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...attendanceList];
    updatedList.splice(index, 1);
    setAttendanceList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewAttendance(attendanceList[index]);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h1>Attendance</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută angajat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Attendance
          </button>
        </div>
      </div>

      {/* Modal Add Attendance */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Attendance</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume angajat"
              value={newAttendance.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="date"
              name="date"
              value={newAttendance.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <select name="status" value={newAttendance.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddAttendance}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Attendance */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Attendance</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume angajat"
              value={newAttendance.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="date"
              name="date"
              value={newAttendance.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <select name="status" value={newAttendance.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateAttendance}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Attendance */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Data</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList
              .filter((item) =>
                Object.values(item)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
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

export default Attendance;
