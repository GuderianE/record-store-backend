const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.checkUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      let error = new Error(`Entered incorrect email`);
      error.status = 200;
      return next(error);
    }

    const pwCompareResult = bcryptjs.compareSync(password, user.password);
    if (!pwCompareResult) {
      let error = new Error("Wrong password");
      error.status = 401;
      return next(error);
    }

    console.log("user", user);
    const token = user.generateAuthToken();

    console.log("token", token);

    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
        sameSite: process.env.NODE_ENV == "production" ? "None" : "lax",
        secure: process.env.NODE_ENV == "production" ? true : false, //http on localhost, https on production
        httpOnly: true,
      })
      .json(user);
  } catch (err) {
    next(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token", {
    sameSite: process.env.NODE_ENV == "production" ? "None" : "lax",
    secure: process.env.NODE_ENV == "production" ? true : false, //http on localhost, https on production
    httpOnly: true,
  }); // clear the cookie in the browser
  res.json({ message: "Logged you out successfully" });
};
