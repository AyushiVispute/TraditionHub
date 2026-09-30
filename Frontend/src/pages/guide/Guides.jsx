import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import GuideCard from "../../components/guide/GuideCard";
import { fetchGuides } from "../../services/guideApi";

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchGuides();

      console.log("GUIDES API DATA:", data);

      setGuides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load guides:", error);
      setError("Unable to load local guides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#1D3557] to-[#274C77] text-white">

        <div className="max-w-6xl mx-auto px-6">

          <p className="text-orange-300 font-semibold uppercase tracking-wider mb-3">
            Explore With Locals
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Local Guides
          </h1>

          <p className="mt-4 text-white/80 max-w-2xl text-lg">
            Connect with local experts and experience destinations through
            authentic stories, culture, food, and traditions.
          </p>

        </div>

      </section>

      {/* GUIDES */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20">

            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />

            <p className="mt-4 text-gray-600">
              Loading local guides...
            </p>

          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center py-20">

            <p className="text-red-600 font-semibold">
              {error}
            </p>

            <button
              type="button"
              onClick={loadGuides}
              className="mt-4 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              Try Again
            </button>

          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && guides.length === 0 && (
          <div className="text-center py-20">

            <p className="text-gray-600 text-lg">
              No local guides available yet.
            </p>

          </div>
        )}

        {/* GUIDE CARDS */}
        {!loading && !error && guides.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {guides.map((guide) => (

              <GuideCard
                key={guide._id}
                guide={guide}
              />

            ))}

          </div>

        )}

      </main>

    </div>
  );
}