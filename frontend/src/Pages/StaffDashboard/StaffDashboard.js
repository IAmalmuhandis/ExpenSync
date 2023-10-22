// Dashboard.js
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './staffDashboard.css'; // Import your CSS file

function StaffDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform the logout action (e.g., clear authentication)
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Staff Dashboard</h2>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="add-expenses">Add Expense</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet /> {/* This is where nested route components will be rendered */}
      </div>
    </div>
  );
}

export default StaffDashboard;
