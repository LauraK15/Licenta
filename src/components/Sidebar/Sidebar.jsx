import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaBuilding, FaCalendarCheck, FaMoneyCheck, FaBriefcase, FaUserTie, FaUmbrellaBeach, FaCog, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">HRM</h2>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/employees">
            <FaUserFriends /> All Employees
          </Link>
        </li>
        <li>
          <Link to="/departments">
            <FaBuilding /> All Departments
          </Link>
        </li>
        <li>
          <Link to="/attendance">
            <FaCalendarCheck /> Attendance
          </Link>
        </li>
        <li>
          <Link to="/payroll">
            <FaMoneyCheck /> Payroll
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <FaBriefcase /> Jobs
          </Link>
        </li>
        <li>
          <Link to="/candidates">
            <FaUserTie /> Candidates
          </Link>
        </li>
        <li>
          <Link to="/leaves">
            <FaCalendarCheck /> Leaves
          </Link>
        </li>
        <li>
          <Link to="/holidays">
            <FaUmbrellaBeach /> Holidays
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
