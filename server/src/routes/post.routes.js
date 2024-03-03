import {
  createPost,
  getPost,
  getPosts,
  getPostsByCategory,
  getPostsByAuthor,
  editPost,
} from "../controllers/post.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/get-post/:id").get(getPost);
router.route("/").get(getPosts);
router.route("/:category").get(getPostsByCategory);
router.route("/author-posts/:id").get(getPostsByAuthor);

// secure route
router
  .route("/create-post")
  .post(verifyJWT, upload.single("thumbnail"), createPost);
router
  .route("/edit-posts/:id")
  .patch(verifyJWT, upload.single("thumbnail"), editPost);

export default router;
