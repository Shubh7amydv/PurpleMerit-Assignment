const AuthService = require('../services/auth-service');
const { UserRepository } = require('../repository/index');

const authService = new AuthService();
const userRepository = new UserRepository();

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization header was sent with the request',
        data: {},
        err: {}
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided in authorization header',
        data: {},
        err: {}
      });
    }

    const decodedToken = authService.verifyAccessToken(token);

    const user = await userRepository.get(decodedToken.id);

    if (!user || user.status === 'inactive') {
      return res.status(401).json({
        success: false,
        message: 'User not found or is inactive',
        data: {},
        err: {}
      });
    }

    req.user = decodedToken;
    req.userId = decodedToken.id;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      data: {},
      err: error.message
    });
  }
};

module.exports = authenticate;
