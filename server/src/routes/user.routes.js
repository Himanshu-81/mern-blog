import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  changeUserAvatar,
  updateUserDetails,
  getAuthors,
} from "../controllers/userControllers.js";

const router = Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// router.get("/:id", getUser);
// router.get("/", getAuthors);
// router.post("/change-avatar", changeUserAvatar);
// router.patch("/edit-user", updateUserDetails);

export default router;
