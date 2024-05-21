const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure the password with the bcrypt
UserSchema.pre("save", async function (next) {
  // console.log(this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    // const saltRound = 10;
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// compare two password
UserSchema.methods.comparePassword = async function(password){
return bcrypt.compare(password,this.password)
}

// json web token
UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.SECRET_KEY,
      {
      expiresIn:"30d"

      }
    );
  } catch (error) {
    console.log(error);
  }
};

// defining the model
const User = new mongoose.model("User", UserSchema);
// mongoose.model("CollectionName",collectionSchema)
// now do exporting of model
module.exports = User;
