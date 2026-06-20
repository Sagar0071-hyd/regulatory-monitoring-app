import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ onLogout, userRole, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/dashboard');
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
          {isAuthenticated && (
            <>
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
            </>
          )}
          {!isAuthenticated && (
            <Link to="/login" className="nav-button btn-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
