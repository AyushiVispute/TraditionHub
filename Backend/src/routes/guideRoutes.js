import express from "express";

import {
  getAllGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
  createGuideBooking,
} from "../controllers/guideController.js";
import {
  getMyGuideBookings,
} from "../controllers/guideBookingController.js";
import {
  getGuideBookingRequests,
  updateGuideBookingStatus,
} from "../controllers/guideBookingController.js";


import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all available guides
router.get("/", getAllGuides);

// Request / book a guide
router.post(
  "/:id/book",
  authMiddleware,
  createGuideBooking
);
router.get(
  "/bookings/my",
  authMiddleware,
  getMyGuideBookings
);
router.get(
  "/bookings/all",
  authMiddleware,
  getGuideBookingRequests
);

router.patch(
  "/bookings/:id/status",
  authMiddleware,
  updateGuideBookingStatus
);
// Get single guide
router.get("/:id", getGuideById);

// Create guide
router.post("/", createGuide);

// Update guide
router.put("/:id", updateGuide);

// Delete guide
router.delete("/:id", deleteGuide);


export default router;