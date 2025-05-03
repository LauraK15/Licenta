import React, { useState } from "react";
import "../styles/Candidates.css";

const Candidates = () => {
  const [candidatesList, setCandidatesList] = useState([
    { name: "Andrei Popa", email: "andrei.popa@email.com", phone: "0740123456", position: "Frontend Developer", status: "Applied" },
    { name: "Ioana Mihai", email: "ioana.mihai@email.com", phone: "0740987654", position: "HR Specialist", status: "Interviewed" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const { name, email, phone, position, status } = newCandidate;

    if (!name.trim()) newErrors.name = "Numele este obligatoriu.";
    if (!email.trim()) newErrors.email = "Email-ul este obligatoriu.";
    if (!phone.trim()) newErrors.phone = "Telefonul este obligatoriu.";
    if (!position.trim()) newErrors.position = "Postul este obligatoriu.";
    if (!status.trim()) newErrors.status = "Statusul este obligatoriu.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setNewCandidate({ ...newCandidate, [e.target.name]: e.target.value });
  };

  const handleAddCandidate = () => {
    if (!validateForm()) return;

    setCandidatesList([...candidatesList, newCandidate]);
    setNewCandidate({ name: "", email: "", phone: "", position: "", status: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateCandidate = () => {
    if (!validateForm()) return;

    const updatedList = [...candidatesList];
    updatedList[editIndex] = newCandidate;
    setCandidatesList(updatedList);
    setNewCandidate({ name: "", email: "", phone: "", position: "", status: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...candidatesList];
    updatedList.splice(index, 1);
    setCandidatesList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewCandidate(candidatesList[index]);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="candidates-page">
      <div className="candidates-header">
        <h1>Candidates</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută candidat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Candidate
          </button>
        </div>
      </div>

      {/* Modal Add Candidate */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Candidate</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume candidat"
              value={newCandidate.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newCandidate.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="text"
              name="phone"
              placeholder="Telefon"
              value={newCandidate.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <input
              type="text"
              name="position"
              placeholder="Post aplicat"
              value={newCandidate.position}
              onChange={handleChange}
            />
            {errors.position && <p className="error-text">{errors.position}</p>}

            <select name="status" value={newCandidate.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddCandidate}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Candidate */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Candidate</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume candidat"
              value={newCandidate.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newCandidate.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="text"
              name="phone"
              placeholder="Telefon"
              value={newCandidate.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <input
              type="text"
              name="position"
              placeholder="Post aplicat"
              value={newCandidate.position}
              onChange={handleChange}
            />
            {errors.position && <p className="error-text">{errors.position}</p>}

            <select name="status" value={newCandidate.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateCandidate}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Candidates */}
      <div className="candidates-table-container">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Post aplicat</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {candidatesList
              .filter((item) =>
                Object.values(item)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.position}</td>
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

export default Candidates;
