import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { fetchPlaceById } from "@/services/placeApi";

const PlaceDetail = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlace = async () => {
      try {
        const data = await fetchPlaceById(id);
        setPlace(data);
      } catch (error) {
        console.error("Failed to load place", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlace();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <p className="text-indigoDark">Loading sacred place...</p>
        </div>
      </>
    );
  }

  if (!place) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <p className="text-indigoDark">Place not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-ivory min-h-screen px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-md border border-goldMuted/30">
            <img
              src={place.images?.[0]}
              alt={place.title}
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="mt-8">
            <h1 className="text-4xl font-bold text-indigoDark">
              {place.title}
            </h1>

            <div className="mt-3 flex gap-4 text-sm">
              <span className="bg-saffron/10 text-saffron px-3 py-1 rounded-full">
                {place.state}
              </span>
              {place.deity && (
                <span className="bg-goldMuted/20 text-indigoDark px-3 py-1 rounded-full">
                  {place.deity}
                </span>
              )}
            </div>

            <p className="mt-6 text-indigoDark/80 leading-relaxed">
              {place.description}
            </p>

            {place.location && (
              <p className="mt-4 text-sm text-indigoDark/60">
                📍 {place.location}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceDetail;
