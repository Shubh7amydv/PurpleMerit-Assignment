const { UserRepository, RoleRepository } = require('../repository/index');
const AuthService = require('./auth-service');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.roleRepository = new RoleRepository();
    this.authService = new AuthService();
  }

  async register(userData) {
    try {
      const { name, email, password } = userData;

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Get User role
      const userRole = await this.roleRepository.getByName('User');
      if (!userRole) {
        throw new Error('User role not found');
      }

      // Create new user
      const user = await this.userRepository.create({
        name,
        email,
        password,
        role: userRole._id,
        isAdmin: false
      });

      return user;
    } catch (error) {
      console.log('Error in register service:', error.message);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await this.userRepository.findById(await this.getUserIdByEmail(email));

      if (!user) {
        throw new Error('Invalid email or password');
      }

      if (user.status === 'inactive') {
        throw new Error('User account is inactive');
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      await this.userRepository.updateLastLogin(user._id);

      const userForToken = await this.userRepository.get(user._id);
      const accessToken = this.authService.generateAccessToken(userForToken);
      const refreshToken = this.authService.generateRefreshToken(userForToken);

      return {
        accessToken,
        refreshToken,
        user: userForToken
      };
    } catch (error) {
      console.log('Error in login service:', error.message);
      throw error;
    }
  }

  async getUserIdByEmail(email) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user ? user._id : null;
    } catch (error) {
      console.log('Error getting user id by email:', error.message);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.userRepository.get(userId);
      return user;
    } catch (error) {
      console.log('Error getting user by id:', error.message);
      throw error;
    }
  }

  async createUser(userData, createdBy) {
    try {
      const { name, email, password, roleId, status } = userData;

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Get role
      const role = await this.roleRepository.getById(roleId);
      if (!role) {
        throw new Error('Role not found');
      }

      const user = await this.userRepository.create({
        name,
        email,
        password,
        role: roleId,
        status: status || 'active',
        isAdmin: role.name === 'ADMIN',
        createdBy
      });

      return user;
    } catch (error) {
      console.log('Error creating user:', error.message);
      throw error;
    }
  }

  async updateUser(userId, userData, updatedBy) {
    try {
      const { name, email, password, roleId, status } = userData;
      const updateData = { updatedBy };

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (roleId) {
        const role = await this.roleRepository.getById(roleId);
        if (!role) {
          throw new Error('Role not found');
        }
        updateData.role = roleId;
        updateData.isAdmin = role.name === 'ADMIN';
      }
      if (status) updateData.status = status;

      const user = await this.userRepository.update(userId, updateData);
      return user;
    } catch (error) {
      console.log('Error updating user:', error.message);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await this.userRepository.destroy(userId);
      return true;
    } catch (error) {
      console.log('Error deleting user:', error.message);
      throw error;
    }
  }

  async getAllUsers(filter = {}, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const { users, total } = await this.userRepository.getAllUsers(filter, skip, limit);

      return {
        users,
        total,
        page,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.log('Error getting all users:', error.message);
      throw error;
    }
  }

  async deactivateUser(userId, updatedBy) {
    try {
      const updateData = { status: 'inactive', updatedBy };
      const user = await this.userRepository.update(userId, updateData);
      return user;
    } catch (error) {
      console.log('Error deactivating user:', error.message);
      throw error;
    }
  }

  async activateUser(userId, updatedBy) {
    try {
      const updateData = { status: 'active', updatedBy };
      const user = await this.userRepository.update(userId, updateData);
      return user;
    } catch (error) {
      console.log('Error activating user:', error.message);
      throw error;
    }
  }

  async updateOwnProfile(userId, userData) {
    try {
      const { name, password } = userData;
      const updateData = {};

      if (name) updateData.name = name;
      if (password) updateData.password = password;

      const user = await this.userRepository.update(userId, updateData);
      return user;
    } catch (error) {
      console.log('Error updating profile:', error.message);
      throw error;
    }
  }
}

module.exports = UserService;
