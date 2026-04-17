const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: {},
        err: error.details
      });
    }

    req.validatedData = value;
    next();
  };
};

module.exports = validateRequest;
