import React from 'react';
import '../styles/Dashboard.css'; 
import { FaUserFriends, FaUserTie, FaBriefcase, FaUmbrellaBeach } from 'react-icons/fa';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Dashboard = () => {
  // Statistici principale
  const employeeStats = [
    {
      icon: <FaUserFriends className="stat-icon" />,
      title: "Angajați",
      number: 24,
    },
    {
      icon: <FaUserTie className="stat-icon" />,
      title: "Candidați",
      number: 8,
    },
    {
      icon: <FaBriefcase className="stat-icon" />,
      title: "Joburi active",
      number: 5,
    },
    {
      icon: <FaUmbrellaBeach className="stat-icon" />,
      title: "Concedii",
      number: 3,
    },
  ];

  // Cereri recente de concediu
  const latestLeaves = [
    { name: "Ion Popescu", date: "2025-04-20" },
    { name: "Maria Ionescu", date: "2025-04-18" },
    { name: "Andrei Pavel", date: "2025-04-17" },
    { name: "Ana Georgescu", date: "2025-04-15" },
    { name: "Daniel Radu", date: "2025-04-14" },
  ];

  // Candidați recenți
  const recentCandidates = [
    { name: "George Matei", position: "Frontend Developer" },
    { name: "Laura Dumitru", position: "HR Specialist" },
    { name: "Mihai Dobre", position: "Accountant" },
    { name: "Alina Pop", position: "QA Tester" },
    { name: "Cristina Rusu", position: "Designer" },
  ];

  // Date pentru graficul LineChart
  const employeeGrowthData = [
    { month: "Ian", employees: 5 },
    { month: "Feb", employees: 10 },
    { month: "Mar", employees: 15 },
    { month: "Apr", employees: 24 },
  ];

  // Date pentru graficul Attendance (BarChart)
  const attendanceStats = [
    { status: "Present", count: 18 },
    { status: "Absent", count: 3 },
    { status: "Late", count: 2 },
  ];

  return (
    <div className="dashboard">
      {/* Banner de bun venit */}
      <div className="welcome-banner card">
        <h2>
          👋 Bine ai revenit, <span className="username">Laura</span>!
        </h2>
        <p>Sperăm că ai o zi productivă! 🧑‍💻</p>
      </div>

      {/* Titlu Dashboard */}
      <h1>Dashboard</h1>

      {/* Statistici principale */}
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

      {/* Secțiuni - cereri de concediu și candidați */}
      <div className="sections">
        <div className="card">
          <h2 className="card-title">Ultimele cereri de concediu</h2>
          <ul>
            {latestLeaves.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> – {item.date}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">Candidați recenți</h2>
          <ul>
            {recentCandidates.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> – {item.position}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grafic - Evoluția angajaților */}
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

      {/* Grafic - Attendance Overview */}
      <div className="card" style={{ marginTop: "2rem" }}>
        <h2 className="card-title">Attendance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceStats}>
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3399ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;