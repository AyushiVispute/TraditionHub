import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import { uploadImage } from "@/services/uploadApi";
import { createPlace } from "@/services/placeApi";

const AddPlace = () => {
  // ---------- FORM STATE ----------
  const [form, setForm] = useState({
    title: "",
    state: "",
    deity: "",
    description: "",
    location: "",
    category: "Temple",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ---------- HANDLERS ----------

  // ✅ IMAGE UPLOAD HANDLER (Cloudinary)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = await uploadImage(file); // { url }
      console.log("UPLOAD SUCCESS:", data);
      setImageUrl(data.url);
    } catch (error) {
      alert(error.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ FORM INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE PLACE TO MONGODB
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first");
      return;
    }

    try {
      setSaving(true);

      await createPlace({
        ...form,
        images: [imageUrl],
      });

      alert("Place added successfully ✅");

      // Reset form
      setForm({
        title: "",
        state: "",
        deity: "",
        description: "",
        location: "",
        category: "Temple",
      });
      setImageUrl("");
    } catch (error) {
      alert("Failed to save place");
    } finally {
      setSaving(false);
    }
  };

  // ---------- UI ----------
  return (
    <>
      <Navbar />

      <section className="bg-ivory min-h-screen px-8 py-12">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-goldMuted/40 shadow">
          <h1 className="text-2xl font-bold text-indigoDark mb-6">
            Add New Place
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-sm text-indigoDark mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {uploading && (
                <p className="text-sm mt-1 text-indigoDark/70">
                  Uploading image...
                </p>
              )}
            </div>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded border"
              />
            )}

            {/* TITLE */}
            <input
              name="title"
              placeholder="Place Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* STATE */}
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* DEITY */}
            <input
              name="deity"
              placeholder="Deity (optional)"
              value={form.deity}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            {/* LOCATION */}
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-saffron text-white py-2 rounded hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Place"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddPlace;
