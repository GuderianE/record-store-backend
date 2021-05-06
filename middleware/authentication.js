const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    // Grab the cookie/token from the request
    const token = req.cookies.token;
    console.log("this is the token", token);
    // Validate the cookie and look for the user with that _id
    const user = await User.findByToken(token); // ! this is the problem
    console.log("user for this tryout +>", user);

    // if the token is corrupted, then throw an error
    if (!user) {
      let error = new Error(`There is no current user!`);
      error.status = 200;
      throw error;
    }

    // if the token is valid
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
