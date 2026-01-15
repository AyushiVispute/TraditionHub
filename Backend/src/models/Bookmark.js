import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    deviceId: {
      type: String, // temporary (before auth)
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bookmark", bookmarkSchema);
