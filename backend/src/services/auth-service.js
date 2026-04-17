const jwt = require('jsonwebtoken');
const config = require('../config/serverconfig');

class AuthService {
  generateAccessToken(user) {
    try {
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role._id,
        roleName: user.role.name,
        isAdmin: user.isAdmin
      };
      const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE
      });
      return token;
    } catch (error) {
      console.log('Error generating access token:', error.message);
      throw error;
    }
  }

  generateRefreshToken(user) {
    try {
      const payload = {
        id: user._id,
        email: user.email
      };
      const token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRE
      });
      return token;
    } catch (error) {
      console.log('Error generating refresh token:', error.message);
      throw error;
    }
  }

  verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.log('Error verifying access token:', error.message);
      throw error;
    }
  }

  verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      return decoded;
    } catch (error) {
      console.log('Error verifying refresh token:', error.message);
      throw error;
    }
  }
}

module.exports = AuthService;
