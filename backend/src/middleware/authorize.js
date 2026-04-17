const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
          data: {},
          err: {}
        });
      }

      const userRole = req.user.roleName;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to perform this action',
          data: {},
          err: {}
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Authorization failed',
        data: {},
        err: error.message
      });
    }
  };
};

module.exports = authorize;
