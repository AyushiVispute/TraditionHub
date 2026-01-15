import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  console.log("👉 Upload route hit");

  try {
    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No file received" });
    }

    console.log("✅ File received:", {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });

    console.log("👉 Uploading to Cloudinary...");

    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "traditionhub/test",
    });

    console.log("✅ Cloudinary success:", result.secure_url);

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("🔥 CLOUDINARY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
