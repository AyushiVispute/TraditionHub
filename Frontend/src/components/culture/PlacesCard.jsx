import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const PlacesCard = ({ place }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={`/places/${place._id}`} className="block">
      <div className="relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">

        {/* Image */}
        <img
          src={place.images?.[0]}
          alt={place.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Gradient Overlay (disable pointer events) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>

        {/* State Tag */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 text-xs rounded-full text-white pointer-events-none">
          📍 {place.state}
        </div>

        {/* Like Button (stop navigation) */}
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent redirect
            setLiked(!liked);
          }}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full z-10"
        >
          <Heart
            className={`w-5 h-5 transition ${
              liked ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        {/* Bottom Content */}
        <div className="absolute bottom-6 left-6 text-white pointer-events-none">
          <p className="text-xs uppercase tracking-wide opacity-80">
            Monument
          </p>
          <h3 className="text-2xl font-semibold mt-1">
            {place.title}
          </h3>
        </div>

      </div>
    </Link>
  );
};

export default PlacesCard;