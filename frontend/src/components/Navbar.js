import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          User Management System
        </Link>

        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>

          {(user?.role?.name === 'ADMIN' || user?.role?.name === 'MANAGER') && (
            <Link to="/users" className="nav-link">Users</Link>
          )}

          <Link to="/profile" className="nav-link">Profile</Link>

          <div className="navbar-user">
            <span className="user-info">
              {user.name} ({user?.role?.name || 'User'})
            </span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
