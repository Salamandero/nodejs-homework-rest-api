const validation = (schema, msg) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      if (msg) error.message = msg;
      next(error);
    }
    next();
  };
};

module.exports = validation;
