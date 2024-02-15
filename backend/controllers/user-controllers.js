const User = require("../models/user");
const HttpError = require("../models/http-error");
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new Error(err.message);
    return next(error);
  }
  res.json({ users: users });
};
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let hasUser;

  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error(err.message);
    return next(error);
  }
  if (hasUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    password,
    image: req.file.path,
    places: [],
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new Error(err.message);
    return next(error);
  }
  res.json({ user: createdUser });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error(err.message);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Loggin in failed, please try again later.",
      500
    );
    return next(error);
  } else {
    if (existingUser.password === password) {
      res.json({
        message: "You are logged in",
        user: existingUser.toObject({ getters: true }),
      });
    } else {
      const error = new HttpError("Invalid password or Username");
      return next(error);
    }
  }
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
