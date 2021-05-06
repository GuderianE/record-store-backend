const express = require("express");
const loginRouters = express.Router();

const { checkUser } = require("../controllers/loginControllers");

loginRouters.route("/").post(checkUser);

module.exports = loginRouters;
