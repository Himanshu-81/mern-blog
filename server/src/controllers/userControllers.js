import { asyncHandler } from "../utils/asynHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

// REGISTERING THE NEW USER IN THE DATABASE
// POST : api/users/register
// UNPROTECTED ROUTE
const registerUser = asyncHandler(async (req, res) => {});

// LOGGING IN THE USER
// POST : api/users/login
// UNPROTECTED ROUTE
const loginUser = asyncHandler(async (req, res) => {});

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
