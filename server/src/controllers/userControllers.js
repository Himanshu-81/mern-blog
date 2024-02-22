import { asyncHandler } from "../utils/asynHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

// REGISTERING THE NEW USER IN THE DATABASE
// POST : api/users/register
// UNPROTECTED ROUTE
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(402, "Please provide all the details");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(401, "Email is already exists");
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
    password
  );

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    throw new ApiError(
      400,
      "Password must contain at least one uppercase, lowercase, number, and special character"
    );
  }

  if (password.trim().length < 6) {
    throw new ApiError(400, "Password should be greater than 6 characters");
  }

  if (password != confirmPassword) {
    throw new ApiError(402, "Password and confirm password do no match");
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  const newUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "User registered successfully"));
});

// LOGGING IN THE USER
// POST : api/users/login
// UNPROTECTED ROUTE
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(402, "Please fill all the fields");
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new ApiError(404, "No user found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

// TO GET THE USER PROFILE
// POST : api/users/:id
// PROTECTED ROUTE
const getUser = asyncHandler(async (req, res) => {});

// UPDATE THE USER AVATAR
// GET : api/users/change-avatar
// PROTECTED
const changeUserAvatar = asyncHandler(async (req, res) => {});

// UPDATE THE USER DETAILS
// PATCH: api/users/edit-user
// PROTECTED
const updateUserDetails = asyncHandler(async (req, res) => {});

// GET ALL USERS
// GET :api/users/
// UNPROTECTED
const getAuthors = asyncHandler(async (req, res) => {});

export {
  registerUser,
  loginUser,
  getUser,
  changeUserAvatar,
  updateUserDetails,
  getAuthors,
};
