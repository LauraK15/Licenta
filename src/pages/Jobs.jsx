import React, { useState } from "react";
import "../styles/Jobs.css";

const Jobs = () => {
  const [jobsList, setJobsList] = useState([
    { title: "Frontend Developer", department: "IT", location: "București", jobType: "Full-time", status: "Open" },
    { title: "HR Specialist", department: "HR", location: "Cluj", jobType: "Part-time", status: "Open" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleAddJob = () => {
    if (!validateForm()) return;

    setJobsList([...jobsList, newJob]);
    setNewJob({ title: "", department: "", location: "", jobType: "", status: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateJob = () => {
    if (!validateForm()) return;

    const updatedList = [...jobsList];
    updatedList[editIndex] = newJob;
    setJobsList(updatedList);
    setNewJob({ title: "", department: "", location: "", jobType: "", status: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...jobsList];
    updatedList.splice(index, 1);
    setJobsList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewJob(jobsList[index]);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Jobs</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută job..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Job Posting
          </button>
        </div>
      </div>

      {/* Modal Add Job */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Job</h2>
            <input
              type="text"
              name="title"
              placeholder="Titlu job"
              value={newJob.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}

            <input
              type="text"
              name="department"
              placeholder="Departament"
              value={newJob.department}
              onChange={handleChange}
            />
            {errors.department && <p className="error-text">{errors.department}</p>}

            <input
              type="text"
              name="location"
              placeholder="Locație"
              value={newJob.location}
              onChange={handleChange}
            />
            {errors.location && <p className="error-text">{errors.location}</p>}

            <select name="jobType" value={newJob.jobType} onChange={handleChange}>
              <option value="">Selectează tip job</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
            {errors.jobType && <p className="error-text">{errors.jobType}</p>}

            <select name="status" value={newJob.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddJob}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Job */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Job</h2>
            <input
              type="text"
              name="title"
              placeholder="Titlu job"
              value={newJob.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}

            <input
              type="text"
              name="department"
              placeholder="Departament"
              value={newJob.department}
              onChange={handleChange}
            />
            {errors.department && <p className="error-text">{errors.department}</p>}

            <input
              type="text"
              name="location"
              placeholder="Locație"
              value={newJob.location}
              onChange={handleChange}
            />
            {errors.location && <p className="error-text">{errors.location}</p>}

            <select name="jobType" value={newJob.jobType} onChange={handleChange}>
              <option value="">Selectează tip job</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
            {errors.jobType && <p className="error-text">{errors.jobType}</p>}

            <select name="status" value={newJob.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateJob}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Jobs */}
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
            {jobsList
              .filter((item) =>
                Object.values(item)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.department}</td>
                  <td>{item.location}</td>
                  <td>{item.jobType}</td>
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

export default Jobs;
