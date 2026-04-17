const { RoleRepository } = require('../repository/index');

class RoleService {
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async getAllRoles() {
    try {
      const roles = await this.roleRepository.getAll();
      return roles;
    } catch (error) {
      console.log('Error getting all roles:', error.message);
      throw error;
    }
  }

  async getRoleById(roleId) {
    try {
      const role = await this.roleRepository.getById(roleId);
      return role;
    } catch (error) {
      console.log('Error getting role by id:', error.message);
      throw error;
    }
  }

  async getRoleByName(roleName) {
    try {
      const role = await this.roleRepository.getByName(roleName);
      return role;
    } catch (error) {
      console.log('Error getting role by name:', error.message);
      throw error;
    }
  }

  async seedRoles() {
    try {
      const roles = await this.roleRepository.getAll();
      if (roles.length > 0) {
        console.log('Roles already exist');
        return;
      }

      const defaultRoles = [
        {
          name: 'ADMIN',
          permissions: [
            'users:create',
            'users:read',
            'users:update',
            'users:delete',
            'users:activate',
            'users:deactivate',
            'roles:read'
          ],
          description: 'Administrator with full access'
        },
        {
          name: 'MANAGER',
          permissions: [
            'users:read',
            'users:update',
            'users:activate',
            'users:deactivate',
            'roles:read'
          ],
          description: 'Manager with limited admin capabilities'
        },
        {
          name: 'USER',
          permissions: [
            'users:readOwn',
            'users:updateOwn',
            'roles:read'
          ],
          description: 'Regular user with basic access'
        }
      ];

      for (const roleData of defaultRoles) {
        await this.roleRepository.create(roleData);
      }

      console.log('Roles seeded successfully');
    } catch (error) {
      console.log('Error seeding roles:', error.message);
      throw error;
    }
  }
}

const UserService = require('./user-service');

module.exports = {
  RoleService,
  UserService
};
