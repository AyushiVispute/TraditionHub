import express from "express";
import { generateGuideResponse } from "../services/aiservice.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { place, question } = req.body;

    if (!place || !question?.trim()) {
      return res.status(400).json({
        answer: "Place and question are required.",
      });
    }

    const answer = await generateGuideResponse(
      place,
      question.trim()
    );

    return res.status(200).json({
      answer,
    });
  } catch (error) {
    console.error("AI Guide Error:", error);

    return res.status(500).json({
      answer: "Unable to generate a response.",
    });
  }
});

export default router;