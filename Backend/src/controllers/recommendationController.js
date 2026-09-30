import Place from "../models/Place.js";
import User from "../models/User.js";
import { rankPlaces } from "../services/userProfileMatchmaker.js";

export const getRecommendations = async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const user = await User.findById(req.user.id).select('toiPreferences');

    const prefs = user?.toiPreferences;
    const prefsObj = prefs instanceof Map ? Object.fromEntries(prefs) : prefs || {};
    if (Object.keys(prefsObj).length === 0) {
      return res.status(400).json({
        message: 'Set your topic preferences first (PUT /api/preferences) to get personalised recommendations.',
      });
    }

    const places = await Place.find({});
    const ranked = rankPlaces(places, prefs, { minSimilarity: 0 });

    res.json(ranked.slice(0, limit));
  } catch (err) {
    next(err);
  }
};