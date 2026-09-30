import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Languages,
  Clock,
  CheckCircle,
  IndianRupee,
} from "lucide-react";

import Navbar from "../../components/common/Navbar";

import {
  fetchGuideById,
  bookGuide,
} from "../../services/guideApi";

export default function GuideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // BOOKING STATE
  // ==============================

  const [showBookingForm, setShowBookingForm] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    hours: 1,
    message: "",
  });

  const [bookingLoading, setBookingLoading] = useState(false);

  // ==============================
  // LOAD GUIDE
  // ==============================

  useEffect(() => {
    loadGuide();
  }, [id]);

  const loadGuide = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchGuideById(id);

      setGuide(data);
    } catch (error) {
      console.error("Failed to load guide:", error);
      setError("Unable to load guide details.");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // BOOKING INPUT CHANGE
  // ==============================

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==============================
  // SUBMIT BOOKING
  // ==============================

  const handleBookGuide = async (e) => {
    e.preventDefault();

    if (!bookingData.date) {
      toast.error("Please select a date.");
      return;
    }

    if (!bookingData.startTime) {
      toast.error("Please select a start time.");
      return;
    }

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login to request a guide.");
      navigate("/login");
      return;
    }

    try {
      setBookingLoading(true);

      const result = await bookGuide(
        id,
        {
          date: bookingData.date,
          startTime: bookingData.startTime,
          hours: Number(bookingData.hours),
          message: bookingData.message,
        },
        token
      );

      console.log("GUIDE BOOKING:", result);

      toast.success(
        result.message ||
          "Guide request submitted successfully!"
      );

      setShowBookingForm(false);

      setBookingData({
        date: "",
        startTime: "",
        hours: 1,
        message: "",
      });
    } catch (error) {
      console.error("Guide booking error:", error);

      toast.error(
        error.message ||
          "Unable to submit guide request."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <Navbar />

        <div className="flex justify-center items-center py-32">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 py-20 text-center">

          <h2 className="text-2xl font-bold text-[#1D3557]">
            Guide not found
          </h2>

          <p className="text-gray-500 mt-2">
            {error ||
              "This guide is no longer available."}
          </p>

          <button
            onClick={() => navigate("/guides")}
            className="mt-6 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            Back to Guides
          </button>

        </div>
      </div>
    );
  }

  // ==============================
  // TOTAL PRICE
  // ==============================

  const totalAmount =
    Number(guide.pricePerHour || 0) *
    Number(bookingData.hours || 1);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="bg-gradient-to-r from-[#1D3557] to-[#274C77] text-white">

        <div className="max-w-6xl mx-auto px-6 py-12">

          <button
            onClick={() => navigate("/guides")}
            className="flex items-center gap-2 text-gray-200 hover:text-white mb-8 transition"
          >
            <ArrowLeft size={18} />
            Back to Guides
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* PHOTO */}

            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white/30 bg-orange-400 flex items-center justify-center flex-shrink-0">

              {guide.photo ? (
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-white">
                  {guide.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </span>
              )}

            </div>

            {/* BASIC INFORMATION */}

            <div>

              <div className="flex items-center gap-3 flex-wrap">

                <h1 className="text-4xl font-bold">
                  {guide.name}
                </h1>

                {guide.verified && (
                  <span className="flex items-center gap-1 bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm">
                    <CheckCircle size={15} />
                    Verified
                  </span>
                )}

              </div>

              <div className="flex items-center gap-2 text-gray-200 mt-4">
                <MapPin size={18} />

                {guide.city}

                {guide.state
                  ? `, ${guide.state}`
                  : ""}
              </div>

              <div className="flex items-center gap-2 mt-3">

                <Star
                  size={18}
                  className="fill-orange-400 text-orange-400"
                />

                <span className="font-semibold">
                  {guide.rating != null
                    ? Number(
                        guide.rating
                      ).toFixed(1)
                    : "New"}
                </span>

                <span className="text-gray-300">
                  ({guide.totalReviews || 0} reviews)
                </span>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="lg:col-span-2 space-y-8">

            {/* ABOUT */}

            <section className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">

              <h2 className="text-2xl font-bold text-[#1D3557]">
                About the Guide
              </h2>

              <p className="text-gray-600 leading-8 mt-4">
                {guide.bio ||
                  "No biography available."}
              </p>

            </section>

            {/* LANGUAGES */}

            <section className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">

              <div className="flex items-center gap-3">

                <Languages className="text-orange-500" />

                <h2 className="text-2xl font-bold text-[#1D3557]">
                  Languages
                </h2>

              </div>

              <div className="flex flex-wrap gap-3 mt-5">

                {guide.languages?.length ? (
                  guide.languages.map(
                    (language) => (
                      <span
                        key={language}
                        className="px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-medium"
                      >
                        {language}
                      </span>
                    )
                  )
                ) : (
                  <span className="text-gray-500">
                    Not specified
                  </span>
                )}

              </div>

            </section>

            {/* SPECIALTIES */}

            <section className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">

              <h2 className="text-2xl font-bold text-[#1D3557]">
                Specialties
              </h2>

              <div className="flex flex-wrap gap-3 mt-5">

                {guide.specialties?.length ? (
                  guide.specialties.map(
                    (specialty) => (
                      <span
                        key={specialty}
                        className="px-4 py-2 rounded-full bg-[#1D3557]/10 text-[#1D3557] font-medium"
                      >
                        {specialty}
                      </span>
                    )
                  )
                ) : (
                  <span className="text-gray-500">
                    Not specified
                  </span>
                )}

              </div>

            </section>

            {/* EXPERIENCE */}

            <section className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8">

              <div className="flex items-center gap-3">

                <Clock className="text-orange-500" />

                <h2 className="text-2xl font-bold text-[#1D3557]">
                  Experience
                </h2>

              </div>

              <p className="text-gray-600 mt-4">
                {guide.experienceYears || 0}{" "}
                years of local guiding experience.
              </p>

            </section>

          </div>

          {/* =================================================
              RIGHT BOOKING CARD
          ================================================= */}

          <div>

            <div className="bg-white rounded-3xl border border-orange-100 shadow-lg p-7 sticky top-24">

              {/* PRICE */}

              <p className="text-gray-500">
                Guide fee
              </p>

              <div className="flex items-center mt-2">

                <IndianRupee
                  size={24}
                  className="text-[#1D3557]"
                />

                <span className="text-3xl font-bold text-[#1D3557]">
                  {guide.pricePerHour || 0}
                </span>

                <span className="text-gray-500 ml-1">
                  / hour
                </span>

              </div>

              <div className="border-t border-gray-100 my-6" />

              {/* AVAILABILITY */}

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Availability
                </span>

                <span
                  className={
                    guide.available
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {guide.available
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

              {/* REQUEST BUTTON */}

              {!showBookingForm && (
                <button
                  type="button"
                  disabled={!guide.available}
                  onClick={() =>
                    setShowBookingForm(true)
                  }
                  className="w-full mt-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold transition"
                >
                  {guide.available
                    ? "Request Guide"
                    : "Currently Unavailable"}
                </button>
              )}

              {/* =================================================
                  BOOKING FORM
              ================================================= */}

              {showBookingForm &&
                guide.available && (
                  <div className="mt-6 pt-6 border-t border-gray-100">

                    {/* HEADER */}

                    <div className="flex items-center justify-between mb-5">

                      <h3 className="text-xl font-bold text-[#1D3557]">
                        Request This Guide
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          setShowBookingForm(false)
                        }
                        className="text-gray-400 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>

                    </div>

                    <form
                      onSubmit={handleBookGuide}
                      className="space-y-4"
                    >

                      {/* DATE */}

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date
                        </label>

                        <input
                          type="date"
                          name="date"
                          value={
                            bookingData.date
                          }
                          onChange={
                            handleBookingChange
                          }
                          min={
                            new Date()
                              .toISOString()
                              .split("T")[0]
                          }
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                        />

                      </div>

                      {/* TIME */}

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Start Time
                        </label>

                        <input
                          type="time"
                          name="startTime"
                          value={
                            bookingData.startTime
                          }
                          onChange={
                            handleBookingChange
                          }
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                        />

                      </div>

                      {/* HOURS */}

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Hours
                        </label>

                        <select
                          name="hours"
                          value={
                            bookingData.hours
                          }
                          onChange={
                            handleBookingChange
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          {Array.from(
                            { length: 12 },
                            (_, index) =>
                              index + 1
                          ).map((hour) => (
                            <option
                              key={hour}
                              value={hour}
                            >
                              {hour}{" "}
                              {hour === 1
                                ? "Hour"
                                : "Hours"}
                            </option>
                          ))}
                        </select>

                      </div>

                      {/* MESSAGE */}

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message
                        </label>

                        <textarea
                          name="message"
                          value={
                            bookingData.message
                          }
                          onChange={
                            handleBookingChange
                          }
                          rows={3}
                          maxLength={500}
                          placeholder="Tell the guide about your interests or requirements..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:ring-2 focus:ring-orange-400"
                        />

                        <p className="text-xs text-gray-400 mt-1">
                          {
                            bookingData.message
                              .length
                          }
                          /500
                        </p>

                      </div>

                      {/* TOTAL */}

                      <div className="bg-orange-50 rounded-xl p-4">

                        <div className="flex items-center justify-between">

                          <span className="text-gray-600">
                            Estimated total
                          </span>

                          <span className="text-xl font-bold text-[#1D3557]">
                            ₹{totalAmount}
                          </span>

                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          ₹
                          {guide.pricePerHour ||
                            0}{" "}
                          × {bookingData.hours}{" "}
                          {Number(
                            bookingData.hours
                          ) === 1
                            ? "hour"
                            : "hours"}
                        </p>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            setShowBookingForm(false)
                          }
                          disabled={
                            bookingLoading
                          }
                          className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={
                            bookingLoading
                          }
                          className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold disabled:opacity-60"
                        >
                          {bookingLoading
                            ? "Sending..."
                            : "Send Request"}
                        </button>

                      </div>

                    </form>

                  </div>
                )}

              {/* NOTE */}

              {!showBookingForm && (
                <p className="text-xs text-gray-400 text-center mt-4">
                  Final booking details can be
                  confirmed with the guide.
                </p>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}