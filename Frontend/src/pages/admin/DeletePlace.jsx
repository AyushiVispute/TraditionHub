import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { fetchPlaceById } from "@/services/placeApi";
import toast from "react-hot-toast";

const DeletePlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlace();
  }, []);

  const loadPlace = async () => {
    try {
      const data = await fetchPlaceById(id);
      setPlace(data);
    } catch (error) {
      toast.error("Failed to load place");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/places/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Place deleted successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to delete place");
    }
  };

  if (loading)
    return <p className="text-center mt-20">Loading...</p>;

  if (!place)
    return <p className="text-center mt-20">Place not found</p>;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#fffaf0] px-6 py-12">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

          <h1 className="text-2xl font-bold mb-6 text-red-600">
            Delete Place
          </h1>

          <p className="mb-4">
            Are you sure you want to delete:
          </p>

          <h2 className="text-xl font-semibold mb-6">
            {place.title}
          </h2>

          {place.images && place.images[0] && (
            <img
              src={place.images[0]}
              alt={place.title}
              className="w-full h-52 object-cover rounded mb-6"
            />
          )}

          <div className="flex justify-between">
            <button
              onClick={() => navigate("/admin")}
              className="px-6 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded"
            >
              Confirm Delete
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default DeletePlace;