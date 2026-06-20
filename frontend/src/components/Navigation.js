import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ onLogout, userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          📊 Regulatory Dashboard
        </Link>
        <div className="nav-menu">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/upgrade" className="nav-link">
            Upgrade Plan
          </Link>
          {userRole === 'admin' && (
            <Link to="/admin" className="nav-link admin-link">
              Admin Panel
            </Link>
          )}
          <button className="nav-button btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
