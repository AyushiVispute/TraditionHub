import Place from "../models/Place.js";
import User from "../models/User.js";
import { rankPlaces } from "../services/userProfileMatchmaker.js";
import { computeItinerary } from "../services/plannerClient.js";

export const generatePlanner = async (req, res, next) => {
  try {
    const {
      depot,
      days = 1,
      maxDailyMinutes = 480,
      maxVisitMinutes = 180,
      mustInclude = [],
      mustExclude = [],
      transportMean = "car",
      numAlternatives = 3,
    } = req.body;

    if (
      !depot ||
      typeof depot.lat !== "number" ||
      typeof depot.lng !== "number"
    ) {
      return res.status(400).json({
        message: "depot { lat, lng } is required",
      });
    }

    const user = await User.findById(req.user.id).select("toiPreferences");

    const prefs = user?.toiPreferences;

    const prefsObj =
      prefs instanceof Map
        ? Object.fromEntries(prefs)
        : prefs || {};

    if (Object.keys(prefsObj).length === 0) {
      return res.status(400).json({
        message:
          "Set your topic preferences first before generating an itinerary.",
      });
    }

    const places = await Place.find({});

    const ranked = rankPlaces(places, prefsObj);

    const result = await computeItinerary({
      depot,
      rankedPlaces: ranked,
      days,
      maxDailyMinutes,
      maxVisitMinutes,
      mustInclude,
      mustExclude,
      transportMean,
      numAlternatives,
    });

    return res.json(result);
  } catch (err) {
    console.error("Planner error:", err);

    if (
      err.code === "ECONNREFUSED" ||
      err.cause?.code === "ECONNREFUSED"
    ) {
      return res.status(503).json({
        message: "Optimizer service is unavailable. Is it running?",
      });
    }

    next(err);
  }
};