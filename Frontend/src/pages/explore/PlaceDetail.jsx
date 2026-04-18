import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "@/services/placeApi";
import Navbar from "@/components/common/Navbar";
import { Heart, MapPin } from "lucide-react";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    loadPlace();
  }, [id]);

  const loadPlace = async () => {
    const data = await fetchPlaceById(id);
    setPlace(data);
  };

  if (!place) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <Navbar />

      <section className="bg-[#f6f1ea] min-h-screen pb-20">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* BACK BUTTON */}
          <button className="text-orange-600 mb-6 hover:underline">
            ← Back to Gallery
          </button>

          {/* HERO */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src={place.images?.[0]}
              alt={place.title}
              className="w-full h-[420px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Title */}
            <h1 className="absolute bottom-6 left-6 text-white text-4xl font-bold">
              {place.title}
            </h1>

            {/* Like */}
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full shadow hover:scale-110 transition"
            >
              <Heart className={liked ? "text-red-500 fill-red-500" : "text-gray-600"} />
            </button>
          </div>

          {/* LOCATION */}
          <div className="flex items-center text-gray-600 mt-4">
            <MapPin size={16} className="mr-1" />
            {place.location || place.state}
          </div>

          {/* TAGS */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <span className="bg-white px-4 py-2 rounded-full shadow text-sm">
              {place.category}
            </span>
            <span className="bg-white px-4 py-2 rounded-full shadow text-sm">
              {place.deity || "Tourist Spot"}
            </span>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-sm">State</p>
              <p className="font-semibold">{place.state}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Category</p>
              <p className="font-semibold">{place.category}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Best Time</p>
              <p className="font-semibold">
                {place.bestTime || "Oct - Mar"}
              </p>
            </div>

          </div>

          {/* IMAGE GALLERY */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {place.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="h-40 w-full object-cover rounded-xl hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* HIGHLIGHTS */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
              📸 Photography
            </span>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              🌄 Scenic
            </span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              🛕 Spiritual
            </span>
          </div>

        </div>
      </section>
    </>
  );
};

export default PlaceDetails;