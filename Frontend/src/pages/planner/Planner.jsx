import { useState } from 'react';
import toast from 'react-hot-toast';
import { MapPin, Clock, Calendar, Footprints, Bike, Car, Loader2 } from 'lucide-react';
import { generateItinerary } from '../../services/plannerApi';
import PlannerResult from './PlannerResult';

const TRANSPORT_OPTIONS = [
  { value: 'car', label: 'Car', icon: Car },
  { value: 'bicycle', label: 'Bicycle', icon: Bike },
  { value: 'foot', label: 'On foot', icon: Footprints },
];

export default function Planner() {
  const [depot, setDepot] = useState({ lat: '', lng: '' });
  const [days, setDays] = useState(1);
  const [maxDailyMinutes, setMaxDailyMinutes] = useState(480);
  const [maxVisitMinutes, setMaxVisitMinutes] = useState(180);
  const [transportMean, setTransportMean] = useState('car');
  const [numAlternatives, setNumAlternatives] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not available in this browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setDepot({ lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) }),
      () => toast.error('Could not get your location')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lat = Number(depot.lat);
    const lng = Number(depot.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      toast.error('Enter a valid starting location (latitude & longitude)');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await generateItinerary({
        depot: { lat, lng },
        days: Number(days),
        maxDailyMinutes: Number(maxDailyMinutes),
        maxVisitMinutes: Number(maxVisitMinutes),
        transportMean,
        numAlternatives: Number(numAlternatives),
      });
      if (!data.itineraries?.length) {
        toast.error('No itinerary could be built with these constraints — try relaxing them.');
        return;
      }
      setResult(data);
    } catch (err) {
      if (err?.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err?.response?.status === 503) {
        toast.error('Planner is temporarily unavailable. Please try again shortly.');
      } else if (err?.response?.status === 422) {
        toast.error('No feasible itinerary found — try more days or a longer daily budget.');
      } else {
        toast.error('Something went wrong generating your itinerary.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1">Plan your trip</h1>
      <p className="text-gray-500 mb-6">
        Built from your topic preferences — set your constraints and we'll build a day-by-day route.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5 space-y-5">
        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-1.5">
            <MapPin size={16} /> Starting point
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={depot.lat}
              onChange={(e) => setDepot((d) => ({ ...d, lat: e.target.value }))}
              className="flex-1 border rounded-lg px-3 py-2"
              required
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={depot.lng}
              onChange={(e) => setDepot((d) => ({ ...d, lng: e.target.value }))}
              className="flex-1 border rounded-lg px-3 py-2"
              required
            />
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 whitespace-nowrap"
            >
              Use my location
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-1.5">
              <Calendar size={16} /> Days
            </label>
            <input
              type="number"
              min={1}
              max={14}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-1.5">
              <Clock size={16} /> Max hours/day
            </label>
            <input
              type="number"
              min={1}
              max={16}
              value={maxDailyMinutes / 60}
              onChange={(e) => setMaxDailyMinutes(Number(e.target.value) * 60)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Skip places that take longer than (minutes)
          </label>
          <input
            type="number"
            min={15}
            step={15}
            value={maxVisitMinutes}
            onChange={(e) => setMaxVisitMinutes(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Getting around</label>
          <div className="flex gap-2">
            {TRANSPORT_OPTIONS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTransportMean(value)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm ${
                  transportMean === value
                    ? 'border-orange-500 bg-orange-50 text-orange-600 font-medium'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Alternative itineraries</label>
          <input
            type="number"
            min={1}
            max={5}
            value={numAlternatives}
            onChange={(e) => setNumAlternatives(e.target.value)}
            className="w-24 border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? 'Building your itinerary...' : 'Generate itinerary'}
        </button>
      </form>

      {result && <PlannerResult itineraries={result.itineraries} />}
    </div>
  );
}