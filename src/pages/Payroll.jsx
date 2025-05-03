import React, { useState } from "react";
import "../styles/Payroll.css";

const Payroll = () => {
  const [payrollList, setPayrollList] = useState([
    { name: "Ion Popescu", grossSalary: "6000", cas: "1500", cass: "600", incomeTax: "390", netSalary: "3510", date: "2025-04-25", status: "Paid" },
    { name: "Maria Ionescu", grossSalary: "5000", cas: "1250", cass: "500", incomeTax: "325", netSalary: "2925", date: "2025-04-25", status: "Pending" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPayroll, setNewPayroll] = useState({
    name: "",
    grossSalary: "",
    cas: "",
    cass: "",
    incomeTax: "",
    netSalary: "",
    date: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Functia care calculeaza CAS, CASS, Impozit si Net
  const calculatePayroll = (grossSalary) => {
    const gross = parseFloat(grossSalary) || 0;
    const cas = (gross * 0.25).toFixed(2);
    const cass = (gross * 0.10).toFixed(2);
    const taxableBase = gross - cas - cass;
    const incomeTax = (taxableBase * 0.10).toFixed(2);
    const net = (gross - cas - cass - incomeTax).toFixed(2);

    return {
      cas,
      cass,
      incomeTax,
      netSalary: net,
    };
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
    let updatedPayroll = { ...newPayroll, [name]: value };

    if (name === "grossSalary") {
      const { cas, cass, incomeTax, netSalary } = calculatePayroll(value);
      updatedPayroll = { ...updatedPayroll, cas, cass, incomeTax, netSalary };
    }

    setNewPayroll(updatedPayroll);
  };

  const handleAddPayroll = () => {
    if (!validateForm()) return;

    setPayrollList([...payrollList, newPayroll]);
    setNewPayroll({ name: "", grossSalary: "", cas: "", cass: "", incomeTax: "", netSalary: "", date: "", status: "" });
    setErrors({});
    setShowAddModal(false);
  };

  const handleUpdatePayroll = () => {
    if (!validateForm()) return;

    const updatedList = [...payrollList];
    updatedList[editIndex] = newPayroll;
    setPayrollList(updatedList);
    setNewPayroll({ name: "", grossSalary: "", cas: "", cass: "", incomeTax: "", netSalary: "", date: "", status: "" });
    setErrors({});
    setShowEditModal(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...payrollList];
    updatedList.splice(index, 1);
    setPayrollList(updatedList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewPayroll(payrollList[index]);
    setErrors({});
    setShowEditModal(true);
  };

  return (
    <div className="payroll-page">
      <div className="payroll-header">
        <h1>Payroll</h1>
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

      {/* Modal Add Payroll */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Payroll</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume angajat"
              value={newPayroll.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="number"
              name="grossSalary"
              placeholder="Salariu brut (lei)"
              value={newPayroll.grossSalary}
              onChange={handleChange}
            />
            {errors.grossSalary && <p className="error-text">{errors.grossSalary}</p>}

            <input
              type="text"
              placeholder="CAS (25%)"
              value={newPayroll.cas}
              disabled
            />

            <input
              type="text"
              placeholder="CASS (10%)"
              value={newPayroll.cass}
              disabled
            />

            <input
              type="text"
              placeholder="Impozit pe venit (10%)"
              value={newPayroll.incomeTax}
              disabled
            />

            <input
              type="text"
              placeholder="Salariu net"
              value={newPayroll.netSalary}
              disabled
            />

            <input
              type="date"
              name="date"
              value={newPayroll.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <select name="status" value={newPayroll.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleAddPayroll}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Payroll */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Payroll</h2>
            <input
              type="text"
              name="name"
              placeholder="Nume angajat"
              value={newPayroll.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="number"
              name="grossSalary"
              placeholder="Salariu brut (lei)"
              value={newPayroll.grossSalary}
              onChange={handleChange}
            />
            {errors.grossSalary && <p className="error-text">{errors.grossSalary}</p>}

            <input
              type="text"
              placeholder="CAS (25%)"
              value={newPayroll.cas}
              disabled
            />

            <input
              type="text"
              placeholder="CASS (10%)"
              value={newPayroll.cass}
              disabled
            />

            <input
              type="text"
              placeholder="Impozit pe venit (10%)"
              value={newPayroll.incomeTax}
              disabled
            />

            <input
              type="text"
              placeholder="Salariu net"
              value={newPayroll.netSalary}
              disabled
            />

            <input
              type="date"
              name="date"
              value={newPayroll.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}

            <select name="status" value={newPayroll.status} onChange={handleChange}>
              <option value="">Selectează status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && <p className="error-text">{errors.status}</p>}

            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdatePayroll}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Payroll */}
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
              <th>Data plății</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {payrollList
              .filter((item) =>
                Object.values(item)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.grossSalary} lei</td>
                  <td>{item.cas} lei</td>
                  <td>{item.cass} lei</td>
                  <td>{item.incomeTax} lei</td>
                  <td>{item.netSalary} lei</td>
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

export default Payroll;
