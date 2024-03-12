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
} from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

router.route("/").get(getAuthors);

// secured route
router.route("/get-user/:id").get(getUser);
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/change-avatar")
  .post(verifyJWT, upload.single("avatar"), changeUserAvatar);
router.route("/update-user").patch(verifyJWT, updateUserDetails);
router.route("/update-password").patch(verifyJWT, updateCurrentPassword);

export default router;
