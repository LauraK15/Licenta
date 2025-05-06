import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './MainLayout.css';
import Sidebar from '../Sidebar/sidebar';
import Dashboard from '../../pages/Dashboard';
import Employees from '../../pages/Employees';
import Departments from '../../pages/Departments';
import Attendance from '../../pages/Attendance';
import Payroll from '../../pages/Payroll';
import Jobs from '../../pages/Jobs';
import Candidates from '../../pages/Candidates';
import Leaves from '../../pages/Leaves';
import Holidays from '../../pages/Holidays';
import Settings from '../../pages/Settings';


const MainLayout = () => {
  return (
    <div className="main-layout" style={{ display: 'flex', width: '100%' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path ="/departments" element={<Departments />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
