const bcrypt = require("bcryptjs");

const User = require("../models/user-model");
const Contact = require("../models/contact-model");


const home = async (req, res) => {
  try {
    res.status(200).send("HELLO HOME");
  } catch (error) {
    console.log(error);
  }
};

// const register = async (req, res) => {
//   try {
//     console.log(req.body);
//     // res.status(200).send("HELLO REGISTER");
//     res.status(200).json(req.body);
//   } catch (error) {
//     res.status(404).send("Page not found");
//   }
// };

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json("email already exist");
    }
    // hash the password
    /*
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    */
    // here we are hashing the password using bcryptjs library
    // here we are converting the password into hash by using bycrypt.hash(password,saltRPound)

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
      // password: hash_password,
    });

    // we will not send usercreated information to the user it should be only inserted in the database
    // json token should not be inserted in the database because it is used for authentication and authorization
    // so it should be stored on local storageor session storage
    res.status(201).json({
      //  userCreated,
      msg: "registration successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(404).send("Page not found");
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // email validation if email exist on our database or not first check it
    const userExist = await User.findOne({ email });
    if (!userExist) return res.status(400).json({ msg: "Invalid credentials" });
    // compare the password
    // const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        msg: "login successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else res.status(401).json("Invalid email or password");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: " message send successfully" });
  } catch (error) {
    return res.status(500).json({ message: " message not delivered" });
  }
};

module.exports = { home, register, login, contactForm };

// get registration data : retrieve user data (username,password,email)
// check email existence: if email is already registered
// hash password : Securely hash the password
// create a new user with a hashed password
// save to database: save user data to the database
// Respond ? respond with registration successfully or handle errors
