import { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import PlacesCard from "@/components/culture/PlacesCard";
import PlacesCardSkeleton from "@/components/culture/PlacesCardSkeleton";
import { fetchPlaces } from "@/services/placeApi";
import { motion } from "framer-motion";

const Explore = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stateFilter, setStateFilter] = useState("All");
  const [deityFilter, setDeityFilter] = useState("All");
  const [search, setSearch] = useState("");

  // 🔁 Fetch places when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      loadPlaces();
    }, 400);

    return () => clearTimeout(timer);
  }, [stateFilter, deityFilter, search]);

  const loadPlaces = async () => {
    try {
      setLoading(true);

      const data = await fetchPlaces({
        state: stateFilter === "All" ? "" : stateFilter,
        deity: deityFilter === "All" ? "" : deityFilter,
        search,
      });

      setPlaces(data);
    } catch (error) {
      console.error("Failed to fetch places", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

     <section className="bg-[#f6f1ea] min-h-screen px-6 lg:px-12 py-14">
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="mb-10">
      <h1 className="text-5xl font-bold text-gray-900">
        Explore <span className="text-orange-600">Heritage</span>
      </h1>
      <p className="mt-3 text-gray-600 max-w-xl">
        Discover the timeless wonders and traditions of India.
      </p>
    </div>

    {/* Filters Container */}
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col lg:flex-row gap-4 items-center">

      {/* Search */}
      <input
        type="text"
        placeholder="Search heritage or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 bg-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Category / Deity */}
      <select
        value={deityFilter}
        onChange={(e) => setDeityFilter(e.target.value)}
        className="bg-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="All">All Categories</option>
        <option value="Shiva">Shiva</option>
        <option value="Parvati">Parvati</option>
        <option value="Jagannath">Jagannath</option>
      </select>

      {/* State */}
      <select
        value={stateFilter}
        onChange={(e) => setStateFilter(e.target.value)}
        className="bg-gray-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="All">All States</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Gujarat">Gujarat</option>
      </select>

    </div>

    {/* Grid */}
    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <PlacesCardSkeleton key={index} />
        ))
      ) : places.length > 0 ? (
        places.map((place) => (
          <motion.div
            key={place._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PlacesCard place={place} />
          </motion.div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-600">
          No places found for selected filters.
        </p>
      )}
    </div>

  </div>
</section>
    </>
  );
};

export default Explore;