import api from '../utils/api';

const UserAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch('/users/profile', data);
    return response.data.data;
  },

  getAllUsers: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters
    });
    const response = await api.get(`/users?${params}`);
    return response.data.data;
  },

  getUser: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  },

  createUser: async (data) => {
    const response = await api.post('/users', data);
    return response.data.data;
  },

  updateUser: async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data.data;
  },

  deactivateUser: async (userId) => {
    const response = await api.patch(`/users/${userId}/deactivate`);
    return response.data.data;
  },

  activateUser: async (userId) => {
    const response = await api.patch(`/users/${userId}/activate`);
    return response.data.data;
  },

  getRoles: async () => {
    const response = await api.get('/roles');
    return response.data.data;
  }
};

export default UserAPI;
