import express from "express";

import {
  listTois,
  createToi,
  updateToi,
  deactivateToi,
  rescoreAll,
} from "../controllers/toiController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", listTois);

router.post("/admin", adminAuth, createToi);

router.put("/admin/:id", adminAuth, updateToi);

router.delete("/admin/:id", adminAuth, deactivateToi);

router.post("/admin/rescore-all", adminAuth, rescoreAll);

export default router;