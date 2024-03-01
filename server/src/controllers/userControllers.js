import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the accesstoken"
    );
  }
};

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

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload on cloudinary");
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    avatar: avatar.url,
  });

  const newUser = await User.findById(user._id).select("-password");

  if (!newUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

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

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Logout successfull"));
});

// TO GET THE USER PROFILE
// POST : api/users/:id
// PROTECTED ROUTE
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "No user found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

// UPDATE THE USER AVATAR
// GET : api/users/change-avatar
// PROTECTED
const changeUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const userBeforeUpdate = await User.findById(req.user?._id);

  if (!userBeforeUpdate) {
    throw new ApiError(404, "No user found");
  }

  const oldAvatarUrl = userBeforeUpdate?.avatar;
  if (!oldAvatarUrl) {
    throw new ApiError(404, "No avatar found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar on cloudinary");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { avatar: avatar.url },
    },
    { new: true }
  ).select("-password");

  await deleteFromCloudinary(oldAvatarUrl);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

// UPDATE THE USER DETAILS
// PATCH: api/users/edit-user
// PROTECTED
const updateUserDetails = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name && !email) {
    throw new ApiError(402, "Fields are missing");
  }

  const updateFields = {};

  if (name) updateFields.name = name;
  if (email) updateFields.email = email;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { ...updateFields },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User details updated"));
});

// UPDATE THE CURRENT PASSWORD
// PATCH : api/users/update-password
// PROTECTED
const updateCurrentPassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || !oldPassword) {
    throw new ApiError(402, "All fields are missing");
  }

  const user = await User.findById(req.user._id);

  const oldPasswordValidate = await user.isPasswordCorrect(oldPassword);

  if (!oldPasswordValidate) {
    throw new ApiError(401, "Old password do not match");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password is updated succesfully"));
});

// GET ALL USERS
// GET :api/users/
// UNPROTECTED
const getAuthors = asyncHandler(async (req, res) => {
  const authors = await User.find().select("-password");

  if (!authors) {
    throw new ApiError(500, "Internal server error while fetching the authors");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, authors, "Authors fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  changeUserAvatar,
  updateUserDetails,
  updateCurrentPassword,
  getAuthors,
};
