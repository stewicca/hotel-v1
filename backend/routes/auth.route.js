import express from "express";
import { login, me, logout } from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", verifyUser, me);
router.delete("/logout", verifyUser, logout);

export default router;
