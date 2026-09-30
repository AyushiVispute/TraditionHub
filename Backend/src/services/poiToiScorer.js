/**
 * POI-TOI Scorer — uses your existing Gemini integration to score every
 * place against every Topic of Interest (0..1 relevance per TOI).
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME =
  process.env.GEMINI_MODEL || "gemini-1.5-flash";

function buildPrompt(place, tois) {
  const toiList = tois
    .map(
      (t, i) =>
        `${i + 1}. slug="${t.slug}" name="${t.name}" description="${t.description}" keywords=[${(
          t.keywords || []
        ).join(", ")}]`
    )
    .join("\n");

  return `You are the POI-TOI relevance scorer for a cultural-tourism recommender system.

Given ONE point of interest (POI) and a fixed list of Topics of Interest (TOIs),
output a relevance score between 0 and 1 (inclusive) for EACH TOI, representing
how conceptually close the POI is to that topic (1 = extremely relevant, 0 = unrelated).
Base your judgement only on the POI name/description text provided.

POI name: ${place.name}
POI description: ${place.description || ""}
POI category/tags: ${(place.tags || place.category || []).toString()}

TOIs:
${toiList}

Respond with ONLY a JSON object, no markdown, no commentary, in this exact shape:
{"<toi_slug>": <score>, "<toi_slug>": <score>, ...}
Include every TOI slug listed above, and nothing else.`;
}

function safeParseJson(text) {
  const cleaned = text
    .replace(/```json|```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

async function scorePlace(place, tois) {
  if (!tois || tois.length === 0) {
    return {};
  }

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
  });

  const prompt = buildPrompt(place, tois);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  let scores;

  try {
    scores = safeParseJson(text);
  } catch (err) {
    throw new Error(
      `POI-TOI scorer: failed to parse Gemini response for "${place.name}": ${err.message}`
    );
  }

  const clean = {};

  for (const toi of tois) {
    const raw = Number(scores[toi.slug]);

    clean[toi.slug] = Number.isFinite(raw)
      ? Math.min(1, Math.max(0, raw))
      : 0;
  }

  return clean;
}

async function rescoreAllPlaces(
  PlaceModel,
  ToiModel,
  { batchSize = 5 } = {}
) {
  const tois = await ToiModel.find({
    active: true,
  }).lean();

  const places = await PlaceModel.find({});

  let updated = 0;

  for (let i = 0; i < places.length; i += batchSize) {
    const batch = places.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (place) => {
        const scores = await scorePlace(place, tois);

        place.toiScores = scores;
        place.toiScoresUpdatedAt = new Date();

        await place.save();

        updated += 1;
      })
    );
  }

  return {
    total: places.length,
    updated,
    toiCount: tois.length,
  };
}

async function rescoreAllPlacesForToi(
  PlaceModel,
  toi,
  { batchSize = 5 } = {}
) {
  const places = await PlaceModel.find({});

  let updated = 0;

  for (let i = 0; i < places.length; i += batchSize) {
    const batch = places.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (place) => {
        const single = await scorePlace(place, [toi]);

        if (!place.toiScores) {
          place.toiScores = new Map();
        }

        place.toiScores.set(
          toi.slug,
          single[toi.slug]
        );

        place.toiScoresUpdatedAt = new Date();

        await place.save();

        updated += 1;
      })
    );
  }

  return {
    total: places.length,
    updated,
  };
}

export {
  scorePlace,
  rescoreAllPlaces,
  rescoreAllPlacesForToi,
};