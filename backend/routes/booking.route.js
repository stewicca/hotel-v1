import express from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";
import {
  verifyUser,
  receptionistOnly,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/booking", verifyUser, receptionistOnly, getBookings);
router.get("/booking/:id", verifyUser, receptionistOnly, getBookingById);
router.post("/booking", createBooking);
router.put("/booking/:id", verifyUser, receptionistOnly, updateBooking);
router.delete("/booking/:id", verifyUser, receptionistOnly, deleteBooking);

export default router;
