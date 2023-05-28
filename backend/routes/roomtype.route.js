import express from "express";
import {
  getRoomTypes,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deleteRoomType,
} from "../controllers/roomtype.controller.js";
import { verifyUser, adminOnly } from "../middlewares/auth.middleware.js";
import { uploadRoomType } from "../middlewares/image.middleware.js";

const router = express.Router();

router.get("/roomtype", getRoomTypes);
router.get("/roomtype/:id", getRoomTypeById);
router.post(
  "/roomtype",
  verifyUser,
  adminOnly,
  uploadRoomType.single("image"),
  createRoomType
);
router.put(
  "/roomtype/:id",
  verifyUser,
  adminOnly,
  uploadRoomType.single("image"),
  updateRoomType
);
router.delete("/roomtype/:id", verifyUser, adminOnly, deleteRoomType);

export default router;
