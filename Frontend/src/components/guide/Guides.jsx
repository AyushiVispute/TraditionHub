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

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1D3557] to-[#274C77] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-orange-300 font-medium mb-3">
            EXPERIENCE LOCALLY
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Meet Local Guides
          </h1>

          <p className="text-gray-200 mt-4 max-w-2xl text-lg leading-8">
            Discover traditions, stories, food and places
            through people who know the culture personally.
          </p>
        </div>
      </section>

      {/* Guides */}
      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">
              {error}
            </p>

            <button
              onClick={loadGuides}
              className="mt-4 px-5 py-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && guides.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-[#1D3557]">
              No local guides available
            </h2>

            <p className="text-gray-500 mt-2">
              Check back soon for local cultural guides.
            </p>
          </div>
        )}

        {/* Guide Cards */}
        {!loading && !error && guides.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1D3557]">
                  Local Guides
                </h2>

                <p className="text-gray-500 mt-1">
                  {guides.length} guide
                  {guides.length !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <GuideCard
                  key={guide._id}
                  guide={guide}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}