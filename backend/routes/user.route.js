import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUser, adminOnly } from "../middlewares/auth.middleware.js";
import { uploadUser } from "../middlewares/image.middleware.js";

const router = express.Router();

router.get("/user", verifyUser, getUsers);
router.get("/user/:id", verifyUser, adminOnly, getUserById);
router.post(
  "/user",
  // verifyUser,
  // adminOnly,
  uploadUser.single("image"),
  createUser
);
router.put(
  "/user/:id",
  verifyUser,
  adminOnly,
  uploadUser.single("image"),
  updateUser
);
router.delete("/user/:id", verifyUser, adminOnly, deleteUser);

export default router;
