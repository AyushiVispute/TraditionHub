import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Check,
  X,
  Loader2,
  IndianRupee,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  fetchAllGuideBookings,
  updateGuideBookingStatus,
} from "../../services/guideApi";

export default function GuideBookingRequests() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadBookings = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const data = await fetchAllGuideBookings(token);

      setBookings(data || []);
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to load booking requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (bookingId, status) => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      setUpdatingId(bookingId);

      await updateGuideBookingStatus(
        bookingId,
        status,
        token
      );

      toast.success(
        `Booking ${status} successfully`
      );

      await loadBookings();
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to update booking"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2
            className="animate-spin"
            size={22}
          />
          Loading booking requests...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-28 pb-12 px-5">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-saffron font-semibold text-sm uppercase tracking-wider">
            Guide Management
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Guide Booking Requests
          </h1>

          <p className="text-gray-500 mt-2">
            Review and manage requests from travelers.
          </p>

        </div>


        {/* EMPTY STATE */}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">

            <Calendar
              size={48}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              No booking requests
            </h2>

            <p className="text-gray-500 mt-2">
              New guide booking requests will appear here.
            </p>

          </div>
        ) : (

          /* BOOKINGS */

          <div className="space-y-5">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="
                  bg-white
                  rounded-2xl
                  border border-gray-100
                  shadow-sm
                  p-6
                  hover:shadow-md
                  transition
                "
              >

                {/* TOP */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* USER */}

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-14 h-14
                        rounded-full
                        bg-indigo-50
                        flex items-center justify-center
                      "
                    >
                      <User
                        size={24}
                        className="text-indigo-600"
                      />
                    </div>

                    <div>

                      <h2 className="font-semibold text-lg text-gray-900">
                        {booking.user?.name ||
                          "Traveler"}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {booking.user?.email ||
                          "No email"}
                      </p>

                    </div>

                  </div>


                  {/* STATUS */}

                  <span
                    className={`
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-semibold
                      capitalize
                      w-fit
                      ${getStatusStyle(
                        booking.status
                      )}
                    `}
                  >
                    {booking.status}
                  </span>

                </div>


                {/* GUIDE */}

                <div
                  className="
                    mt-5
                    p-4
                    rounded-xl
                    bg-gray-50
                    flex flex-col md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                  "
                >

                  <div>

                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Requested Guide
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {booking.guide?.name ||
                        "Guide"}
                    </p>

                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin size={14} />
                      {booking.guide?.city}
                      {booking.guide?.state
                        ? `, ${booking.guide.state}`
                        : ""}
                    </div>

                  </div>

                </div>


                {/* DETAILS */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-4
                    mt-5
                  "
                >

                  {/* DATE */}

                  <div className="flex items-center gap-3">

                    <Calendar
                      size={20}
                      className="text-saffron"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Date
                      </p>

                      <p className="font-medium text-gray-800">
                        {booking.date}
                      </p>
                    </div>

                  </div>


                  {/* TIME */}

                  <div className="flex items-center gap-3">

                    <Clock
                      size={20}
                      className="text-saffron"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Time
                      </p>

                      <p className="font-medium text-gray-800">
                        {booking.startTime}
                      </p>
                    </div>

                  </div>


                  {/* HOURS */}

                  <div>

                    <p className="text-xs text-gray-400">
                      Duration
                    </p>

                    <p className="font-medium text-gray-800">
                      {booking.hours} hour
                      {booking.hours > 1
                        ? "s"
                        : ""}
                    </p>

                  </div>


                  {/* PRICE */}

                  <div>

                    <p className="text-xs text-gray-400">
                      Total Amount
                    </p>

                    <div className="flex items-center gap-1 text-lg font-bold text-saffron">
                      <IndianRupee size={17} />
                      {booking.totalAmount}
                    </div>

                  </div>

                </div>


                {/* MESSAGE */}

                {booking.message && (
                  <div className="mt-5">

                    <p className="text-xs text-gray-400 mb-1">
                      Traveler Message
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm">
                      {booking.message}
                    </div>

                  </div>
                )}


                {/* ACTIONS */}

                {booking.status === "pending" && (

                  <div
                    className="
                      mt-6
                      pt-5
                      border-t
                      flex
                      flex-col sm:flex-row
                      gap-3
                      justify-end
                    "
                  >

                    <button
                      disabled={
                        updatingId ===
                        booking._id
                      }
                      onClick={() =>
                        handleStatusChange(
                          booking._id,
                          "rejected"
                        )
                      }
                      className="
                        flex items-center
                        justify-center gap-2
                        px-5 py-2.5
                        rounded-xl
                        border border-red-200
                        text-red-600
                        hover:bg-red-50
                        transition
                        disabled:opacity-50
                      "
                    >
                      <X size={18} />
                      Reject
                    </button>


                    <button
                      disabled={
                        updatingId ===
                        booking._id
                      }
                      onClick={() =>
                        handleStatusChange(
                          booking._id,
                          "accepted"
                        )
                      }
                      className="
                        flex items-center
                        justify-center gap-2
                        px-5 py-2.5
                        rounded-xl
                        bg-green-600
                        text-white
                        hover:bg-green-700
                        transition
                        disabled:opacity-50
                      "
                    >
                      {updatingId ===
                      booking._id ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <Check size={18} />
                      )}

                      Accept
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}