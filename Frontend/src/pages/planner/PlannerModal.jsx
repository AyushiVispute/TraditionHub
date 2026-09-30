import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { generateTrip } from "../../services/plannerApi";

const PlannerModal = ({ place, onClose }) => {
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(10000);
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState("History, Food");
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await generateTrip({
        destination: place.title,
        days,
        budget,
        travelers,
        interests,
      });

      console.log(res.trip);

      setTrip(res.trip);
    } catch (error) {
      console.error(error);
      alert("Failed to generate journey");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">

      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-orange-600">
              🧳 Plan Your Journey
            </h2>

            <p className="text-gray-500 mt-1">
              {place.title}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            <X />
          </button>

        </div>

        {/* Form */}

        {!trip && (

          <div className="p-8 space-y-6">

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold">
                  Destination
                </label>

                <input
                  disabled
                  value={place.title}
                  className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Days
                </label>

                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full mt-2 border rounded-xl p-3"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Budget
                </label>

                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full mt-2 border rounded-xl p-3"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Travelers
                </label>

                <input
                  type="number"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full mt-2 border rounded-xl p-3"
                />

              </div>

              <div className="md:col-span-2">

                <label className="font-semibold">
                  Interests
                </label>

                <input
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full mt-2 border rounded-xl p-3"
                  placeholder="History, Food, Nature..."
                />

              </div>

            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl p-4 font-bold flex justify-center items-center gap-3"
            >

              <Sparkles size={20} />

              {loading ? "Generating AI Journey..." : "Generate AI Journey"}

            </button>

          </div>

        )}

        {/* Loading */}

        {loading && !trip && (

          <div className="text-center py-16">

            <div className="animate-spin rounded-full h-14 w-14 border-4 border-orange-600 border-t-transparent mx-auto"></div>

            <h2 className="mt-6 text-2xl font-bold">
              TraditionHub AI
            </h2>

            <p className="text-gray-500 mt-2">
              Creating your perfect journey...
            </p>

          </div>

        )}

        {/* Result */}

        {trip && (

          <div className="p-8">

            <h2 className="text-3xl font-bold text-orange-600">
              {trip.title || place.title}
            </h2>

            <p className="mt-4 text-gray-600">
              {trip.summary}
            </p>

            <div className="mt-8">

              {trip.itinerary?.map((day) => (

                <div
                  key={day.day}
                  className="mb-10 border-l-4 border-orange-500 pl-5"
                >

                  <h3 className="text-2xl font-bold mb-5">
                    📅 Day {day.day}
                  </h3>

                  {day.activities?.map((activity, index) => (

                    <div
                      key={index}
                      className="bg-orange-50 rounded-xl p-5 mb-4 shadow-sm"
                    >

                      <h4 className="font-bold text-orange-600">
                        {activity.time}
                      </h4>

                      <p className="mt-2">
                        {activity.description}
                      </p>

                      {activity.food_suggestion && (

                        <p className="mt-3 text-green-700">
                          🍽 {activity.food_suggestion}
                        </p>

                      )}

                    </div>

                  ))}

                </div>

              ))}

            </div>

            {trip.travelTips && (

              <div className="mt-10">

                <h2 className="text-2xl font-bold mb-4">
                  💡 Travel Tips
                </h2>

                <ul className="space-y-3">

                  {trip.travelTips.map((tip, index) => (

                    <li
                      key={index}
                      className="bg-yellow-50 p-4 rounded-xl"
                    >
                      {tip}
                    </li>

                  ))}

                </ul>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default PlannerModal;