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
    toiScores: {
  type: Map,
  of: Number,            // 0..1 relevance score, one entry per TOI slug
  default: {},
},
toiScoresUpdatedAt: { type: Date },

avgVisitMinutes: { type: Number, default: 45 },

coordinates: {
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
},
  },
  
  { timestamps: true }

  
);

export default mongoose.model("Place", placeSchema);
