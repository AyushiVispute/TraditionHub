import {
  MapPin,
  Star,
  Languages,
  Clock,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function GuideCard({ guide }) {
  const navigate = useNavigate();

  if (!guide) {
    return null;
  }

  const handleViewGuide = () => {
    console.log("================================");
    console.log("VIEW GUIDE CLICKED");
    console.log("Guide:", guide);
    console.log("Guide ID:", guide?._id);
    console.log("================================");

    if (!guide?._id) {
      console.error("Guide ID is missing!");
      alert("Guide ID is missing!");
      return;
    }

    navigate(`/guides/${guide._id}`);
  };

  return (
    <div className="relative bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Guide Photo */}
      <div className="h-56 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">

        {guide.photo ? (
          <img
            src={guide.photo}
            alt={guide.name || "Local Guide"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl font-bold">
            {guide.name?.charAt(0)?.toUpperCase() || "G"}
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-3">

          <div>
            <h3 className="text-xl font-bold text-[#1D3557]">
              {guide.name || "Local Guide"}
            </h3>

            {guide.verified && (
              <span className="text-xs text-green-600 font-medium">
                ✓ Verified Guide
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">

            <Star
              size={16}
              className="fill-orange-400 text-orange-400"
            />

            <span className="font-semibold text-gray-700">
              {guide.rating != null
                ? Number(guide.rating).toFixed(1)
                : "New"}
            </span>

          </div>

        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">

          <MapPin size={16} />

          <span>
            {guide.city || "India"}
            {guide.state ? `, ${guide.state}` : ""}
          </span>

        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">

          <Languages size={16} />

          <span>
            {Array.isArray(guide.languages) &&
            guide.languages.length > 0
              ? guide.languages.join(", ")
              : "Not specified"}
          </span>

        </div>

        {/* Experience */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">

          <Clock size={16} />

          <span>
            {guide.experienceYears || 0} years experience
          </span>

        </div>

        {/* Bio */}
        <p className="text-gray-600 text-sm leading-6 mt-4 line-clamp-3">
          {guide.bio || "Local cultural guide."}
        </p>

        {/* Specialties */}
        {Array.isArray(guide.specialties) &&
          guide.specialties.length > 0 && (

            <div className="flex flex-wrap gap-2 mt-4">

              {guide.specialties
                .slice(0, 3)
                .map((specialty, index) => (

                  <span
                    key={`${specialty}-${index}`}
                    className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-medium"
                  >
                    {specialty}
                  </span>

                ))}

            </div>

          )}

        {/* Bottom */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">

          {/* Price */}
          <div>
            <span className="text-xl font-bold text-[#1D3557]">
              ₹{guide.pricePerHour || 0}
            </span>

            <span className="text-sm text-gray-500">
              /hour
            </span>
          </div>

          {/* View Guide */}
          <button
            type="button"
            onClick={handleViewGuide}
            className="relative z-50 inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all duration-200 cursor-pointer"
          >
            View Guide
          </button>

        </div>

      </div>

    </div>
  );
}