import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAPI from '../utils/userAPI';
import '../styles/detail.css';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const data = await UserAPI.getUser(id);
      setUser(data);
    } catch (error) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="detail-container">
      <div className="detail-card">
        <h2>{user.name}</h2>
        
        <div className="detail-grid">
          <div className="detail-row">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Role:</span>
            <span className="value">{user.role?.name || 'N/A'}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`value status ${user.status}`}>{user.status}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Admin:</span>
            <span className="value">{user.isAdmin ? 'Yes' : 'No'}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Created At:</span>
            <span className="value">{new Date(user.createdAt).toLocaleString()}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Updated At:</span>
            <span className="value">{new Date(user.updatedAt).toLocaleString()}</span>
          </div>
          
          {user.createdBy && (
            <div className="detail-row">
              <span className="label">Created By:</span>
              <span className="value">{user.createdBy.name}</span>
            </div>
          )}
          
          {user.lastLogin && (
            <div className="detail-row">
              <span className="label">Last Login:</span>
              <span className="value">{new Date(user.lastLogin).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
