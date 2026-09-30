import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Wallet, Users, Sparkles } from "lucide-react";
import { generateTrip } from "@/services/plannerApi";

const interestsList = [
  "Spiritual",
  "History",
  "Food",
  "Nature",
  "Photography",
];

const PlannerDrawer = ({ open, onClose, place }) => {
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(10000);
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState(["Spiritual"]);
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);

  const toggleInterest = (item) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await generateTrip({
        destination: place.title,
        days,
        budget,
        travelers,
        interests: interests.join(", "),
      });

      setTrip(res.trip);
    } catch (err) {
      console.error(err);
      alert("Failed to generate journey");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full md:w-[520px] h-screen bg-[#FAF7F2] z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 border-b bg-white sticky top-0 z-20 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#1D3557]">
                  Plan Your Journey
                </h2>
                <p className="text-gray-500">{place.title}</p>
              </div>

              <button onClick={onClose}>
                <X size={28} />
              </button>
            </div>

            {!trip && (
              <div className="p-6 space-y-6">
                <div className="bg-white rounded-2xl p-5 shadow">
                  <p className="font-semibold mb-2">Destination</p>
                  <input
                    disabled
                    value={place.title}
                    className="w-full p-3 rounded-xl bg-gray-100"
                  />
                </div>

                <div className="bg-white rounded-2xl p-5 shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays size={18} />
                    <h3 className="font-semibold">Trip Duration</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 5].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDays(d)}
                        className={`p-3 rounded-xl border ${
                          days === d
                            ? "bg-orange-500 text-white"
                            : "bg-white"
                        }`}
                      >
                        {d} Day
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Wallet size={18} />
                    <h3 className="font-semibold">Budget</h3>
                  </div>

                  <input
                    type="range"
                    min="3000"
                    max="50000"
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full"
                  />

                  <h2 className="text-2xl font-bold text-orange-600 mt-3">
                    ₹ {budget}
                  </h2>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} />
                    <h3 className="font-semibold">Travelers</h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        travelers > 1 && setTravelers(travelers - 1)
                      }
                      className="w-10 h-10 rounded-full bg-orange-100"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">
                      {travelers}
                    </span>

                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-10 h-10 rounded-full bg-orange-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow">
                  <h3 className="font-semibold mb-4">
                    Interests
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {interestsList.map((item) => (
                      <button
                        key={item}
                        onClick={() => toggleInterest(item)}
                        className={`px-4 py-2 rounded-full ${
                          interests.includes(item)
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-2xl font-bold flex justify-center items-center gap-2"
                >
                  <Sparkles size={20} />
                  Generate AI Journey
                </button>
              </div>
            )}

            {/* Part 2 (AI loading and itinerary UI) goes here */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlannerDrawer;