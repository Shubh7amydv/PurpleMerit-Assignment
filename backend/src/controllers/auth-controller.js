const UserService = require('../services/user-service');

const userService = new UserService();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userService.register({ name, email, password });

    return res.status(201).json({
      data: user,
      success: true,
      message: 'User registered successfully',
      err: {}
    });
  } catch (error) {
    console.log('Register controller error:', error.message);
    return res.status(400).json({
      data: {},
      success: false,
      message: error.message,
      err: error
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await userService.login(email, password);

    return res.status(200).json({
      data: {
        accessToken,
        refreshToken,
        user
      },
      success: true,
      message: 'Login successful',
      err: {}
    });
  } catch (error) {
    console.log('Login controller error:', error.message);
    return res.status(401).json({
      data: {},
      success: false,
      message: error.message,
      err: error
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId);

    return res.status(200).json({
      data: user,
      success: true,
      message: 'User fetched successfully',
      err: {}
    });
  } catch (error) {
    console.log('Get current user error:', error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Failed to fetch user',
      err: error
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};
