import { useState } from "react";
import Navbar from "../../components/common/Navbar";

const traditions = [
  {
    title: "Diwali",
    desc: "Festival of lights symbolizing victory of light over darkness.",
    image: "/images/diwali.jpg",
  },
  {
    title: "Wari Yatra",
    desc: "Spiritual pilgrimage in Maharashtra devoted to Lord Vitthal.",
    image: "/images/wari.jpg",
  },
  {
    title: "Pongal",
    desc: "Harvest festival celebrated in Tamil Nadu.",
    image: "/images/pongal.jpg",
  },
];

const occasions = {
  Festivals: ["Diwali", "Navratri", "Holi", "Pongal"],
  Weddings: ["Haldi", "Mehendi", "Saptapadi"],
  Food: ["Thali", "Prasad", "Fasting Rituals"],
  Clothing: ["Saree", "Dhoti", "Pagdi"],
};

const states = {
  Maharashtra: ["Ganpati Festival", "Wari Yatra", "Paithani Saree"],
  Rajasthan: ["Ghoomar Dance", "Desert Festival"],
  TamilNadu: ["Pongal", "Bharatanatyam"],
};

const facts = [
  "Temple bells help improve focus and mental clarity.",
  "Applying kumkum has scientific and spiritual benefits.",
  "Many Indian festivals follow the lunar calendar.",
];

export default function Home() {
  const todayIndex = new Date().getDate() % traditions.length;
  const [activeOccasion, setActiveOccasion] = useState("Festivals");
  const [factIndex, setFactIndex] = useState(0);

  return (
    <div className="w-full">

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* 1️⃣ HERO SECTION (NO VIDEO NOW) */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-indigoDark to-black text-white">
        
        {/* 👉 WHEN YOU ADD VIDEO LATER, PUT IT HERE */}
        {/*
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/tradition-bg.mp4" type="video/mp4" />
        </video>
        */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-5xl font-bold mb-4">
            Preserving India’s{" "}
            <span className="text-saffron">Living Traditions</span>
          </h1>
          <p className="text-lg mb-6">
            Discover festivals, rituals, food, and culture passed through generations.
          </p>
          <button className="px-8 py-3 bg-saffron rounded-full text-lg">
            Explore Traditions
          </button>
        </div>
      </section>

      {/* 2️⃣ TRADITION OF THE DAY */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Tradition of the Day
        </h2>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <img
            src={traditions[todayIndex].image}
            alt={traditions[todayIndex].title}
            className="w-full md:w-1/2 rounded-xl"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-3">
              {traditions[todayIndex].title}
            </h3>
            <p className="text-gray-700 mb-4">
              {traditions[todayIndex].desc}
            </p>
            <button className="px-5 py-2 bg-indigoDark text-white rounded-full">
              Know More
            </button>
          </div>
        </div>
      </section>

      {/* 3️⃣ OCCASION-BASED TABS */}
      <section className="py-16 bg-cream px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore by Occasion
        </h2>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {Object.keys(occasions).map((item) => (
            <button
              key={item}
              onClick={() => setActiveOccasion(item)}
              className={`px-5 py-2 rounded-full ${
                activeOccasion === item
                  ? "bg-saffron text-white"
                  : "bg-white border"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="text-center">
          {occasions[activeOccasion].map((item) => (
            <p key={item} className="text-lg text-gray-700">
              • {item}
            </p>
          ))}
        </div>
      </section>

      {/* 4️⃣ STATE-WISE TRADITIONS */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Traditions by State
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.keys(states).map((state) => (
            <div key={state} className="p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">{state}</h3>
              {states[state].map((item) => (
                <p key={item} className="text-gray-600">
                  • {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ DID YOU KNOW */}
      <section className="py-16 bg-cream text-center px-8">
        <h2 className="text-3xl font-bold mb-6">Did You Know?</h2>
        <p className="text-lg mb-6">{facts[factIndex]}</p>
        <button
          onClick={() => setFactIndex((factIndex + 1) % facts.length)}
          className="px-6 py-2 bg-indigoDark text-white rounded-full"
        >
          Show Another Fact
        </button>
      </section>

      {/* 6️⃣ CTA */}
      <section className="py-20 bg-indigoDark text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Share & Preserve Your Culture
        </h2>
        <p className="mb-6">
          Every tradition matters. Be part of the community.
        </p>
        <button className="px-8 py-3 bg-saffron rounded-full text-lg">
          Share a Tradition
        </button>
      </section>

    </div>
  );
}
