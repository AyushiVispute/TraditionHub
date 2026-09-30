import express from "express";
import { generatePlanner } from "../controllers/plannerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  generatePlanner
);

export default router;