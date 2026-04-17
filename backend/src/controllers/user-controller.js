const UserService = require('../services/user-service');

const userService = new UserService();

const createUser = async (req, res) => {
  try {
    const { name, email, password, roleId, status } = req.body;

    const user = await userService.createUser(
      { name, email, password, roleId, status },
      req.userId
    );

    return res.status(201).json({
      data: user,
      success: true,
      message: 'User created successfully',
      err: {}
    });
  } catch (error) {
    console.log('Create user controller error:', error.message);
    return res.status(400).json({
      data: {},
      success: false,
      message: error.message,
      err: error
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        data: {},
        success: false,
        message: 'User not found',
        err: {}
      });
    }

    return res.status(200).json({
      data: user,
      success: true,
      message: 'User fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log('Get user controller error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to fetch user',
      err: error
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = {};

    if (req.query.role) filter.role = req.query.role;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const result = await userService.getAllUsers(filter, page, limit);

    return res.status(200).json({
      data: result,
      success: true,
      message: 'Users fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log('Get all users controller error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to fetch users',
      err: error
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, roleId, status } = req.body;

    const user = await userService.updateUser(
      id,
      { name, email, password, roleId, status },
      req.userId
    );

    if (!user) {
      return res.status(404).json({
        data: {},
        success: false,
        message: 'User not found',
        err: {}
      });
    }

    return res.status(200).json({
      data: user,
      success: true,
      message: 'User updated successfully',
      err: {}
    });
  } catch (error) {
    console.log('Update user controller error:', error.message);
    return res.status(400).json({
      data: {},
      success: false,
      message: error.message,
      err: error
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userService.deleteUser(id);

    return res.status(200).json({
      data: {},
      success: true,
      message: 'User deleted successfully',
      err: {}
    });
  } catch (error) {
    console.log('Delete user controller error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to delete user',
      err: error
    });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.deactivateUser(id, req.userId);

    if (!user) {
      return res.status(404).json({
        data: {},
        success: false,
        message: 'User not found',
        err: {}
      });
    }

    return res.status(200).json({
      data: user,
      success: true,
      message: 'User deactivated successfully',
      err: {}
    });
  } catch (error) {
    console.log('Deactivate user controller error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to deactivate user',
      err: error
    });
  }
};

const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.activateUser(id, req.userId);

    if (!user) {
      return res.status(404).json({
        data: {},
        success: false,
        message: 'User not found',
        err: {}
      });
    }

    return res.status(200).json({
      data: user,
      success: true,
      message: 'User activated successfully',
      err: {}
    });
  } catch (error) {
    console.log('Activate user controller error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to activate user',
      err: error
    });
  }
};

const updateOwnProfile = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await userService.updateOwnProfile(req.userId, { name, password });

    return res.status(200).json({
      data: user,
      success: true,
      message: 'Profile updated successfully',
      err: {}
    });
  } catch (error) {
    console.log('Update profile controller error:', error.message);
    return res.status(400).json({
      data: {},
      success: false,
      message: error.message,
      err: error
    });
  }
};

const getOwnProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId);

    return res.status(200).json({
      data: user,
      success: true,
      message: 'Profile fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log('Get profile controller error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to fetch profile',
      err: error
    });
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser,
  updateOwnProfile,
  getOwnProfile
};
