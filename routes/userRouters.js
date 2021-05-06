const express = require("express");
const userRouters = express.Router();
const {
  getUsers,
  addUser,
  getUser,
  updateUserInformation,
  updateUserAvatar,
} = require("../controllers/userControllers");
const {
  userValidationRules,
  userValidationErrorHandling,
} = require("../middleware/validation");

const {
  addRecord,
  getPreOrders,
  // deleteAllRecords,
} = require("../controllers/orderControllers");

userRouters
  .route("/")
  .get(getUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);
userRouters
  .route("/:id")
  .get(getUser)
  .put(updateUserAvatar)
  .put(updateUserInformation);

userRouters.route("/:userID/orders").post(addRecord).get(getPreOrders);
// userRouters.route("/delete").delete(deleteAllRecords);

module.exports = userRouters;
