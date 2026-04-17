import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserAPI from '../utils/userAPI';
import '../styles/users.css';

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: ''
  });

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, [page, filters]);

  const loadUsers = async () => {
    try {
      setError('');
      const response = await UserAPI.getAllUsers(page, 10, filters);
      setUsers(response.users);
      setTotalPages(response.pages);
    } catch (error) {
      setError('Failed to load users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const data = await UserAPI.getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to load roles:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1);
  };

  const handleDeactivate = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await UserAPI.deactivateUser(userId);
        loadUsers();
      } catch (error) {
        alert('Failed to deactivate user');
      }
    }
  };

  const handleActivate = async (userId) => {
    if (window.confirm('Are you sure you want to activate this user?')) {
      try {
        await UserAPI.activateUser(userId);
        loadUsers();
      } catch (error) {
        alert('Failed to activate user');
      }
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      try {
        await UserAPI.deleteUser(userId);
        loadUsers();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        {user?.isAdmin && (
          <Link to="/users/new" className="btn-primary">+ Add New User</Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Roles</option>
          {roles.map(role => (
            <option key={role._id} value={role._id}>{role.name}</option>
          ))}
        </select>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role?.name || 'N/A'}</td>
                <td>
                  <span className={`status ${u.status}`}>
                    {u.status}
                  </span>
                </td>
                <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</td>
                <td className="actions">
                  <Link to={`/users/${u._id}`} className="btn-small btn-info">View</Link>
                  {user?.isAdmin && (
                    <>
                      <Link to={`/users/${u._id}/edit`} className="btn-small btn-warning">Edit</Link>
                      {u.status === 'active' ? (
                        <button onClick={() => handleDeactivate(u._id)} className="btn-small btn-danger">
                          Deactivate
                        </button>
                      ) : (
                        <button onClick={() => handleActivate(u._id)} className="btn-small btn-success">
                          Activate
                        </button>
                      )}
                      <button onClick={() => handleDelete(u._id)} className="btn-small btn-delete">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn-pagination"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="btn-pagination"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
