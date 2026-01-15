import express from "express";
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  deletePlace,
} from "../controllers/placeController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// 🔓 Public routes
router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);

// 🔒 Admin-only routes
router.post("/", adminAuth, createPlace);
router.delete("/:id", adminAuth, deletePlace);

export default router;
