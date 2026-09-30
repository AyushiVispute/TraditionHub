import User from "../models/User.js";

export const getPreferences = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('toiPreferences preferencesSetAt');
    res.json({
      toiPreferences: user.toiPreferences || {},
      preferencesSetAt: user.preferencesSetAt || null,
    });
  } catch (err) {
    next(err);
  }
};

export const setPreferences = async (req, res, next) => {
  try {
    const { toiPreferences } = req.body;
    if (!toiPreferences || typeof toiPreferences !== 'object') {
      return res.status(400).json({ message: 'toiPreferences object is required' });
    }
    for (const [slug, rating] of Object.entries(toiPreferences)) {
      const n = Number(rating);
      if (!Number.isFinite(n) || n < 1 || n > 10) {
        return res.status(400).json({ message: `Rating for "${slug}" must be a number between 1 and 10` });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { toiPreferences, preferencesSetAt: new Date() },
      { new: true }
    ).select('toiPreferences preferencesSetAt');

    res.json(user);
  } catch (err) {
    next(err);
  }
};