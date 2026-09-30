import Toi from "../models/Toi.js";
import Place from "../models/Place.js";

import {
  rescoreAllPlacesForToi,
  rescoreAllPlaces,
} from "../services/poiToiScorer.js";

export const listTois = async (req, res, next) => {
  try {
    const tois = await Toi.find({ active: true }).sort({ name: 1 });

    res.json(tois);
  } catch (err) {
    next(err);
  }
};

export const createToi = async (req, res, next) => {
  try {
    const {
      name,
      description,
      keywords,
      icon,
    } = req.body;

    const toi = await Toi.create({
      name,
      description,
      keywords,
      icon,
    });

    const result = await rescoreAllPlacesForToi(
      Place,
      toi
    );

    res.status(201).json({
      toi,
      rescored: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateToi = async (req, res, next) => {
  try {
    const toi = await Toi.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!toi) {
      return res.status(404).json({
        message: "TOI not found",
      });
    }

    const result = await rescoreAllPlacesForToi(
      Place,
      toi
    );

    res.json({
      toi,
      rescored: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deactivateToi = async (req, res, next) => {
  try {
    const toi = await Toi.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );

    if (!toi) {
      return res.status(404).json({
        message: "TOI not found",
      });
    }

    res.json(toi);
  } catch (err) {
    next(err);
  }
};

export const rescoreAll = async (req, res, next) => {
  try {
    const result = await rescoreAllPlaces(
      Place,
      Toi
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};