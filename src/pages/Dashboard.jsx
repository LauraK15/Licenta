import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot
} from "firebase/firestore";
import { db } from "../helper/firebaseConfig";
import { FaUserFriends, FaUserTie, FaBriefcase, FaUmbrellaBeach, FaCarSide } from 'react-icons/fa';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import "../styles/Dashboard.css";

const COLORS = ["#28a745", "#dc3545", "#ffc107", "#007bff"];

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [tripCount, setTripCount] = useState(0);
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const emp = await getDocs(collection(db, "employees"));
      const cand = await getDocs(collection(db, "candidates"));
      const leaves = await getDocs(collection(db, "leaves"));
      setEmployeeCount(emp.size);
      setCandidateCount(cand.size);
      setLeaveCount(leaves.size);
    };

    const fetchAttendanceStats = async () => {
      const snapshot = await getDocs(collection(db, "attendance"));
      const types = {
        prezent: 0,
        absentNemotivat: 0,
        absentMotivat: 0,
        ziLibera: 0,
      };

      const monthsMap = {};

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        for (let key in types) {
          if (data[key]) {
            types[key] += data[key].length;

            data[key].forEach(dateStr => {
              const month = dateStr.slice(0, 7);
              if (!monthsMap[month]) monthsMap[month] = 0;
              if (key === "prezent") monthsMap[month]++;
            });
          }
        }
      });

      setAttendanceStats([
        { name: "Prezent", value: types.prezent },
        { name: "Absent nemotivat", value: types.absentNemotivat },
        { name: "Absent motivat", value: types.absentMotivat },
        { name: "Zi liberă", value: types.ziLibera },
      ]);

      const chartData = Object.entries(monthsMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, count]) => ({ month, employees: count }));
      setLineChartData(chartData);
    };

    const unsubscribeJobs = onSnapshot(collection(db, "jobs"), (snapshot) => {
      const activeJobs = snapshot.docs.filter(doc => doc.data().status === "Open");
      setJobCount(activeJobs.length);
    });

    const unsubscribeTrips = onSnapshot(collection(db, "deplasari"), (snapshot) => {
      setTripCount(snapshot.size);
    });

    fetchCounts();
    fetchAttendanceStats();

    return () => {
      unsubscribeJobs();
      unsubscribeTrips();
    };
  }, []);

  const totalDays = attendanceStats.reduce((acc, cur) => acc + cur.value, 0);

  const employeeStats = [
    { icon: <FaUserFriends className="stat-icon" />, title: "Angajați", number: employeeCount },
    { icon: <FaUserTie className="stat-icon" />, title: "Candidați", number: candidateCount },
    { icon: <FaBriefcase className="stat-icon" />, title: "Joburi active", number: jobCount },
    { icon: <FaUmbrellaBeach className="stat-icon" />, title: "Concedii", number: leaveCount },
    { icon: <FaCarSide className="stat-icon" />, title: "Deplasări", number: tripCount },
  ];

  return (
    <div className="dashboard">
      <div className="welcome-banner card">
        <h2>👋 Bine ai revenit <span className="username"></span>!</h2>
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
        <h2 className="card-title">Evoluția prezenței</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
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
