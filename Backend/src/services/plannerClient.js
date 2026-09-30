const OPTIMIZER_URL =
  process.env.OPTIMIZER_URL || "http://127.0.0.1:8000";

export const computeItinerary = async ({
  depot,
  rankedPlaces = [],
  days = 1,
  maxDailyMinutes = 480,
  maxVisitMinutes = 180,
  mustInclude = [],
  mustExclude = [],
  transportMean = "car",
  numAlternatives = 3,
}) => {
  const excluded = new Set(mustExclude.map(String));
  const required = new Set(mustInclude.map(String));

  const pois = rankedPlaces
    .filter((place) => !excluded.has(String(place._id)))
    .filter(
  (place) =>
    place.coordinates &&
    typeof place.coordinates.lat === "number" &&
    typeof place.coordinates.lng === "number"
)
   .filter(
  (place) =>
    place.coordinates &&
    typeof place.coordinates.lat === "number" &&
    typeof place.coordinates.lng === "number"
)
    .map((place) => ({
  id: String(place._id),

  name: place.title,

  lat: Number(place.coordinates.lat),

  lng: Number(place.coordinates.lng),

  prize: Math.max(
    0,
    Math.min(
      1,
      Number(
        place.preferenceScore ??
        place.score ??
        0.5
      )
    )
  ),

  visit_minutes: Number(
    place.avgVisitMinutes || 45
  ),

  must_include: required.has(
    String(place._id)
  ),
}));
  if (!pois.length) {
    throw new Error("No valid places available for optimization.");
  }

  const response = await fetch(`${OPTIMIZER_URL}/optimize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      depot: {
        lat: Number(depot.lat),
        lng: Number(depot.lng),
      },
      pois,
      days: Number(days),
      max_daily_minutes: Number(maxDailyMinutes),
      transport_mean: transportMean,
      num_alternatives: Number(numAlternatives),
    }),
  });

  if (!response.ok) {
    const text = await response.text();

    const error = new Error(
      `Optimizer returned ${response.status}: ${text}`
    );

    error.status = response.status;

    throw error;
  }

  return await response.json();
};