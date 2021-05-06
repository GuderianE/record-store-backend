const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const env = require('../config/config');

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "http://localhost:5001/statics/avatar.jpg",
    },
    // purchased: [type: ] 
  },
  { versionKey: false, timestamps: true }
);

const SecretKey = env.jwt_key;
console.log("key", SecretKey);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt
    .sign({ _id: this._id.toString() }, SecretKey, { expiresIn: "3h" })
    .toString();
  return token;
};

UserSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password);
  }
});

UserSchema.statics.findByToken = function (token) {
  const User = this;
  // decode the cookie
  try {
    // if the token is valid then we get back whatever we signed the cookie with -> { _id: user._id.toString() }
    let decoded = jwt.verify(token, SecretKey);
    // find user by id
    return User.findOne({ _id: decoded._id });
  } catch (error) {
    return;
  }
};

const User = model("User", UserSchema);

module.exports = User;
