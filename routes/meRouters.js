const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");
const { authUser } = require("../controllers/userControllers");

// route base path: /me

//router.route("/orders").get(auth, getUserOrders);
router.route("/auth").post(auth, authUser);

module.exports = router;
