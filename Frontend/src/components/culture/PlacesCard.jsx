import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const PlacesCard = ({ place }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <Link to={`/places/${place._id}`}>
        <img
          src={place.images?.[0]}
          alt={place.title}
          className="h-48 w-full object-cover rounded-t-xl"
        />
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#1D3557]">
            {place.title}
          </h3>

          <button onClick={() => setLiked(!liked)}>
            <Heart
              className={`w-5 h-5 ${
                liked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {place.state}
        </p>
      </div>
    </div>
  );
};

export default PlacesCard;
