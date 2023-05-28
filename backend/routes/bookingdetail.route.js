import express from "express";
import { getBookingDetails } from "../controllers/bookingdetail.controller.js";

const router = express.Router();

router.get("/bookingdetail/:id", getBookingDetails);

export default router;
