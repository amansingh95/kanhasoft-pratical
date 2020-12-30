import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// post user login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// regester user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, city } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user allready exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    city,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({error: 'error'});
    throw new Error("User not found");
  }
});


//get all user
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export {
  authUser,
  registerUser,
  getUsers,
};
