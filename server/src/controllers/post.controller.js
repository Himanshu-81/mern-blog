import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// CREATE POST
// POST: api/posts
// PROTECTED
const createPost = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  console.log(title, description, category);

  if (!title || !description || !category) {
    throw new ApiError(402, "Please fill all the fields");
  }

  const thumbnailPath = req.file?.path;

  if (!thumbnailPath) {
    throw new ApiError(403, "Thumbnail is required");
  }

  const post = await uploadOnCloudinary(thumbnailPath, "posts");

  if (!post) {
    throw new ApiError(
      500,
      "Something went wrong while uploading the post thumbnail"
    );
  }

  const createdPost = await Post.create({
    title,
    description,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    thumbnail: post.url,
    createdBy: req.user._id,
  });

  if (!createdPost) {
    throw new ApiError(501, "Something went wrong while creating the post");
  }

  const currentUser = await User.findById(req.user._id);
  const userPostsCount = currentUser.posts + 1;
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      posts: userPostsCount,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, createdPost, "Post created successfully"));
});

const getPost = asyncHandler(async (req, res) => {});

export { createPost, getPost };
