import express from "express";
import {
  getAvailableRoomByDate,
  getBookingByGuestName,
} from "../controllers/filtering.controller.js";

const router = express.Router();

router.post("/filtering", getAvailableRoomByDate);
router.get("/filtering", getBookingByGuestName);

export default router;
