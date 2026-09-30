import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "@/components/common/Navbar";
import PlannerModal from "@/pages/planner/PlannerModal";
import AIChat from "@/components/guide/AIChat";

import { fetchPlaceById } from "@/services/placeApi";

import {
  MapPin,
  Calendar,
  Clock,
  Landmark,
  Sparkles,
  Camera,
  Heart,
  ArrowLeft,
  ArrowRight,
  Navigation,
  MessageCircle,
  Share2,
  CheckCircle2,
} from "lucide-react";

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const loadPlace = async () => {
      try {
        const data = await fetchPlaceById(id);
        setPlace(data);
      } catch (error) {
        console.error("Failed to load place:", error);
      }
    };

    loadPlace();
  }, [id]);

  if (!place) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-[#E76F51] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading destination...</p>
          </div>
        </div>
      </>
    );
  }

  const images =
    place.images?.length > 0
      ? place.images
      : [place.image].filter(Boolean);

  const highlights = [
    "Photography",
    "Scenic Views",
    "Local Culture",
    "Heritage Experience",
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#FAF7F2] min-h-screen pb-20">

        {/* ------------------------------------------------ */}
        {/* HERO */}
        {/* ------------------------------------------------ */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">

          {/* Back */}
          <button
            onClick={() => navigate("/explore")}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E76F51] transition mb-5"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </button>

          {/* Hero */}
          <div className="relative h-[430px] md:h-[520px] rounded-[28px] overflow-hidden shadow-xl">

            <img
              src={images[0]}
              alt={place.title}
              className="w-full h-full object-cover"
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Top actions */}
            <div className="absolute top-5 right-5 flex gap-2">

              <button
                onClick={() => setLiked(!liked)}
                className="w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-105 transition"
              >
                <Heart
                  size={19}
                  className={
                    liked
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }
                />
              </button>

              <button className="w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-105 transition">
                <Share2 size={18} className="text-gray-700" />
              </button>
            </div>

            {/* Hero content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#E76F51] text-xs font-semibold">
                  {place.category || "Heritage"}
                </span>

                {place.deity && (
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium">
                    {place.deity}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {place.title}
              </h1>

              <div className="flex items-center gap-2 mt-3 text-white/85">
                <MapPin size={18} />
                <span>
                  {place.location || place.state}
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* MAIN CONTENT */}
        {/* ------------------------------------------------ */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">

          <div className="grid lg:grid-cols-[1fr_350px] gap-8">

            {/* LEFT */}
            <div className="space-y-7">

              {/* Quick information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                <InfoItem
                  icon={<Landmark size={18} />}
                  label="State"
                  value={place.state || "India"}
                />

                <InfoItem
                  icon={<Sparkles size={18} />}
                  label="Category"
                  value={place.category || "Heritage"}
                />

                <InfoItem
                  icon={<Calendar size={18} />}
                  label="Best Time"
                  value={place.bestTime || "Oct – Mar"}
                />

                <InfoItem
                  icon={<Clock size={18} />}
                  label="Visit Duration"
                  value={
                    place.avgVisitMinutes
                      ? `${place.avgVisitMinutes} min`
                      : "2–3 hours"
                  }
                />

              </div>

              {/* About */}
              <section className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">

                <div className="flex items-center justify-between mb-5">

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#E76F51] font-semibold">
                      Discover
                    </p>

                    <h2 className="text-2xl font-bold text-[#1D3557] mt-1">
                      About this place
                    </h2>
                  </div>

                  <Landmark
                    className="text-orange-200"
                    size={32}
                  />

                </div>

                <p className="text-gray-600 leading-7">
                  {place.description ||
                    "Discover the history, culture and traditions that make this destination special."}
                </p>

              </section>

              {/* Highlights */}
              <section>

                <h2 className="text-xl font-bold text-[#1D3557] mb-4">
                  Experience highlights
                </h2>

                <div className="flex flex-wrap gap-3">

                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3 rounded-xl shadow-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-[#E76F51]"
                      />

                      <span className="text-sm text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </section>

              {/* Gallery */}
              {images.length > 1 && (
                <section>

                  <div className="flex items-center justify-between mb-4">

                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#E76F51] font-semibold">
                        Visual journey
                      </p>

                      <h2 className="text-2xl font-bold text-[#1D3557]">
                        Gallery
                      </h2>
                    </div>

                    <Camera
                      size={22}
                      className="text-gray-400"
                    />

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    {images.slice(0, 5).map((img, index) => (
                      <div
                        key={index}
                        className={`overflow-hidden rounded-2xl ${
                          index === 0
                            ? "md:col-span-2 md:row-span-2"
                            : ""
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${place.title} ${index + 1}`}
                          className="w-full h-full min-h-[150px] md:min-h-[180px] object-cover hover:scale-105 transition duration-500"
                        />
                      </div>
                    ))}

                  </div>

                </section>
              )}

            </div>

            {/* ------------------------------------------------ */}
            {/* RIGHT STICKY ACTION CARD */}
            {/* ------------------------------------------------ */}

            <aside className="lg:sticky lg:top-24 h-fit">

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">

                {/* Card heading */}
                <div className="p-6 border-b">

                  <p className="text-sm text-gray-500">
                    Explore {place.title}
                  </p>

                  <h3 className="text-xl font-bold text-[#1D3557] mt-1">
                    Make your visit memorable
                  </h3>

                </div>

                {/* Actions */}
                <div className="p-5 space-y-3">

                  <button
                    onClick={() => setShowPlanner(true)}
                    className="w-full bg-[#E76F51] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#d85f43] hover:-translate-y-0.5 transition shadow-md"
                  >
                    <Sparkles size={18} />
                    Plan My Trip
                  </button>

                  <button
                    onClick={() => setShowAI(true)}
                    className="w-full border border-[#1D3557] text-[#1D3557] py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#1D3557] hover:text-white transition"
                  >
                    <MessageCircle size={18} />
                    Ask TraditionAI
                  </button>

                  <button
                    className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                  >
                    <Navigation size={17} />
                    View Location
                  </button>

                </div>

                {/* Small info */}
                <div className="px-6 pb-6">

                  <div className="bg-[#FAF7F2] rounded-2xl p-4">

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                        <Sparkles
                          size={17}
                          className="text-[#E76F51]"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          Travel smarter
                        </p>

                        <p className="text-xs text-gray-500 mt-1 leading-5">
                          Get a personalized itinerary based on
                          your interests and travel time.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </section>

        {/* ------------------------------------------------ */}
        {/* COMPACT AI SECTION */}
        {/* ------------------------------------------------ */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">

          <div className="relative overflow-hidden rounded-3xl bg-[#1D3557] p-6 md:p-8">

            {/* Decorative circle */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-[#E76F51] flex items-center justify-center text-white">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Curious about {place.title}?
                  </h2>

                  <p className="text-sm text-white/60 mt-1">
                    Ask TraditionAI about history, culture,
                    food and hidden stories.
                  </p>
                </div>

              </div>

              <button
                onClick={() => setShowAI(true)}
                className="bg-white text-[#1D3557] px-5 py-3 rounded-xl font-semibold text-sm hover:bg-orange-50 transition whitespace-nowrap"
              >
                Start Conversation
                <ArrowRight
                  size={16}
                  className="inline ml-2"
                />
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* AI CHAT */}
      {showAI && (
        <AIChat
          place={place}
          onClose={() => setShowAI(false)}
        />
      )}

      {/* PLANNER */}
      {showPlanner && (
        <PlannerModal
          place={place}
          onClose={() => setShowPlanner(false)}
        />
      )}
    </>
  );
};

/* ------------------------------------------------ */
/* INFO ITEM */
/* ------------------------------------------------ */

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">

      <div className="flex items-center gap-2 text-[#E76F51] mb-2">
        {icon}
      </div>

      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="font-semibold text-gray-800 text-sm mt-1 truncate">
        {value}
      </p>

    </div>
  );
};

export default PlaceDetails;