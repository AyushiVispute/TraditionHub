import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Circle,
  XCircle,
  Loader2,
  Phone,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchMyGuideBookings } from "../../services/guideApi";

const MyGuideBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const data = await fetchMyGuideBookings(token);
      setBookings(data || []);
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to load guide requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  /* --------------------------------
     STATUS HELPERS
  -------------------------------- */

  const isAccepted = (status) =>
    ["accepted", "completed"].includes(status);

  const isCompleted = (status) =>
    status === "completed";

  const isRejected = (status) =>
    status === "rejected";

  /* --------------------------------
     STATUS TIMELINE
  -------------------------------- */

  const StatusTimeline = ({ status }) => {
    if (isRejected(status)) {
      return (
        <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-5">

          <div className="flex items-center gap-3">

            <XCircle
              size={28}
              className="text-red-500"
            />

            <div>
              <p className="font-semibold text-red-700">
                Request Declined
              </p>

              <p className="text-sm text-red-600 mt-1">
                This guide is not available for your requested booking.
              </p>
            </div>

          </div>

        </div>
      );
    }

    return (
      <div className="mt-6">

        <div className="flex items-center">

          {/* REQUESTED */}

          <div className="flex flex-col items-center">

            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2
                size={22}
                className="text-green-600"
              />
            </div>

            <p className="text-xs font-medium text-gray-700 mt-2">
              Requested
            </p>

          </div>


          {/* LINE */}

          <div
            className={`
              h-1 flex-1 mx-2 rounded
              ${
                isAccepted(status)
                  ? "bg-green-500"
                  : "bg-gray-200"
              }
            `}
          />


          {/* ACCEPTED */}

          <div className="flex flex-col items-center">

            <div
              className={`
                w-10 h-10 rounded-full
                flex items-center justify-center
                ${
                  isAccepted(status)
                    ? "bg-green-100"
                    : "bg-gray-100"
                }
              `}
            >

              {isAccepted(status) ? (
                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />
              ) : (
                <Circle
                  size={22}
                  className="text-gray-400"
                />
              )}

            </div>

            <p
              className={`
                text-xs font-medium mt-2
                ${
                  isAccepted(status)
                    ? "text-gray-700"
                    : "text-gray-400"
                }
              `}
            >
              {isAccepted(status)
                ? "Confirmed"
                : "Waiting"}
            </p>

          </div>


          {/* LINE */}

          <div
            className={`
              h-1 flex-1 mx-2 rounded
              ${
                isCompleted(status)
                  ? "bg-green-500"
                  : "bg-gray-200"
              }
            `}
          />


          {/* COMPLETED */}

          <div className="flex flex-col items-center">

            <div
              className={`
                w-10 h-10 rounded-full
                flex items-center justify-center
                ${
                  isCompleted(status)
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }
              `}
            >

              {isCompleted(status) ? (
                <CheckCircle2
                  size={22}
                  className="text-blue-600"
                />
              ) : (
                <Circle
                  size={22}
                  className="text-gray-400"
                />
              )}

            </div>

            <p
              className={`
                text-xs font-medium mt-2
                ${
                  isCompleted(status)
                    ? "text-blue-600"
                    : "text-gray-400"
                }
              `}
            >
              Completed
            </p>

          </div>

        </div>


        {/* WAITING MESSAGE */}

        {status === "pending" && (
          <div className="mt-5 flex items-center gap-3 bg-orange-50 rounded-xl p-4">

            <Loader2
              size={20}
              className="text-orange-500 animate-spin"
            />

            <div>
              <p className="font-medium text-orange-700">
                Waiting for guide confirmation
              </p>

              <p className="text-sm text-orange-600">
                Your request has been sent successfully.
              </p>
            </div>

          </div>
        )}


        {/* CONFIRMED MESSAGE */}

        {status === "accepted" && (
          <div className="mt-5 flex items-center gap-3 bg-green-50 rounded-xl p-4">

            <CheckCircle2
              size={20}
              className="text-green-600"
            />

            <div>
              <p className="font-medium text-green-700">
                Guide confirmed your request
              </p>

              <p className="text-sm text-green-600">
                Your local guide is ready for the experience.
              </p>
            </div>

          </div>
        )}

      </div>
    );
  };


  /* --------------------------------
     LOADING
  -------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">

        <div className="flex items-center gap-3 text-gray-500">

          <Loader2
            size={22}
            className="animate-spin"
          />

          Loading your guide requests...

        </div>

      </div>
    );
  }


  /* --------------------------------
     PAGE
  -------------------------------- */

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-28 pb-12 px-5">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-saffron font-semibold text-sm uppercase tracking-wider">
            Your Experiences
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            My Guide Requests
          </h1>

          <p className="text-gray-500 mt-2">
            Track your local guide bookings and experiences.
          </p>

        </div>


        {/* EMPTY */}

        {bookings.length === 0 ? (

          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">

            <User
              size={45}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl font-semibold mt-4">
              No guide requests yet
            </h2>

            <p className="text-gray-500 mt-2">
              Book a local guide to start your cultural experience.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-sm
                  border border-gray-100
                  overflow-hidden
                "
              >

                {/* BOOKING HEADER */}

                <div className="p-6">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    {/* GUIDE */}

                    <div className="flex items-center gap-4">

                      {booking.guide?.photo ? (

                        <img
                          src={booking.guide.photo}
                          alt={booking.guide.name}
                          className="
                            w-16 h-16
                            rounded-2xl
                            object-cover
                          "
                        />

                      ) : (

                        <div className="
                          w-16 h-16
                          rounded-2xl
                          bg-orange-100
                          flex items-center
                          justify-center
                        ">
                          <User
                            size={27}
                            className="text-orange-600"
                          />
                        </div>

                      )}

                      <div>

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Your Local Guide
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-1">
                          {booking.guide?.name}
                        </h2>

                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">

                          <MapPin size={14} />

                          {booking.guide?.city}
                          {booking.guide?.state
                            ? `, ${booking.guide.state}`
                            : ""}

                        </div>

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
                        ${
                          booking.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : booking.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {booking.status}
                    </span>

                  </div>


                  {/* TIMELINE */}

                  <StatusTimeline
                    status={booking.status}
                  />


                  {/* DETAILS */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-4
                      mt-7
                      pt-6
                      border-t
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <Calendar
                          size={19}
                          className="text-orange-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Date
                        </p>

                        <p className="font-semibold text-gray-800">
                          {booking.date}
                        </p>
                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                        <Clock
                          size={19}
                          className="text-orange-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Start Time
                        </p>

                        <p className="font-semibold text-gray-800">
                          {booking.startTime}
                        </p>
                      </div>

                    </div>


                    <div>

                      <p className="text-xs text-gray-400">
                        Experience
                      </p>

                      <p className="font-semibold text-gray-800">
                        {booking.hours} hour
                        {booking.hours > 1
                          ? "s"
                          : ""}
                      </p>

                      <p className="text-orange-600 font-bold mt-1">
                        ₹{booking.totalAmount}
                      </p>

                    </div>

                  </div>


                  {/* CONFIRMED ACTIONS */}

                  {booking.status === "accepted" && (
                    <div
                      className="
                        mt-6
                        pt-5
                        border-t
                        flex flex-col
                        sm:flex-row
                        gap-3
                      "
                    >

                      <button
                        className="
                          flex-1
                          flex items-center
                          justify-center gap-2
                          px-5 py-3
                          rounded-xl
                          bg-indigo-600
                          text-white
                          font-medium
                          hover:bg-indigo-700
                          transition
                        "
                        onClick={() =>
                          window.location.href =
                            `tel:${booking.guide?.phone || ""}`
                        }
                      >
                        <Phone size={18} />
                        Contact Guide
                      </button>


                      <button
                        className="
                          flex-1
                          flex items-center
                          justify-center gap-2
                          px-5 py-3
                          rounded-xl
                          border border-gray-200
                          text-gray-700
                          font-medium
                          hover:bg-gray-50
                          transition
                        "
                        onClick={() =>
                          toast("Messaging feature coming next")
                        }
                      >
                        <MessageCircle size={18} />
                        Message Guide
                      </button>

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyGuideBookings
