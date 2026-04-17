const { Role } = require('../models/index');

class RoleRepository {
  async create(data) {
    try {
      const role = await Role.create(data);
      return role;
    } catch (error) {
      console.log('Error creating role:', error.message);
      throw error;
    }
  }

  async getAll() {
    try {
      const roles = await Role.find();
      return roles;
    } catch (error) {
      console.log('Error fetching roles:', error.message);
      throw error;
    }
  }

  async getByName(name) {
    try {
      const role = await Role.findOne({ name: name.toUpperCase() });
      return role;
    } catch (error) {
      console.log('Error fetching role by name:', error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const role = await Role.findById(id);
      return role;
    } catch (error) {
      console.log('Error fetching role by id:', error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const role = await Role.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      });
      return role;
    } catch (error) {
      console.log('Error updating role:', error.message);
      throw error;
    }
  }
}

module.exports = RoleRepository;
