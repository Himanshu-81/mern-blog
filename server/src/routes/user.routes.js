import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  changeUserAvatar,
  updateUserDetails,
  getAuthors,
  logoutUser,
} from "../controllers/userControllers.js";
import { upload } from "../middleware/multerMiddleware.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

router.route("/:id").get(getUser);
router.route("/").get(getAuthors);
router.route("edit-user").patch(updateUserDetails);

// secured route
router
  .route("/change-avatar")
  .post(verifyJWT, upload.single("avatar"), changeUserAvatar);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
