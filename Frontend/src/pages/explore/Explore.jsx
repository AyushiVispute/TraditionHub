import { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import PlacesCard from "@/components/culture/PlacesCard";
import PlacesCardSkeleton from "@/components/culture/PlacesCardSkeleton";
import { fetchPlaces } from "@/services/placeApi";

const Explore = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stateFilter, setStateFilter] = useState("All");
  const [deityFilter, setDeityFilter] = useState("All");
  const [search, setSearch] = useState("");

  const isAdmin = localStorage.getItem("role") === "admin";

  // 🔁 Fetch places (with debounce for search)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadPlaces();
    }, 400);

    return () => clearTimeout(timer);
  }, [stateFilter, deityFilter, search]);

  const loadPlaces = async () => {
    setLoading(true);
    try {
      const data = await fetchPlaces({
        state: stateFilter !== "All" ? stateFilter : "",
        deity: deityFilter !== "All" ? deityFilter : "",
        search,
      });
      setPlaces(data);
    } catch (error) {
      console.error("Failed to fetch places", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Admin delete place
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this place?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/places/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPlaces((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete place");
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-ivory min-h-screen px-8 py-12">
        {/* Heading */}
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-indigoDark">
            Explore Sacred <span className="text-saffron">Places</span>
          </h1>

          <p className="mt-4 text-indigoDark/70 max-w-2xl mx-auto">
            Discover India’s most revered temples, their spiritual meaning,
            cultural history, and architectural beauty.
          </p>
        </div>

        {/* Admin Add Button */}
        {isAdmin && (
          <div className="text-center mt-8">
            <a
              href="/admin/add-place"
              className="inline-block bg-saffron text-white px-6 py-2 rounded-md shadow hover:opacity-90"
            >
              + Add New Place
            </a>
          </div>
        )}

        {/* Filters */}
        <div className="max-w-7xl mx-auto mt-8 flex flex-wrap justify-center gap-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search temples or heritage sites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-goldMuted/40 bg-white px-4 py-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-saffron"
          />

          {/* State Filter */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="border border-goldMuted/40 bg-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
          >
            <option value="All">All States</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Gujarat">Gujarat</option>
          </select>

          {/* Deity Filter */}
          <select
            value={deityFilter}
            onChange={(e) => setDeityFilter(e.target.value)}
            className="border border-goldMuted/40 bg-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
          >
            <option value="All">All Deities</option>
            <option value="Shiva">Lord Shiva</option>
            <option value="Parvati">Goddess Meenakshi</option>
            <option value="Jagannath">Lord Jagannath</option>
          </select>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <PlacesCardSkeleton key={index} />
            ))
          ) : places.length > 0 ? (
            places.map((place) => (
              <div key={place._id} className="relative">
                <PlacesCard place={place} />

                {/* Admin Delete Button */}
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(place._id)}
                    className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs shadow"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-indigoDark">
              No places found for selected filters.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Explore;
