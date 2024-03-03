import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

// CREATE POST
// POST: api/posts
// PROTECTED
const createPost = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

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

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(404, "No post found");
  }

  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, "No post found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

const getPostsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    throw new ApiError(404, "No category found");
  }

  const posts = await Post.find({
    category: category.charAt(0).toUpperCase() + category.slice(1),
  }).sort({ createdAt: -1 });

  if (posts.length == 0) {
    throw new ApiError(404, "No posts found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Category posts fetched successfully"));
});

const getPostsByAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(401, "No author provided");
  }

  const posts = await Post.find({ createdBy: id });

  if (posts.length == 0) {
    throw new ApiError(404, "No posts found to this author");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Author posts fetched successfully"));
});

const editPost = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);
  const { ObjectId } = mongoose.Types;

  const creatorId = new ObjectId(post.createdBy).valueOf();

  if (!(creatorId == req.user._id)) {
    throw new ApiError(402, "You don't have permission to update this post");
  }

  if (!title && !description && !category) {
    throw new ApiError(402, "Please provide the required fields");
  }

  const updatedPost = {};

  if (title) updatedPost.title = title;
  if (description) updatedPost.description = description;
  if (category)
    updatedPost.category = category.charAt(0).toUpperCase() + category.slice(1);

  if (req.file?.path) {
    const thumbnailPath = req.file?.path;
    if (!thumbnailPath) {
      throw new ApiError(401, "Thumbnail path is not found`");
    }

    const thumbnailUrl = await uploadOnCloudinary(thumbnailPath, "posts");
    if (!thumbnailUrl || !thumbnailUrl.url) {
      throw new ApiError(
        501,
        "Something went wrong while updating the post thumnail"
      );
    }

    await deleteFromCloudinary(post?.thumbnail, "posts");

    updatedPost.thumbnail = thumbnailUrl.url;
  }

  const editedPost = await Post.findByIdAndUpdate(
    id,
    {
      $set: { ...updatedPost },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, editedPost, "Posts updated `successfully`"));
});

export {
  createPost,
  getPost,
  getPosts,
  getPostsByCategory,
  getPostsByAuthor,
  editPost,
};
