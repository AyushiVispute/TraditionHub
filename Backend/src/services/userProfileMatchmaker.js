/**
 * User-Profile Matchmaker
 *
 * Ranks POIs by cosine similarity between the
 * user's TOI preference vector and each POI's
 * TOI relevance vector.
 */

export function cosineSimilarity(vecA, vecB) {
  const keys = new Set([
    ...Object.keys(vecA),
    ...Object.keys(vecB),
  ]);

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const k of keys) {
    const a = Number(vecA[k] || 0);
    const b = Number(vecB[k] || 0);

    dot += a * b;
    magA += a * a;
    magB += b * b;
  }

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function normalisePreferenceVector(toiPreferences) {
  const obj =
    toiPreferences instanceof Map
      ? Object.fromEntries(toiPreferences)
      : toiPreferences || {};

  const out = {};

  for (const [slug, rating] of Object.entries(obj)) {
    out[slug] = Math.min(
      1,
      Math.max(0, Number(rating) / 10)
    );
  }

  return out;
}

export function toiScoresToVector(toiScores) {
  if (toiScores instanceof Map) {
    return Object.fromEntries(toiScores);
  }

  return toiScores || {};
}

export function rankPlaces(
  places,
  toiPreferences,
  { minSimilarity = 0 } = {}
) {
  const p = normalisePreferenceVector(toiPreferences);

  const ranked = places.map((place) => {
    const v = toiScoresToVector(place.toiScores);

    const similarity = cosineSimilarity(p, v);

    const topToi = Object.entries(v)
      .filter(([slug]) => p[slug] > 0)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

    const placeObj = place.toObject
      ? place.toObject()
      : { ...place };

    return {
      ...placeObj,
      similarity,
      preferenceScore: similarity,
      topToi,
    };
  });

  return ranked
    .filter((place) => place.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity);
}