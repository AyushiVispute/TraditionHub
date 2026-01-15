import Bookmark from "../models/Bookmark.js";

// POST /api/bookmarks
export const addBookmark = async (req, res) => {
  const { placeId, deviceId } = req.body;

  const exists = await Bookmark.findOne({ placeId, deviceId });

  if (exists) {
    return res.status(400).json({ message: "Already bookmarked" });
  }

  const bookmark = await Bookmark.create({ placeId, deviceId });
  res.status(201).json(bookmark);
};

// GET /api/bookmarks/:deviceId
export const getBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.find({
    deviceId: req.params.deviceId,
  }).populate("placeId");

  res.json(bookmarks);
};

// DELETE /api/bookmarks/:id
export const removeBookmark = async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id);
  res.json({ message: "Bookmark removed" });
};
