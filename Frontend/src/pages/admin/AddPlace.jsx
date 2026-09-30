import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { uploadImage } from "@/services/uploadApi";
import { createPlace } from "@/services/placeApi";
import toast from "react-hot-toast";

const AddPlace = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    state: "",
    deity: "",
    description: "",
    location: "",
    category: "Temple",

    // Required for itinerary planning
    latitude: "",
    longitude: "",
    avgVisitMinutes: 60,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🖼 Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadImage(file);

      if (!data?.url) {
        throw new Error("Image URL was not returned");
      }

      setImageUrl(data.url);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to upload image"
      );
    } finally {
      setUploading(false);
    }
  };

  // 📝 Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💾 Save place
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image
    if (!imageUrl) {
      toast.error("Please upload an image first");
      return;
    }

    // Validate latitude
    const latitude = Number(form.latitude);

    if (
      !form.latitude ||
      Number.isNaN(latitude) ||
      latitude < -90 ||
      latitude > 90
    ) {
      toast.error("Please enter a valid latitude (-90 to 90)");
      return;
    }

    // Validate longitude
    const longitude = Number(form.longitude);

    if (
      !form.longitude ||
      Number.isNaN(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      toast.error("Please enter a valid longitude (-180 to 180)");
      return;
    }

    // Validate visit time
    const avgVisitMinutes = Number(form.avgVisitMinutes);

    if (
      !form.avgVisitMinutes ||
      Number.isNaN(avgVisitMinutes) ||
      avgVisitMinutes <= 0
    ) {
      toast.error("Please enter a valid visit duration");
      return;
    }

    try {
      setSaving(true);

      // Payload matching Backend Place schema
      const placeData = {
        title: form.title.trim(),
        state: form.state.trim(),
        deity: form.deity.trim(),
        description: form.description.trim(),
        location: form.location.trim(),
        category: form.category,

        // IMPORTANT:
        // Backend expects coordinates.lat / coordinates.lng
        coordinates: {
          lat: latitude,
          lng: longitude,
        },

        // Used by the itinerary optimizer
        avgVisitMinutes,

        // Backend expects images as an array
        images: [imageUrl],
      };

      console.log("Creating place:", placeData);

      await createPlace(placeData);

      toast.success("Place added successfully! ✅");

      // Redirect after successful creation
      navigate("/explore");
    } catch (error) {
      console.error("Save place error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to save place";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-ivory min-h-screen px-4 sm:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border shadow">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Add New Place
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Add cultural place information and location details
              for recommendations and trip planning.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ================= IMAGE ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Image *
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || saving}
                className="w-full border rounded px-3 py-2"
              />

              {uploading && (
                <p className="text-sm text-gray-500 mt-2">
                  Uploading image...
                </p>
              )}
            </div>

            {imageUrl && (
              <div>
                <p className="text-sm font-medium mb-2">
                  Image Preview
                </p>

                <img
                  src={imageUrl}
                  alt="Place preview"
                  className="w-full h-52 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* ================= TITLE ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Place Title *
              </label>

              <input
                name="title"
                placeholder="Example: Trimbakeshwar Temple"
                value={form.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
                disabled={saving}
              />
            </div>

            {/* ================= STATE ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                State *
              </label>

              <input
                name="state"
                placeholder="Example: Maharashtra"
                value={form.state}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
                disabled={saving}
              />
            </div>

            {/* ================= CATEGORY ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded bg-white"
                disabled={saving}
              >
                <option value="Temple">Temple</option>
                <option value="Historical">Historical</option>
                <option value="Museum">Museum</option>
                <option value="Fort">Fort</option>
                <option value="Heritage">Heritage</option>
                <option value="Nature">Nature</option>
                <option value="Beach">Beach</option>
                <option value="Cultural">Cultural</option>
                <option value="Religious">Religious</option>
                <option value="Food">Food</option>
                <option value="Craft">Craft</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* ================= DEITY ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Deity
              </label>

              <input
                name="deity"
                placeholder="Example: Lord Shiva"
                value={form.deity}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                disabled={saving}
              />
            </div>

            {/* ================= LOCATION ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Location
              </label>

              <input
                name="location"
                placeholder="Example: Trimbak, Nashik"
                value={form.location}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                disabled={saving}
              />
            </div>

            {/* ================= COORDINATES ================= */}

            <div className="border rounded-lg p-4 bg-gray-50">

              <h2 className="font-semibold mb-1">
                📍 Location Coordinates
              </h2>

              <p className="text-xs text-gray-500 mb-4">
                Required for distance calculation and itinerary
                optimization.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Latitude */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Latitude *
                  </label>

                  <input
                    type="number"
                    name="latitude"
                    placeholder="Example: 19.9322"
                    value={form.latitude}
                    onChange={handleChange}
                    min="-90"
                    max="90"
                    step="any"
                    className="w-full border px-3 py-2 rounded bg-white"
                    required
                    disabled={saving}
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Range: -90 to 90
                  </p>
                </div>

                {/* Longitude */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Longitude *
                  </label>

                  <input
                    type="number"
                    name="longitude"
                    placeholder="Example: 73.5199"
                    value={form.longitude}
                    onChange={handleChange}
                    min="-180"
                    max="180"
                    step="any"
                    className="w-full border px-3 py-2 rounded bg-white"
                    required
                    disabled={saving}
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Range: -180 to 180
                  </p>
                </div>

              </div>
            </div>

            {/* ================= VISIT TIME ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Average Visit Time (minutes) *
              </label>

              <input
                type="number"
                name="avgVisitMinutes"
                value={form.avgVisitMinutes}
                onChange={handleChange}
                min="5"
                max="1440"
                step="5"
                className="w-full border px-3 py-2 rounded"
                required
                disabled={saving}
              />

              <p className="text-xs text-gray-500 mt-1">
                Example: 60 means visitors usually spend about
                1 hour here.
              </p>
            </div>

            {/* ================= DESCRIPTION ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>

              <textarea
                name="description"
                placeholder="Describe the cultural, historical or religious significance of this place..."
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full border px-3 py-2 rounded resize-none"
                required
                disabled={saving}
              />
            </div>

            {/* ================= BUTTON ================= */}

            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full bg-saffron text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving Place..."
                : uploading
                ? "Uploading Image..."
                : "Save Place"}
            </button>

          </form>
        </div>
      </section>
    </>
  );
};

export default AddPlace;