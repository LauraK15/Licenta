import React, { useState, useEffect } from "react";
import "../styles/Jobs.css";
import { db } from "../helper/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newJob, setNewJob] = useState(initialJobState());
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function initialJobState() {
    return {
      title: "",
      department: "",
      location: "",
      jobType: "",
      status: "",
    };
  }

  const fetchJobs = async () => {
    const snapshot = await getDocs(collection(db, "jobs"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setJobsList(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const { title, department, location, jobType, status } = newJob;
    if (!title.trim()) newErrors.title = "Titlul este obligatoriu.";
    if (!department.trim()) newErrors.department = "Departamentul este obligatoriu.";
    if (!location.trim()) newErrors.location = "Locația este obligatorie.";
    if (!jobType.trim()) newErrors.jobType = "Tipul jobului este obligatoriu.";
    if (!status.trim()) newErrors.status = "Statusul este obligatoriu.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleAddJob = async () => {
    if (!validateForm()) return;
    const docRef = await addDoc(collection(db, "jobs"), newJob);
    setJobsList([...jobsList, { ...newJob, id: docRef.id }]);
    setNewJob(initialJobState());
    setErrors({});
    setShowAddModal(false);
  };

  const handleEdit = (job) => {
    setNewJob(job);
    setEditId(job.id);
    setShowEditModal(true);
  };

  const handleUpdateJob = async () => {
    if (!validateForm()) return;
    await updateDoc(doc(db, "jobs", editId), newJob);
    const updatedList = jobsList.map((j) =>
      j.id === editId ? { ...newJob, id: editId } : j
    );
    setJobsList(updatedList);
    setNewJob(initialJobState());
    setShowEditModal(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
    setJobsList(jobsList.filter((j) => j.id !== id));
  };

  const filteredJobs = jobsList.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Joburi</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută job..."
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
        <JobModal
          title="Add Job"
          data={newJob}
          errors={errors}
          handleChange={handleChange}
          onSave={handleAddJob}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {/* Modal Edit */}
      {showEditModal && (
        <JobModal
          title="Edit Job"
          data={newJob}
          errors={errors}
          handleChange={handleChange}
          onSave={handleUpdateJob}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {/* Table */}
      <div className="jobs-table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Titlu</th>
              <th>Departament</th>
              <th>Locație</th>
              <th>Tip job</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.department}</td>
                <td>{item.location}</td>
                <td>{item.jobType}</td>
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

const JobModal = ({ title, data, errors, handleChange, onSave, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>{title}</h2>
      <input type="text" name="title" placeholder="Titlu job" value={data.title} onChange={handleChange} />
      {errors.title && <p className="error-text">{errors.title}</p>}

      <input type="text" name="department" placeholder="Departament" value={data.department} onChange={handleChange} />
      {errors.department && <p className="error-text">{errors.department}</p>}

      <input type="text" name="location" placeholder="Locație" value={data.location} onChange={handleChange} />
      {errors.location && <p className="error-text">{errors.location}</p>}

      <select name="jobType" value={data.jobType} onChange={handleChange}>
        <option value="">Selectează tip job</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Remote">Remote</option>
      </select>
      {errors.jobType && <p className="error-text">{errors.jobType}</p>}

      <select name="status" value={data.status} onChange={handleChange}>
        <option value="">Selectează status</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>
      {errors.status && <p className="error-text">{errors.status}</p>}

      <div className="modal-buttons">
        <button className="save-button" onClick={onSave}>Save</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

export default Jobs;
