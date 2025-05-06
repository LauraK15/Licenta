import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Attendance.css";

const Attendance = () => {
  const [employees, setEmployees] = useState([
    {
      name: "Ion Popescu",
      attendance: ["2025-05-01", "2025-05-03"],
      absence: ["2025-05-04"],
      freeDays: ["2025-05-06"]
    },
    {
      name: "Maria Ionescu",
      attendance: ["2025-05-02", "2025-05-03"],
      absence: ["2025-05-05"],
      freeDays: []
    }
  ]);

  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  const tileClassName = (date, employee) => {
    const formatted = formatDate(date);
    if (employee.attendance.includes(formatted)) return "present";
    if (employee.absence.includes(formatted)) return "absent";
    if (employee.freeDays.includes(formatted)) return "free";
    return null;
  };

  const handleAddEmployee = () => {
    if (!newName.trim()) return;
    const newEmployee = {
      name: newName.trim(),
      attendance: [],
      absence: [],
      freeDays: []
    };
    setEmployees(prev => [...prev, newEmployee]);
    setNewName("");
  };

  const handleAddDate = (index, type) => {
    const date = prompt(`Introduceți data (${type}) în format YYYY-MM-DD:`);
    if (!date) return;
    const updated = [...employees];
    if (!updated[index][type].includes(date)) {
      updated[index][type].push(date);
    }
    setEmployees(updated);
  };

  const handleDayClick = (date, employeeIndex) => {
    setSelectedDate(date);
    setSelectedEmployeeIndex(employeeIndex);
    setShowTypeSelector(true);
  };

  const handleSelectType = (type) => {
    const formatted = formatDate(selectedDate);
    const updated = [...employees];
    const types = ["attendance", "absence", "freeDays"];

    types.forEach(t => {
      updated[selectedEmployeeIndex][t] = updated[selectedEmployeeIndex][t].filter(d => d !== formatted);
    });

    if (type === "attendance") updated[selectedEmployeeIndex].attendance.push(formatted);
    if (type === "absence") updated[selectedEmployeeIndex].absence.push(formatted);
    if (type === "freeDays") updated[selectedEmployeeIndex].freeDays.push(formatted);

    setEmployees(updated);
    setShowTypeSelector(false);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="attendance-page">
      <h1>Attendance</h1>

      <div className="controls-bar">
        <input
          type="text"
          placeholder="Nume angajat"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleAddEmployee}>+ Add Employee</button>
        <input
          type="text"
          placeholder="Caută angajat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="attendance-grid">
        {filteredEmployees.map((employee, index) => (
          <div key={index} className="employee-card">
            <h2>{employee.name}</h2>
            <Calendar
              onClickDay={(date) => handleDayClick(date, employees.indexOf(employee))}
              tileClassName={({ date, view }) =>
                view === "month" ? tileClassName(date, employee) : null
              }
            />
            <div className="btn-group">
              <button onClick={() => handleAddDate(employees.indexOf(employee), "attendance")}>+ Prezent</button>
              <button onClick={() => handleAddDate(employees.indexOf(employee), "absence")}>+ Absent</button>
              <button onClick={() => handleAddDate(employees.indexOf(employee), "freeDays")}>+ Zi Liberă</button>
            </div>
          </div>
        ))}
      </div>

      {showTypeSelector && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Selectează tipul pentru {formatDate(selectedDate)}</h2>
            <div className="modal-buttons">
              <button onClick={() => handleSelectType("attendance")}>Prezent</button>
              <button onClick={() => handleSelectType("absence")}>Absent</button>
              <button onClick={() => handleSelectType("freeDays")}>Zi Liberă</button>
              <button className="cancel-button" onClick={() => setShowTypeSelector(false)}>Anulează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
