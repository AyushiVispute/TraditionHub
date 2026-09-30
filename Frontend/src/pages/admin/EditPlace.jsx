import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { fetchPlaceById, updatePlace } from "@/services/placeApi";
import { uploadImage } from "@/services/uploadApi";
import toast from "react-hot-toast";

const EditPlace = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔄 Load existing place
  useEffect(() => {
    if (id) {
      loadPlace();
    }
  }, [id]);

  const loadPlace = async () => {
    try {
      setLoading(true);

      const data = await fetchPlaceById(id);

      setForm({
        title: data.title || "",
        state: data.state || "",
        deity: data.deity || "",
        description: data.description || "",
        location: data.location || "",
        category: data.category || "Temple",

        // Read coordinates from backend
        latitude:
          data.coordinates?.lat ??
          data.coordinates?.latitude ??
          "",

        longitude:
          data.coordinates?.lng ??
          data.coordinates?.longitude ??
          "",

        // Read visit duration
        avgVisitMinutes:
          data.avgVisitMinutes ??
          data.estimatedMinutes ??
          60,
      });

      if (data.images?.length > 0) {
        setImageUrl(data.images[0]);
      }
    } catch (error) {
      console.error("Load place error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load place"
      );
    } finally {
      setLoading(false);
    }
  };

  // 📝 Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🖼 Upload new image
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

      toast.success("Image updated");
    } catch (error) {
      console.error("Image upload error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Image upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // 💾 Save updated place
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate latitude
    const latitude = Number(form.latitude);

    if (
      form.latitude === "" ||
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
      form.longitude === "" ||
      Number.isNaN(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      toast.error(
        "Please enter a valid longitude (-180 to 180)"
      );
      return;
    }

    // Validate visit time
    const avgVisitMinutes = Number(
      form.avgVisitMinutes
    );

    if (
      form.avgVisitMinutes === "" ||
      Number.isNaN(avgVisitMinutes) ||
      avgVisitMinutes <= 0
    ) {
      toast.error(
        "Please enter a valid visit duration"
      );
      return;
    }

    try {
      setSaving(true);

      const placeData = {
        title: form.title.trim(),
        state: form.state.trim(),
        deity: form.deity.trim(),
        description: form.description.trim(),
        location: form.location.trim(),
        category: form.category,

        // IMPORTANT:
        // Backend Place model expects this structure
        coordinates: {
          lat: latitude,
          lng: longitude,
        },

        // Used by itinerary optimizer
        avgVisitMinutes,

        // Keep existing/new image
        images: imageUrl ? [imageUrl] : [],
      };

      console.log("Updating place:", placeData);

      await updatePlace(id, placeData);

      toast.success("Place updated successfully! ✅");

      navigate("/admin");
    } catch (error) {
      console.error("Update place error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update place"
      );
    } finally {
      setSaving(false);
    }
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <p className="text-gray-600">
            Loading place...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-ivory px-4 sm:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border shadow">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Edit Place
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Update place information, coordinates and
              visit duration.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ================= IMAGE ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Update Image
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
                  alt={form.title || "Place preview"}
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
                value={form.title}
                onChange={handleChange}
                placeholder="Example: Trimbakeshwar Temple"
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
                value={form.state}
                onChange={handleChange}
                placeholder="Example: Maharashtra"
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
                value={form.deity}
                onChange={handleChange}
                placeholder="Example: Lord Shiva"
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
                value={form.location}
                onChange={handleChange}
                placeholder="Example: Trimbak, Nashik"
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
                These coordinates are used for distance
                calculation and itinerary planning.
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
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="Example: 19.9322"
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
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="Example: 73.5199"
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
                Example: 60 = approximately 1 hour at this
                place.
              </p>
            </div>

            {/* ================= DESCRIPTION ================= */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the cultural, historical or religious significance..."
                className="w-full border px-3 py-2 rounded resize-none"
                required
                disabled={saving}
              />
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => navigate("/admin")}
                disabled={saving}
                className="w-1/3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving || uploading}
                className="flex-1 bg-saffron text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving
                  ? "Updating..."
                  : uploading
                  ? "Uploading..."
                  : "Update Place"}
              </button>

            </div>

          </form>
        </div>
      </section>
    </>
  );
};

export default EditPlace;