import express from "express";

import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getAdminStats,
} from "../controllers/placeController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// 📊 Admin stats
// Keep this ABOVE /:id
router.get("/admin/stats", adminAuth, getAdminStats);

// 🔓 Public Routes
router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);

// 🔒 Admin CRUD Routes
router.post("/", adminAuth, createPlace);
router.put("/:id", adminAuth, updatePlace);
router.delete("/:id", adminAuth, deletePlace);

export default router;