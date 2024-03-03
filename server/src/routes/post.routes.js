import { createPost } from "../controllers/post.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// secure route
router
  .route("/create-post")
  .post(verifyJWT, upload.single("thumbnail"), createPost);

export default router;
