const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authmiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "unauthorized HTTP token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log(`token from authorized middleware ${jwtToken}`);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
    console.log(isVerified);
    // isverified will return the data the way you sign the document
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(userData);
    // all the user data will be inside variable userdata;


    // here we are creating custom properties in request object
    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized invalid token" });
  }
};

module.exports = authmiddleware;
