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
  });

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔄 Load existing place
  useEffect(() => {
    loadPlace();
  }, []);

  const loadPlace = async () => {
    try {
      const data = await fetchPlaceById(id);

      setForm({
        title: data.title || "",
        state: data.state || "",
        deity: data.deity || "",
        description: data.description || "",
        location: data.location || "",
        category: data.category || "Temple",
      });

      if (data.images && data.images.length > 0) {
        setImageUrl(data.images[0]);
      }

    } catch (error) {
      toast.error("Failed to load place");
    } finally {
      setLoading(false);
    }
  };

  // 📝 Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼 Upload new image (optional)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await uploadImage(file);
      setImageUrl(data.url);
      toast.success("Image updated");
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  // 💾 Save updated place
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updatePlace(id, {
        ...form,
        images: imageUrl ? [imageUrl] : [],
      });

      toast.success("Place updated successfully");
      navigate("/admin");

    } catch (error) {
      toast.error("Failed to update place");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-ivory px-8 py-12">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-6">
            Edit Place
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Image */}
            <div>
              <label className="block text-sm mb-1">
                Update Image (optional)
              </label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded"
              />
            )}

            {/* Title */}
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* State */}
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Deity */}
            <input
              name="deity"
              value={form.deity}
              onChange={handleChange}
              placeholder="Deity"
              className="w-full border px-3 py-2 rounded"
            />

            {/* Location */}
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border px-3 py-2 rounded"
            />

            {/* Description */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Description"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-saffron text-white py-2 rounded disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Place"}
            </button>

          </form>
        </div>
      </section>
    </>
  );
};

export default EditPlace;