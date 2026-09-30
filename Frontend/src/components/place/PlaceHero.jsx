import { Heart, MapPin, Star } from "lucide-react";

const PlaceHero = ({ place, liked, setLiked }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl">

      <img
        src={place.images?.[0]}
        alt={place.title}
        className="h-[500px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-10 left-10">

        <h1 className="text-5xl font-bold text-white">
          {place.title}
        </h1>

        <div className="flex items-center gap-5 mt-4 text-white">

          <div className="flex items-center gap-1">
            <MapPin size={18} />
            {place.location || place.state}
          </div>

          <div className="flex items-center gap-1">

            <Star
              className="fill-yellow-400 text-yellow-400"
              size={18}
            />

            4.8

          </div>

        </div>

      </div>

      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-8 right-8 bg-white p-4 rounded-full shadow-lg"
      >
        <Heart
          className={
            liked
              ? "fill-red-500 text-red-500"
              : "text-gray-700"
          }
        />
      </button>

    </div>
  );
};

export default PlaceHero;