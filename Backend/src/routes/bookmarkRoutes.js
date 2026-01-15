import express from "express";
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.post("/", addBookmark);
router.get("/:deviceId", getBookmarks);
router.delete("/:id", removeBookmark);

export default router;
