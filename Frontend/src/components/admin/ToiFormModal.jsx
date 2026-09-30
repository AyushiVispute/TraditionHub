import { useState, useEffect } from "react";

const EMPTY = {
  name: "",
  description: "",
  keywords: "",
  icon: "",
};

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Create/edit modal for a single TOI.
 *
 * initial = null  → Create mode
 * initial = object → Edit mode
 */
export default function ToiFormModal({
  initial,
  onClose,
  onSubmit,
  saving,
}) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        description: initial.description || "",
        keywords: Array.isArray(initial.keywords)
          ? initial.keywords.join(", ")
          : "",
        icon: initial.icon || "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [initial]);

  // Handle input changes
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      return;
    }

    if (!description) {
      return;
    }

    /*
      Create slug automatically.

      Example:
      "Culture & Heritage"
          ↓
      "culture-heritage"
    */

    const generatedSlug = generateSlug(name);

    // If editing an existing TOI, preserve its existing slug.
    // If creating a new TOI, generate a new slug.
    const slug = initial?.slug || generatedSlug;

    const payload = {
      name,
      slug,
      description,

      keywords: form.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),

      icon: form.icon.trim(),
    };

    console.log("TOI payload:", payload);

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <h2 className="text-lg font-bold mb-4">
          {initial
            ? "Edit Topic"
            : "New Topic of Interest"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* ================= NAME ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>

            <input
              required
              value={form.name}
              onChange={handleChange("name")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. Craftsmanship"
              disabled={saving}
            />

            {/* Generated slug preview */}
            {form.name.trim() && (
              <p className="text-xs text-gray-500 mt-1">
                Slug:{" "}
                <span className="font-medium text-gray-700">
                  {initial?.slug || generateSlug(form.name)}
                </span>
              </p>
            )}
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description{" "}
              <span className="text-gray-400 font-normal">
                (used to score places against this topic)
              </span>
            </label>

            <textarea
              required
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Local artisans, traditional crafts, workshops, and handmade goods."
              disabled={saving}
            />
          </div>

          {/* ================= KEYWORDS ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Keywords (comma-separated)
            </label>

            <input
              value={form.keywords}
              onChange={handleChange("keywords")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="artisan, craft, handmade, workshop"
              disabled={saving}
            />

            <p className="text-xs text-gray-400 mt-1">
              Example: artisan, craft, handmade, workshop
            </p>
          </div>

          {/* ================= ICON ================= */}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Icon (emoji, optional)
            </label>

            <input
              value={form.icon}
              onChange={handleChange("icon")}
              className="w-24 border rounded-lg px-3 py-2"
              placeholder="🧵"
              disabled={saving}
            />
          </div>

          {/* ================= EDIT WARNING ================= */}

          {initial && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-2">
              Saving will re-score every place in the catalog
              against this topic. This may take a moment.
            </p>
          )}

          {/* ================= BUTTONS ================= */}

          <div className="flex gap-2 justify-end pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : initial
                ? "Save changes"
                : "Create topic"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}