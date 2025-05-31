import React, { useState, useEffect } from "react";
import "../styles/Payroll.css";
import { db } from "../helper/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

const Payroll = () => {
  const [payrollList, setPayrollList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPayroll, setNewPayroll] = useState(initialPayrollState());
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function initialPayrollState() {
    return {
      name: "",
      grossSalary: "",
      cas: "",
      cass: "",
      incomeTax: "",
      netSalary: "",
      date: "",
      status: "",
    };
  }

  const fetchPayrolls = async () => {
    const snapshot = await getDocs(collection(db, "payrolls"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPayrollList(data);
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const calculatePayroll = (grossSalary) => {
    const gross = parseFloat(grossSalary) || 0;
    const cas = (gross * 0.25).toFixed(2);
    const cass = (gross * 0.10).toFixed(2);
    const taxableBase = gross - cas - cass;
    const incomeTax = (taxableBase * 0.10).toFixed(2);
    const net = (gross - cas - cass - incomeTax).toFixed(2);
    return { cas, cass, incomeTax, netSalary: net };
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, grossSalary, date, status } = newPayroll;
    if (!name.trim()) newErrors.name = "Numele este obligatoriu.";
    if (!grossSalary.trim()) newErrors.grossSalary = "Salariul brut este obligatoriu.";
    if (!date.trim()) newErrors.date = "Data plății este obligatorie.";
    if (!status.trim()) newErrors.status = "Statusul este obligatoriu.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...newPayroll, [name]: value };
    if (name === "grossSalary") {
      updated = { ...updated, ...calculatePayroll(value) };
    }
    setNewPayroll(updated);
  };

  const handleAddPayroll = async () => {
    if (!validateForm()) return;
    const docRef = await addDoc(collection(db, "payrolls"), newPayroll);
    setPayrollList([...payrollList, { ...newPayroll, id: docRef.id }]);
    setShowAddModal(false);
    setNewPayroll(initialPayrollState());
  };

  const handleEdit = (item) => {
    setNewPayroll(item);
    setEditId(item.id);
    setShowEditModal(true);
  };

  const handleUpdatePayroll = async () => {
    if (!validateForm()) return;
    const ref = doc(db, "payrolls", editId);
    await updateDoc(ref, newPayroll);
    const updatedList = payrollList.map((item) =>
      item.id === editId ? { ...newPayroll, id: editId } : item
    );
    setPayrollList(updatedList);
    setShowEditModal(false);
    setNewPayroll(initialPayrollState());
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "payrolls", id));
    setPayrollList(payrollList.filter((item) => item.id !== id));
  };

  const filteredPayrolls = payrollList.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="payroll-page">
      <div className="payroll-header">
        <h1>Salarizare</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Caută angajat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            + Add Payroll Record
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <PayrollModal
          title="Add Payroll"
          data={newPayroll}
          errors={errors}
          handleChange={handleChange}
          onSave={handleAddPayroll}
          onCancel={() => {
            setShowAddModal(false);
            setNewPayroll(initialPayrollState());
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <PayrollModal
          title="Edit Payroll"
          data={newPayroll}
          errors={errors}
          handleChange={handleChange}
          onSave={handleUpdatePayroll}
          onCancel={() => {
            setShowEditModal(false);
            setNewPayroll(initialPayrollState());
          }}
        />
      )}

      {/* Tabel */}
      <div className="payroll-table-container">
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Brut</th>
              <th>CAS</th>
              <th>CASS</th>
              <th>Impozit</th>
              <th>Net</th>
              <th>Data</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
  {filteredPayrolls.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.grossSalary} lei</td>
      <td>{item.cas} lei</td>
      <td>{item.cass} lei</td>
      <td>{item.incomeTax} lei</td>
      <td>{item.netSalary} lei</td>
      <td>{item.date}</td>
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

// Componentă reutilizabilă pentru modal (Add/Edit)
const PayrollModal = ({ title, data, errors, handleChange, onSave, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>{title}</h2>
      <input type="text" name="name" placeholder="Nume" value={data.name} onChange={handleChange} />
      {errors.name && <p className="error-text">{errors.name}</p>}

      <input type="number" name="grossSalary" placeholder="Salariu brut" value={data.grossSalary} onChange={handleChange} />
      {errors.grossSalary && <p className="error-text">{errors.grossSalary}</p>}

      <input type="text" value={data.cas} placeholder="CAS (25%)" disabled />
      <input type="text" value={data.cass} placeholder="CASS (10%)" disabled />
      <input type="text" value={data.incomeTax} placeholder="Impozit" disabled />
      <input type="text" value={data.netSalary} placeholder="Net" disabled />

      <input type="date" name="date" value={data.date} onChange={handleChange} />
      {errors.date && <p className="error-text">{errors.date}</p>}

      <select name="status" value={data.status} onChange={handleChange}>
        <option value="">Selectează status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
      </select>
      {errors.status && <p className="error-text">{errors.status}</p>}

      <div className="modal-buttons">
        <button className="save-button" onClick={onSave}>Save</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

export default Payroll;
