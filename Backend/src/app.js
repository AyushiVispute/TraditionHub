import express from "express";
import cors from "cors";

import placeRoutes from "./routes/placeRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";
import aiGuideRoutes from "./routes/aiGuideRoutes.js";
import toiRoutes from "./routes/toiRoutes.js";
import preferencesRoutes from "./routes/preferencesRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/guide", aiGuideRoutes);
app.use("/api/tois", toiRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/guides", guideRoutes);

export default app;