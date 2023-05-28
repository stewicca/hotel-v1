import express from "express";
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import { verifyUser, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/room", verifyUser, adminOnly, getRooms);
router.get("/room/:id", verifyUser, adminOnly, getRoomById);
router.post("/room", verifyUser, adminOnly, createRoom);
router.put("/room/:id", verifyUser, adminOnly, updateRoom);
router.delete("/room/:id", verifyUser, adminOnly, deleteRoom);

export default router;
