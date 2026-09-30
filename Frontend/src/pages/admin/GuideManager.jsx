import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Star,
  Users,
  IndianRupee,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const GuideManager = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGuides = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/guides`
      );

      setGuides(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load guides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guide?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/guides/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Guide deleted successfully");

      setGuides((prev) =>
        prev.filter((guide) => guide._id !== id)
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete guide"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] flex">

      {/* SIDEBAR */}

      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col">

        <Link
          to="/admin"
          className="no-underline"
        >
          <h2 className="text-2xl font-bold text-orange-600">
            TraditionHub
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            ADMIN PANEL
          </p>
        </Link>

        <nav className="mt-10 space-y-2">

          <Link
            to="/admin"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
              transition
            "
          >
            Dashboard
          </Link>

          <Link
            to="/admin/add-place"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
              transition
            "
          >
            Add Place
          </Link>

          <Link
            to="/admin/tois"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
              transition
            "
          >
            Manage Topics
          </Link>

          <Link
            to="/admin/guides"
            className="
              block px-4 py-3 rounded-xl
              bg-orange-50
              text-orange-600
              font-semibold
              no-underline
            "
          >
            Manage Guides
          </Link>

          <Link
            to="/guide-booking-requests"
            className="
              block px-4 py-3 rounded-xl
              text-gray-600
              hover:bg-orange-50
              hover:text-orange-600
              no-underline
              transition
            "
          >
            Guide Requests
          </Link>

        </nav>

      </aside>


      {/* MAIN */}

      <main className="flex-1 p-8 lg:p-10">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              Local Guides
            </p>

            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              Guide Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your verified local cultural guides.
            </p>
          </div>

          <Link
            to="/admin/guides/add"
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-3
              rounded-xl
              bg-orange-600
              text-white
              font-semibold
              no-underline
              hover:bg-orange-700
              transition
            "
          >
            <Plus size={19} />
            Add Guide
          </Link>

        </div>


        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100">
            <p className="text-sm text-gray-500">
              Total Guides
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {guides.length}
            </p>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
            <p className="text-sm text-gray-500">
              Available Guides
            </p>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {
                guides.filter(
                  (guide) => guide.available
                ).length
              }
            </p>
          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
            <p className="text-sm text-gray-500">
              Verified Guides
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {
                guides.filter(
                  (guide) => guide.verified
                ).length
              }
            </p>
          </div>

        </div>


        {/* GUIDE LIST */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="px-6 py-5 border-b flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                All Guides
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {guides.length} guide
                {guides.length !== 1 ? "s" : ""} registered
              </p>
            </div>

          </div>


          {loading ? (

            <div className="p-12 text-center text-gray-500">
              Loading guides...
            </div>

          ) : guides.length === 0 ? (

            <div className="p-12 text-center">

              <Users
                size={45}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 font-semibold text-gray-800">
                No guides found
              </h3>

              <p className="text-gray-500 mt-1">
                Add your first local guide.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr className="text-left text-sm text-gray-500">

                    <th className="px-6 py-4">
                      Guide
                    </th>

                    <th className="px-6 py-4">
                      Location
                    </th>

                    <th className="px-6 py-4">
                      Experience
                    </th>

                    <th className="px-6 py-4">
                      Rating
                    </th>

                    <th className="px-6 py-4">
                      Price
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {guides.map((guide) => (

                    <tr
                      key={guide._id}
                      className="
                        border-t
                        hover:bg-gray-50
                        transition
                      "
                    >

                      {/* GUIDE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          {guide.photo ? (

                            <img
                              src={guide.photo}
                              alt={guide.name}
                              className="
                                w-12 h-12
                                rounded-full
                                object-cover
                              "
                            />

                          ) : (

                            <div
                              className="
                                w-12 h-12
                                rounded-full
                                bg-orange-100
                                text-orange-600
                                flex items-center
                                justify-center
                                font-bold
                              "
                            >
                              {guide.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>

                          )}

                          <div>

                            <p className="font-semibold text-gray-900">
                              {guide.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {guide.email}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* LOCATION */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-1 text-gray-600">

                          <MapPin size={15} />

                          <span>
                            {guide.city}
                            {guide.state
                              ? `, ${guide.state}`
                              : ""}
                          </span>

                        </div>

                      </td>


                      {/* EXPERIENCE */}

                      <td className="px-6 py-5">

                        <span className="text-gray-700">
                          {guide.experienceYears || 0} years
                        </span>

                      </td>


                      {/* RATING */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-1">

                          <Star
                            size={16}
                            className="text-yellow-500 fill-yellow-500"
                          />

                          <span className="font-semibold">
                            {guide.rating || 0}
                          </span>

                          <span className="text-xs text-gray-400">
                            ({guide.totalReviews || 0})
                          </span>

                        </div>

                      </td>


                      {/* PRICE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-1 font-semibold text-gray-800">

                          <IndianRupee size={15} />

                          {guide.pricePerHour || 0}

                          <span className="text-xs text-gray-400">
                            /hr
                          </span>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-5">

                        {guide.available ? (

                          <span className="
                            inline-flex items-center gap-1
                            px-3 py-1
                            rounded-full
                            bg-green-100
                            text-green-700
                            text-xs
                            font-semibold
                          ">
                            <CheckCircle size={13} />
                            Available
                          </span>

                        ) : (

                          <span className="
                            inline-flex items-center gap-1
                            px-3 py-1
                            rounded-full
                            bg-gray-100
                            text-gray-600
                            text-xs
                            font-semibold
                          ">
                            <XCircle size={13} />
                            Unavailable
                          </span>

                        )}

                      </td>


                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <Link
                            to={`/admin/guides/edit/${guide._id}`}
                            className="
                              p-2
                              rounded-lg
                              text-blue-600
                              hover:bg-blue-50
                              transition
                            "
                            title="Edit Guide"
                          >
                            <Pencil size={18} />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                guide._id
                              )
                            }
                            className="
                              p-2
                              rounded-lg
                              text-red-600
                              hover:bg-red-50
                              transition
                            "
                            title="Delete Guide"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default GuideManager;