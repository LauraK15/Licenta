import React, { useState, useEffect } from "react";
import "../styles/Candidates.css";
import { db } from "../helper/firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Candidates = () => {
  const [candidatesList, setCandidatesList] = useState([]);
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
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCandidates = async () => {
    const snapshot = await getDocs(collection(db, "candidates"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCandidatesList(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

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

  const handleAddCandidate = async () => {
    if (!validateForm()) return;

    await addDoc(collection(db, "candidates"), newCandidate);
    fetchCandidates();
    setNewCandidate({ name: "", email: "", phone: "", position: "", status: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateCandidate = async () => {
    if (!validateForm()) return;

    const candidateRef = doc(db, "candidates", editId);
    await updateDoc(candidateRef, newCandidate);
    fetchCandidates();
    setNewCandidate({ name: "", email: "", phone: "", position: "", status: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "candidates", id));
    fetchCandidates();
  };

  const handleEdit = (candidate) => {
    setEditId(candidate.id);
    setNewCandidate(candidate);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="candidates-page">
      <div className="candidates-header">
        <h1>Candidați</h1>
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

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Candidate</h2>
            <input type="text" name="name" placeholder="Nume candidat" value={newCandidate.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input type="email" name="email" placeholder="Email" value={newCandidate.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input type="text" name="phone" placeholder="Telefon" value={newCandidate.phone} onChange={handleChange} />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <input type="text" name="position" placeholder="Post aplicat" value={newCandidate.position} onChange={handleChange} />
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
              <button className="save-button" onClick={handleAddCandidate}>Save</button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Candidate</h2>
            <input type="text" name="name" placeholder="Nume candidat" value={newCandidate.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input type="email" name="email" placeholder="Email" value={newCandidate.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input type="text" name="phone" placeholder="Telefon" value={newCandidate.phone} onChange={handleChange} />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <input type="text" name="position" placeholder="Post aplicat" value={newCandidate.position} onChange={handleChange} />
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
              <button className="save-button" onClick={handleUpdateCandidate}>Save Changes</button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.position}</td>
                  <td>{item.status}</td>
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

export default Candidates;
