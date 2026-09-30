import { useState, useEffect } from 'react';
import { Star, Clock } from 'lucide-react';

function formatArrival(minutesFromStart, startHour = 9) {
  const totalMinutes = startHour * 60 + minutesFromStart;
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

export default function PlannerResult({ itineraries }) {
  const [activeItinerary, setActiveItinerary] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    setActiveItinerary(0);
    setActiveDay(0);
  }, [itineraries]);

  if (!itineraries?.length) return null;

  const itinerary = itineraries[activeItinerary];
  const day = itinerary.days[activeDay];

  return (
    <div className="mt-8">
      {itineraries.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {itineraries.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveItinerary(i);
                setActiveDay(0);
              }}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                activeItinerary === i
                  ? 'bg-orange-500 text-white font-medium'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Itinerary {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {itinerary.days.length > 1 && (
          <div className="flex border-b overflow-x-auto">
            {itinerary.days.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(i)}
                className={`px-5 py-3 text-sm whitespace-nowrap border-b-2 ${
                  activeDay === i
                    ? 'border-orange-500 text-orange-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> ~{Math.round(day.total_minutes / 60)}h {day.total_minutes % 60}m total
            </span>
            <span>{day.stops.length} stops</span>
          </div>

          {day.stops.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No stops fit this day's constraints.</div>
          ) : (
            <ol className="relative border-l-2 border-orange-100 ml-3 space-y-6">
              {day.stops.map((stop, idx) => (
                <li key={stop.id} className="ml-5 relative">
                  <span className="absolute -left-[27px] top-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{stop.name}</div>
                      <div className="text-sm text-gray-500">
                        Arrive ~{formatArrival(stop.arrival_minute)} · {stop.visit_minutes} min visit
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-sm shrink-0">
                      <Star size={14} fill="currentColor" />
                      {(stop.prize * 100).toFixed(0)}%
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}