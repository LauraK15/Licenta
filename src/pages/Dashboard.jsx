import React from 'react';
import '../styles/Dashboard.css'; 
import { FaUserFriends, FaUserTie, FaBriefcase, FaUmbrellaBeach } from 'react-icons/fa';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const Dashboard = () => {
  const employeeStats = [
    { icon: <FaUserFriends className="stat-icon" />, title: "Angajați", number: 24 },
    { icon: <FaUserTie className="stat-icon" />, title: "Candidați", number: 8 },
    { icon: <FaBriefcase className="stat-icon" />, title: "Joburi active", number: 5 },
    { icon: <FaUmbrellaBeach className="stat-icon" />, title: "Concedii", number: 3 },
  ];

  const employeeGrowthData = [
    { month: "Ian", employees: 5 },
    { month: "Feb", employees: 10 },
    { month: "Mar", employees: 15 },
    { month: "Apr", employees: 24 },
  ];

  const attendanceStats = [
    { name: "Prezent", value: 18 },
    { name: "Absent", value: 3 },
    { name: "Zi liberă", value: 3 },
  ];

  const COLORS = ["#28a745", "#dc3545", "#007bff"];
  const totalDays = attendanceStats.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="dashboard">
      <div className="welcome-banner card">
        <h2>👋 Bine ai revenit, <span className="username">Laura</span>!</h2>
        <p>Sperăm că ai o zi productivă! 🧑‍💻</p>
      </div>

      <h1>Dashboard</h1>

      <div className="stats-grid">
        {employeeStats.map((stat, index) => (
          <div className="card" key={index}>
            <div className="stat-item">
              {stat.icon}
              <div className="stat-details">
                <span className="stat-title">{stat.title}</span>
                <span className="stat-number">{stat.number}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: "2rem" }}>
        <h2 className="card-title">Evoluția angajaților</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={employeeGrowthData}>
            <Line type="monotone" dataKey="employees" stroke="#4dabf7" strokeWidth={2} />
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card attendance-chart-section">
        <h2>Prezență generală</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={attendanceStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {attendanceStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#003366" }}>
          Total zile înregistrate: <strong>{totalDays}</strong>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
