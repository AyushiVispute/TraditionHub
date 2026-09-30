import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  User,
  MapPin,
  Languages,
  Briefcase,
  IndianRupee,
  CheckCircle,
  Loader2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  photo: "",
  city: "",
  state: "",
  languages: "",
  specialties: "",
  bio: "",
  experienceYears: 0,
  pricePerHour: 0,
  rating: 0,
  totalReviews: 0,
  available: true,
  verified: false,
  toiPreferences: "",
};

const GuideForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD GUIDE ================= */

  useEffect(() => {
    if (!isEditMode) return;

    const fetchGuide = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/guides/${id}`
        );

        const guide = response.data;

        setForm({
          name: guide.name || "",
          email: guide.email || "",
          phone: guide.phone || "",
          photo: guide.photo || "",
          city: guide.city || "",
          state: guide.state || "",
          languages: (guide.languages || []).join(", "),
          specialties: (guide.specialties || []).join(", "),
          bio: guide.bio || "",
          experienceYears: guide.experienceYears || 0,
          pricePerHour: guide.pricePerHour || 0,
          rating: guide.rating || 0,
          totalReviews: guide.totalReviews || 0,
          available: guide.available ?? true,
          verified: guide.verified ?? false,
          toiPreferences: (
            guide.toiPreferences || []
          ).join(", "),
        });
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load guide"
        );

        navigate("/admin/guides");
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id, isEditMode, navigate]);

  /* ================= INPUT ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Guide name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!form.city.trim()) {
      toast.error("City is required");
      return;
    }

    if (!form.state.trim()) {
      toast.error("State is required");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        photo: form.photo.trim(),

        city: form.city.trim(),
        state: form.state.trim(),

        languages: form.languages
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        specialties: form.specialties
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        bio: form.bio.trim(),

        experienceYears: Number(
          form.experienceYears
        ),

        pricePerHour: Number(
          form.pricePerHour
        ),

        rating: Number(form.rating),

        totalReviews: Number(
          form.totalReviews
        ),

        available: form.available,
        verified: form.verified,

        toiPreferences:
          form.toiPreferences
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (isEditMode) {
        await axios.put(
          `${API_URL}/api/guides/${id}`,
          payload,
          config
        );

        toast.success(
          "Guide updated successfully"
        );
      } else {
        await axios.post(
          `${API_URL}/api/guides`,
          payload,
          config
        );

        toast.success(
          "Guide added successfully"
        );
      }

      navigate("/admin/guides");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          `Failed to ${
            isEditMode ? "update" : "add"
          } guide`
      );
    } finally {
      setSaving(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf0] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2
            size={22}
            className="animate-spin"
          />
          Loading guide...
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#fffaf0] flex">

      {/* SIDEBAR */}

      <aside className="hidden lg:flex w-64 bg-white shadow-xl p-6 flex-col">

        <Link
          to="/admin"
          className="no-underline"
        >
          <h2 className="text-2xl font-bold text-orange-600">
            TraditionHub
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            ADMIN PANEL
          </p>
        </Link>

        <nav className="mt-10 space-y-2">

          <Link
            to="/admin"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
            "
          >
            Dashboard
          </Link>

          <Link
            to="/admin/add-place"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
            "
          >
            Add Place
          </Link>

          <Link
            to="/admin/tois"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
            "
          >
            Manage Topics
          </Link>

          <Link
            to="/admin/guides"
            className="
              block px-4 py-3 rounded-xl
              bg-orange-50
              text-orange-600
              font-semibold
              no-underline
            "
          >
            Manage Guides
          </Link>

          <Link
            to="/guide-booking-requests"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
            "
          >
            Guide Requests
          </Link>

        </nav>

      </aside>


      {/* MAIN */}

      <main className="flex-1 p-5 md:p-8 lg:p-10">

        {/* HEADER */}

        <div className="max-w-5xl mx-auto">

          <Link
            to="/admin/guides"
            className="
              inline-flex items-center gap-2
              text-gray-500
              hover:text-orange-600
              no-underline
              mb-6
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Guides
          </Link>

          <div className="mb-8">

            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              Guide Management
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
              {isEditMode
                ? "Edit Guide"
                : "Add New Guide"}
            </h1>

            <p className="text-gray-500 mt-2">
              {isEditMode
                ? "Update the guide's profile and availability."
                : "Add a new local cultural guide to TraditionHub."}
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* BASIC INFORMATION */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <User
                    size={20}
                    className="text-orange-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Basic Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Guide's personal and contact details
                  </p>
                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="Full Name *"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rahul Patil"
                />

                <Input
                  label="Email *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                />

                <Input
                  label="Profile Photo URL"
                  name="photo"
                  value={form.photo}
                  onChange={handleChange}
                  placeholder="https://..."
                />

              </div>

            </section>


            {/* LOCATION */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MapPin
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Location
                  </h2>

                  <p className="text-sm text-gray-500">
                    Where the guide operates
                  </p>
                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="City *"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Nashik"
                />

                <Input
                  label="State *"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                />

              </div>

            </section>


            {/* PROFESSIONAL INFORMATION */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Briefcase
                    size={20}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Professional Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Experience and expertise
                  </p>
                </div>

              </div>


              <div className="space-y-5">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages
                  </label>

                  <input
                    name="languages"
                    value={form.languages}
                    onChange={handleChange}
                    placeholder="English, Hindi, Marathi"
                    className={inputClass}
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Separate multiple languages with commas.
                  </p>

                </div>


                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialties
                  </label>

                  <input
                    name="specialties"
                    value={form.specialties}
                    onChange={handleChange}
                    placeholder="Temple Heritage, History, Food"
                    className={inputClass}
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Separate specialties with commas.
                  </p>

                </div>


                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TOI Preferences
                  </label>

                  <input
                    name="toiPreferences"
                    value={form.toiPreferences}
                    onChange={handleChange}
                    placeholder="culture, religion, food"
                    className={inputClass}
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Use your existing TOI slugs where possible.
                  </p>

                </div>


                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell travelers about this guide..."
                    className={`${inputClass} resize-none`}
                  />

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  <Input
                    label="Experience (Years)"
                    name="experienceYears"
                    type="number"
                    min="0"
                    value={form.experienceYears}
                    onChange={handleChange}
                  />

                  <Input
                    label="Price Per Hour (₹)"
                    name="pricePerHour"
                    type="number"
                    min="0"
                    value={form.pricePerHour}
                    onChange={handleChange}
                  />

                  <Input
                    label="Rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </section>


            {/* REVIEW DATA */}

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <IndianRupee
                    size={20}
                    className="text-yellow-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Profile Status
                  </h2>

                  <p className="text-sm text-gray-500">
                    Manage verification and availability
                  </p>
                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="Total Reviews"
                  name="totalReviews"
                  type="number"
                  min="0"
                  value={form.totalReviews}
                  onChange={handleChange}
                />


                <label className="
                  flex items-center gap-3
                  border border-gray-200
                  rounded-xl
                  px-4
                  cursor-pointer
                  hover:bg-gray-50
                ">

                  <input
                    type="checkbox"
                    name="available"
                    checked={form.available}
                    onChange={handleChange}
                    className="w-5 h-5 accent-orange-600"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      Available for bookings
                    </p>

                    <p className="text-xs text-gray-500">
                      Travelers can request this guide.
                    </p>
                  </div>

                </label>


                <label className="
                  md:col-span-2
                  flex items-center gap-3
                  border border-gray-200
                  rounded-xl
                  px-4 py-4
                  cursor-pointer
                  hover:bg-gray-50
                ">

                  <input
                    type="checkbox"
                    name="verified"
                    checked={form.verified}
                    onChange={handleChange}
                    className="w-5 h-5 accent-green-600"
                  />

                  <div className="flex items-center gap-2">

                    <CheckCircle
                      size={18}
                      className="text-green-600"
                    />

                    <div>
                      <p className="font-medium text-gray-800">
                        Verified Guide
                      </p>

                      <p className="text-xs text-gray-500">
                        Show this guide as verified on TraditionHub.
                      </p>
                    </div>

                  </div>

                </label>

              </div>

            </section>


            {/* ACTIONS */}

            <div className="
              flex flex-col-reverse
              sm:flex-row
              justify-end
              gap-3
              pb-10
            ">

              <Link
                to="/admin/guides"
                className="
                  px-6 py-3
                  rounded-xl
                  border border-gray-200
                  bg-white
                  text-gray-700
                  text-center
                  font-medium
                  no-underline
                  hover:bg-gray-50
                  transition
                "
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex items-center
                  justify-center gap-2
                  px-7 py-3
                  rounded-xl
                  bg-orange-600
                  text-white
                  font-semibold
                  hover:bg-orange-700
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >

                {saving ? (
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={19} />
                )}

                {saving
                  ? "Saving..."
                  : isEditMode
                  ? "Update Guide"
                  : "Add Guide"}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};


/* ================= REUSABLE INPUT ================= */

const inputClass = `
  w-full
  px-4 py-3
  rounded-xl
  border border-gray-200
  bg-white
  text-gray-800
  outline-none
  transition
  focus:border-orange-500
  focus:ring-2
  focus:ring-orange-100
`;

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={inputClass}
      />
    </div>
  );
};

export default GuideForm;