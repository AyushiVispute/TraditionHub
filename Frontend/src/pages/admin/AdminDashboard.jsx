import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPlaces: 0,
    totalUsers: 0,
    recentPlaces: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/places/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-10">
            TraditionHub Admin
          </h2>

          <ul className="space-y-5 text-gray-700 font-medium">
            <li>
              <Link to="/admin" className="hover:text-orange-600 transition">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/admin/add-place" className="hover:text-orange-600 transition">
                Add Place
              </Link>
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="text-red-600 font-medium hover:text-red-800 transition mt-10"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10 text-gray-800">
          Welcome Back, Admin 👋
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg mb-3">
              Total Places
            </h3>
            <p className="text-4xl font-bold text-orange-600">
              {stats.totalPlaces}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition">
            <h3 className="text-gray-500 text-lg mb-3">
              Total Users
            </h3>
            <p className="text-4xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
          </div>

        </div>

        {/* Recent Places Table */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">
            Recent Places
          </h2>

          {stats.recentPlaces.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No places available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="py-3">Name</th>
                    <th className="py-3">Location</th>
                    <th className="py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentPlaces.map((place) => (
                    <tr
                      key={place._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 font-medium">
                        {place.title}
                      </td>

                      <td className="py-4">
                        {place.location}
                      </td>

                      <td className="py-4 text-center space-x-4">

                        <Link
                          to={`/places/${place._id}`}
                          className="text-orange-600 hover:underline"
                        >
                          View
                        </Link>

                        <Link
                          to={`/admin/edit/${place._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>

                        <Link
                          to={`/admin/delete-place/${place._id}`}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </Link>

                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;