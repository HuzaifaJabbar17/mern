const loginValidate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 200;
    const error_msg = err.errors[0].message;
    const error = {
      status,
      message: error_msg,
      extraDetails: "not login credentials",
    };
    next(error);
  }
};
module.exports = loginValidate;
