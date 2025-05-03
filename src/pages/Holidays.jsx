import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Holidays.css";

const Holidays = () => {
  const [holidaysList, setHolidaysList] = useState([
    { name: "Ziua Muncii", date: "2025-05-01", description: "Sărbătoare legală" },
    { name: "Crăciunul", date: "2025-12-25", description: "Sărbătoare de Crăciun" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const { name, date, description } = newHoliday;

    if (!name.trim()) newErrors.name = "Numele sărbătorii este obligatoriu.";
    if (!date.trim()) newErrors.date = "Data este obligatorie.";
    if (!description.trim()) newErrors.description = "Descrierea este obligatorie.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setNewHoliday({ ...newHoliday, [e.target.name]: e.target.value });
  };

  const handleAddHoliday = () => {
    if (!validateForm()) return;

    setHolidaysList([...holidaysList, newHoliday]);
    setNewHoliday({ name: "", date: "", description: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdateHoliday = () => {
    if (!validateForm()) return;

    const updatedList = [...holidaysList];
    updatedList[editIndex] = newHoliday;
    setHolidaysList(updatedList);
    setNewHoliday({ name: "", date: "", description: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...holidaysList];
    updatedList.splice(index, 1);
    setHolidaysList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewHoliday(holidaysList[index]);
    setErrors({});
    setShowEditModal(true);
  };

  // FUNCȚIE FINALĂ corectă pentru evidențiere în Calendar:
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      return holidaysList.some(holiday => {
        const holidayDate = new Date(holiday.date);
        return (
          holidayDate.getFullYear() === date.getFullYear() &&
          holidayDate.getMonth() === date.getMonth() &&
          holidayDate.getDate() === date.getDate()
        );
      })
        ? 'highlight'
        : null;
    }
  };

  return (
    <div className="holidays-page">
      <div className="holidays-header">
        <h1>Holidays</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută sărbătoare..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Holiday
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar 
          tileClassName={tileClassName}
        />
      </div>

      {/* Modal Add Holiday */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Holiday</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume sărbătoare"
              value={newHoliday.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="date"
              name="date"
              value={newHoliday.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <input
              type="text"
              name="description"
              placeholder="Descriere"
              value={newHoliday.description}
              onChange={handleChange}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddHoliday}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Holiday */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Holiday</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume sărbătoare"
              value={newHoliday.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="date"
              name="date"
              value={newHoliday.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <input
              type="text"
              name="description"
              placeholder="Descriere"
              value={newHoliday.description}
              onChange={handleChange}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdateHoliday}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Holidays */}
      <div className="holidays-table-container">
        <table className="holidays-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Dată</th>
              <th>Descriere</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {holidaysList
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
                  <td>{item.description}</td>
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

export default Holidays;
