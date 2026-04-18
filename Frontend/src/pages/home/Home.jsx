import { useState } from "react";
import Navbar from "../../components/common/Navbar";

const traditions = [
  {
    title: "Diwali",
    desc: "Festival of lights symbolizing victory of light over darkness.",
    image: "/src/assets/diwali.jpg",
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
  "Tamil Nadu" : ["Pongal", "Bharatanatyam"],
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
    <div className="w-full bg-white text-gray-800">

      <Navbar />

      {/* 1️⃣ HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero-india.jpg"
          alt="Indian Culture"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Preserving India’s{" "}
            <span className="text-saffron">Living Traditions</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Discover the stories, rituals, festivals, and heritage
            passed through generations.
          </p>

          <button className="mt-8 px-8 py-3 bg-saffron hover:bg-orange-600 transition rounded-full text-lg shadow-lg">
            Explore Traditions
          </button>
        </div>
        
      </section>
      {/* FEATURED */}
<section className="py-24 bg-white text-center">
  <h2 className="text-4xl font-bold mb-12">
    Featured Traditions
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {traditions.slice(0, 3).map((item) => (
      <div key={item.title} className="rounded-2xl shadow-lg overflow-hidden">
        <img src={item.image} className="h-64 w-full object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      

      {/* 6️⃣ CTA */}
      <section className="py-24 bg-indigoDark text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Share & Preserve Your Culture
        </h2>

        <p className="mb-6 text-gray-200">
          Every tradition matters. Be part of the community.
        </p>

        <button className="px-8 py-3 bg-saffron rounded-full text-lg shadow-lg hover:bg-orange-600 transition">
          Share a Tradition
        </button>
      </section>

    </div>
  );
}