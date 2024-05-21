// await schema.parseAsync(req.body) is the line where you use zod to validate
// the request body date against the defined schema

// given any zod schema , you can call its .parse method to check data is valid
// if it is valid  a value is returned with full type information! other wise any error will be thrown

// first we created Schema
// then validating the schema using parseAsync method

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    // console.log(err.errors[0].message);
    const error_msg = err.errors[0].message;
    const error = {
      status,
      message: error_msg,
      extraDetails: "Fill the input properly",
    };
    // res.status(400).json({ msg: error_msg });
    // res.status(400).json({ msg: err });
    next(error);
  }
};

module.exports = validate;
