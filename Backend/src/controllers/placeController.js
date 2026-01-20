import Place from "../models/Place.js";


// GET /api/places
export const getAllPlaces = async (req, res) => {
  const { state, deity, search } = req.query;

  let filter = {};

  if (state) filter.state = state;
  if (deity) filter.deity = deity;
  if (search)
    filter.title = { $regex: search, $options: "i" };

  const places = await Place.find(filter);
  res.json(places);
};

// POST /api/places
export const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/places/:id
export const getPlaceById = async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return res.status(404).json({ message: "Place not found" });
  }

  res.json(place);
};
export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}