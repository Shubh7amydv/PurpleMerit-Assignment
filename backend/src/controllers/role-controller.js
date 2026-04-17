const RoleService = require('../services/user-service');

const roleService = new RoleService();

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();

    return res.status(200).json({
      data: roles,
      success: true,
      message: 'Roles fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log('Get roles controller error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to fetch roles',
      err: error
    });
  }
};

module.exports = {
  getAllRoles
};
