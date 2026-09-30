/**
 * Seeds the six TOIs from the CHIP paper. Edit names/keywords to fit your
 * content, then run:  node src/seed/seedTois.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import Toi from "./models/Toi.js";
dotenv.config();

const TOIS = [
  {
    name: 'Culture',
    description: 'Museums, art, history, monuments, and cultural heritage sites.',
    keywords: ['museum', 'art', 'history', 'monument', 'heritage', 'exhibition'],
    icon: '🎭',
  },
  {
    name: 'Religion',
    description: 'Churches, temples, shrines, and places of spiritual significance.',
    keywords: ['faith', 'temple', 'church', 'shrine', 'sacred', 'ritual', 'worship'],
    icon: '🛕',
  },
  {
    name: 'Landscape',
    description: 'Natural scenery, parks, mountains, lakes, and scenic viewpoints.',
    keywords: ['nature', 'park', 'mountain', 'lake', 'scenic', 'viewpoint', 'trail'],
    icon: '🏞️',
  },
  {
    name: 'Craftsmanship',
    description: 'Local artisans, traditional crafts, workshops, and handmade goods.',
    keywords: ['artisan', 'craft', 'handmade', 'workshop', 'pottery', 'weaving'],
    icon: '🧵',
  },
  {
    name: 'Sports',
    description: 'Sporting venues, outdoor activities, and adventure experiences.',
    keywords: ['stadium', 'hiking', 'cycling', 'adventure', 'outdoor', 'sport'],
    icon: '⚽',
  },
  {
    name: 'Food & Wine',
    description: 'Local cuisine, wineries, food markets, and culinary experiences.',
    keywords: ['food', 'wine', 'cuisine', 'market', 'restaurant', 'tasting'],
    icon: '🍷',
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  for (const t of TOIS) {
    await Toi.findOneAndUpdate({ name: t.name }, t, { upsert: true, new: true });
  }
  console.log(`Seeded ${TOIS.length} TOIs.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});