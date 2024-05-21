// express.Router is a class to create modular mountable route handlers

const express = require("express");

const router = express.Router();

// const { home, register } = require("../controllers/auth-controller");
// ------OR USED THIS --------------
const authControllers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware");

const loginSchema = require("../validators/login-validators");
const loginValidate = require("../middlewares/login-validate");

/*
//instead of app now we will use router  

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

app.get("/register", (req, res) => {
  res.status(200).send("Hello from the register page of the server");
});

*/

// like this we can also write our code but its not a professional way.

// router.get("/", (req, res) => {
//   res.status(200).send("Hello from the server");
// });

// ------------OR-----------------
// We should use router like this because in this we can chain the other method also

// router.route("/").get(home);
router.route("/").get(authControllers.home);

// router.route("/register").get(register);
// router.route("/register").get(authControllers.register);

// router.route("/register").post(authControllers.register);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);

router.route("/login").post(loginValidate(loginSchema), authControllers.login);

router.route("/contact").post(authControllers.contactForm);


module.exports = router;
