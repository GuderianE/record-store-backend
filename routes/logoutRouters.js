const express = require("express");
const logoutRouters = express.Router();

const { logoutUser } = require("../controllers/loginControllers");

logoutRouters.route("/").get(logoutUser);

module.exports = logoutRouters;
