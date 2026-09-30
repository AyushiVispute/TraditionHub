import express from "express";
import {
  getPreferences,
  setPreferences,
} from "../controllers/preferencesController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPreferences);
router.put("/", authMiddleware, setPreferences);

export default router;