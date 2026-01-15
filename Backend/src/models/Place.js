import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    deity: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
    },
    category: {
      type: String,
      default: "Heritage",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
