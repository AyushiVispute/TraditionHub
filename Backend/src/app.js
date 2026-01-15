import express from "express";
import cors from "cors";
import placeRoutes from "./routes/placeRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/places", placeRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);


export default app;
