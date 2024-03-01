import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  changeUserAvatar,
  updateUserDetails,
  updateCurrentPassword,
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

// secured route
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/change-avatar")
  .post(verifyJWT, upload.single("avatar"), changeUserAvatar);
router.route("/update-user").patch(verifyJWT, updateUserDetails);
router.route("/update-password").patch(verifyJWT, updateCurrentPassword);

export default router;
