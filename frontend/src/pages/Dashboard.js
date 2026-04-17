import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const getDashboardContent = () => {
    if (user?.role?.name === 'ADMIN') {
      return (
        <div className="dashboard-content">
          <h2>Admin Dashboard</h2>
          <p>Welcome, {user.name}! You have full access to the system.</p>
          <p>You can manage all users and assign roles.</p>
          <ul className="features-list">
            <li>✓ View all users</li>
            <li>✓ Create new users</li>
            <li>✓ Edit user information</li>
            <li>✓ Delete users</li>
            <li>✓ Activate/Deactivate users</li>
            <li>✓ Assign and modify user roles</li>
          </ul>
        </div>
      );
    } else if (user?.role?.name === 'MANAGER') {
      return (
        <div className="dashboard-content">
          <h2>Manager Dashboard</h2>
          <p>Welcome, {user.name}! You have limited administrative access.</p>
          <p>You can view and manage non-admin users.</p>
          <ul className="features-list">
            <li>✓ View all users</li>
            <li>✓ Edit non-admin user information</li>
            <li>✓ Activate/Deactivate non-admin users</li>
            <li>✗ Cannot create new users</li>
            <li>✗ Cannot delete users</li>
            <li>✗ Cannot assign admin roles</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dashboard-content">
          <h2>User Dashboard</h2>
          <p>Welcome, {user.name}!</p>
          <p>You can only manage your own profile.</p>
          <ul className="features-list">
            <li>✓ View your profile</li>
            <li>✓ Update your name</li>
            <li>✓ Change your password</li>
            <li>✗ Cannot view other users</li>
            <li>✗ Cannot manage other users</li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="dashboard-container">
      {getDashboardContent()}
    </div>
  );
};

export default Dashboard;
