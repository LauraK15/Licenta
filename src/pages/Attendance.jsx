import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Attendance.css";
import { db } from "../helper/firebaseConfig";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc
} from "firebase/firestore";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
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
    if (employee.prezent?.includes(formatted)) return "present";
    if (employee.absentNemotivat?.includes(formatted)) return "absent";
    if (employee.absentMotivat?.includes(formatted)) return "motivated-absence";
    if (employee.ziLibera?.includes(formatted)) return "free";
    return null;
  };

  const fetchEmployees = async () => {
    const snapshot = await getDocs(collection(db, "attendance"));
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        name: d.name || "Fără nume",
        prezent: d.prezent || [],
        absentNemotivat: d.absentNemotivat || [],
        absentMotivat: d.absentMotivat || [],
        ziLibera: d.ziLibera || [],
      };
    });
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const saveToFirestore = async (employee) => {
    const ref = doc(db, "attendance", employee.name);
    await setDoc(ref, employee);
  };

  const handleAddEmployee = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    const docRef = doc(db, "attendance", trimmed);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      alert("Angajatul există deja.");
      return;
    }

    const newEmployee = {
      name: trimmed,
      prezent: [],
      absentNemotivat: [],
      absentMotivat: [],
      ziLibera: [],
    };

    await saveToFirestore(newEmployee);
    setEmployees((prev) => [...prev, { ...newEmployee, id: trimmed }]);
    setNewName("");
  };

  const handleAddDate = async (index, type) => {
    const dateInput = prompt("Introduceți data (YYYY-MM-DD):");
    if (!dateInput) return;

    const date = new Date(dateInput);
    if (isNaN(date)) {
      alert("Dată invalidă.");
      return;
    }

    const formatted = formatDate(date);
    const updated = [...employees];
    const emp = updated[index];

    ["prezent", "absentNemotivat", "absentMotivat", "ziLibera"].forEach((t) => {
      emp[t] = emp[t]?.filter((d) => d !== formatted);
    });

    emp[type].push(formatted);

    await saveToFirestore(emp);
    setEmployees(updated);
  };

  const handleDayClick = (date, index) => {
    setSelectedDate(date);
    setSelectedEmployeeIndex(index);
    setShowTypeSelector(true);
  };

  const handleSelectType = async (type) => {
    if (!selectedDate || selectedEmployeeIndex === null) return;

    const formatted = formatDate(selectedDate);
    const updated = [...employees];
    const emp = updated[selectedEmployeeIndex];

    ["prezent", "absentNemotivat", "absentMotivat", "ziLibera"].forEach((t) => {
      emp[t] = emp[t]?.filter((d) => d !== formatted);
    });

    emp[type].push(formatted);

    await saveToFirestore(emp);
    setEmployees(updated);
    setShowTypeSelector(false);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="attendance-page">
      <h1>Prezența</h1>

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
              onClickDay={(date) => handleDayClick(date, index)}
              tileClassName={({ date, view }) =>
                view === "month" ? tileClassName(date, employee) : null
              }
            />
            <div className="btn-group">
              <button onClick={() => handleAddDate(index, "prezent")}>+ Prezent</button>
              <button onClick={() => handleAddDate(index, "absentNemotivat")}>+ Absență nemotivată</button>
              <button onClick={() => handleAddDate(index, "ziLibera")}>+ Zi Liberă</button>
              <button onClick={() => handleAddDate(index, "absentMotivat")}>+ Absență motivată</button>
            </div>
          </div>
        ))}
      </div>

      {showTypeSelector && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Selectează tipul pentru {formatDate(selectedDate)}</h2>
            <div className="modal-buttons">
              <button className="present-button" onClick={() => handleSelectType("prezent")}>Prezent</button>
              <button className="absent-button" onClick={() => handleSelectType("absentNemotivat")}>Absență nemotivată</button>
              <button className="free-button" onClick={() => handleSelectType("ziLibera")}>Zi Liberă</button>
              <button className="motivated-absence-button" onClick={() => handleSelectType("absentMotivat")}>Absență motivată</button>
              <button className="cancel-button" onClick={() => setShowTypeSelector(false)}>Anulează</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
