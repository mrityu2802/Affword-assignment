import express from "express";
import {
  signUp,
  loginWithCredential,
  getAuthenticatedUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginWithCredential);
router.get("/check-auth", authMiddleware, getAuthenticatedUser);

export default router;
