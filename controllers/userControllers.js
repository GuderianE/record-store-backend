const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const info = req.body;
  try {
    const user = await User.create(info);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  const { id } = req.params;
  const { avatar } = req.body;

  if (!avatar) {
    next();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        avatar: `http://localhost:5001/statics/${avatar}`,
      },
      { new: true }
    );
    res.json({ user: updatedUser });
    return;
  } catch (err) {
    next(err);
  }
};

exports.updateUserInformation = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, password } = req.body;

  if (!firstName || !lastName || !password) {
    res.json("You must have one of these");
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
      },
      { new: true }
    );
    res.json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.authUser = (req, res) => {
  //req.user
  res.json(req.user);
};
