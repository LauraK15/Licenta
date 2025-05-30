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
            <FaUserFriends /> Angajați
          </Link>
        </li>
        <li>
          <Link to="/departments">
            <FaBuilding /> Departamente
          </Link>
        </li>
        <li>
          <Link to="/attendance">
            <FaCalendarCheck /> Prezența
          </Link>
        </li>
        <li>
          <Link to="/payroll">
            <FaMoneyCheck /> Salarizare
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <FaBriefcase /> Joburi
          </Link>
        </li>
        <li>
          <Link to="/candidates">
            <FaUserTie /> Candidați
          </Link>
        </li>
        <li>
          <Link to="/leaves">
            <FaCalendarCheck /> Concedii
          </Link>
        </li>
        <li>
          <Link to="/holidays">
            <FaUmbrellaBeach /> Holidays
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Setări
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
