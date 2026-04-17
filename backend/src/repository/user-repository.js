const { User } = require('../models/index');
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email }).populate('role', 'name permissions');
      return user;
    } catch (error) {
      console.log('Error finding user by email:', error.message);
      throw error;
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id).select('+password').populate('role', 'name permissions');
      return user;
    } catch (error) {
      console.log('Error finding user by id:', error.message);
      throw error;
    }
  }

  async getAllUsers(filter = {}, skip = 0, limit = 10) {
    try {
      const users = await User.find(filter)
        .populate('role', 'name permissions')
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await User.countDocuments(filter);
      return { users, total };
    } catch (error) {
      console.log('Error getting all users:', error.message);
      throw error;
    }
  }

  async updateLastLogin(id) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { lastLogin: new Date() },
        { new: true }
      ).populate('role', 'name permissions');
      return user;
    } catch (error) {
      console.log('Error updating last login:', error.message);
      throw error;
    }
  }

  async deactivateUser(id) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { status: 'inactive' },
        { new: true }
      ).populate('role', 'name permissions');
      return user;
    } catch (error) {
      console.log('Error deactivating user:', error.message);
      throw error;
    }
  }

  async activateUser(id) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { status: 'active' },
        { new: true }
      ).populate('role', 'name permissions');
      return user;
    } catch (error) {
      console.log('Error activating user:', error.message);
      throw error;
    }
  }
}

module.exports = UserRepository;
