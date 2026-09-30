import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Sparkles,
  Compass,
  Users,
  ArrowRight,
  CalendarDays,
  Bot,
  ShieldCheck,
  Heart,
} from "lucide-react";

import diwali from "../../assets/diwali.jpg";
import wari from "../../assets/Wari.jpg";
import pongal from "../../assets/pongal.jpg";

const traditions = [
  {
    title: "Diwali",
    category: "Festival",
    desc: "Festival of lights symbolizing the victory of light over darkness.",
    image: diwali,
  },
  {
    title: "Wari Yatra",
    category: "Spiritual Journey",
    desc: "A centuries-old pilgrimage in Maharashtra devoted to Lord Vitthal.",
    image: wari,
  },
  {
    title: "Pongal",
    category: "Harvest Festival",
    desc: "A vibrant harvest celebration deeply rooted in Tamil culture.",
    image: pongal,
  },
];

const categories = [
  {
    title: "Festivals",
    icon: "🎉",
    description: "Discover celebrations, rituals and traditions.",
  },
  {
    title: "Heritage",
    icon: "🏛️",
    description: "Explore historic places and cultural landmarks.",
  },
  {
    title: "Food",
    icon: "🍛",
    description: "Experience authentic regional cuisines.",
  },
  {
    title: "Spirituality",
    icon: "🪔",
    description: "Explore sacred places and spiritual traditions.",
  },
  {
    title: "Arts & Crafts",
    icon: "🎨",
    description: "Discover India's living artistic traditions.",
  },
  {
    title: "Local Culture",
    icon: "🌿",
    description: "Connect with communities and local stories.",
  },
];

const features = [
  {
    icon: Compass,
    title: "Discover",
    description:
      "Find culturally meaningful places, traditions and experiences across India.",
  },
  {
    icon: Sparkles,
    title: "Personalize",
    description:
      "Tell us what interests you and receive experiences matched to your preferences.",
  },
  {
    icon: CalendarDays,
    title: "Plan",
    description:
      "Create an optimized cultural itinerary based on your time and interests.",
  },
  {
    icon: Users,
    title: "Connect",
    description:
      "Meet local guides who can help you experience destinations authentically.",
  },
];

const plannerPlaces = [
  ["09:00", "Trimbakeshwar Temple"],
  ["11:30", "Panchavati Heritage"],
  ["14:00", "Local Food Experience"],
  ["16:30", "Cultural Walk"],
];

const guideHighlights = [
  { icon: "🏛️", title: "Local Stories" },
  { icon: "🍛", title: "Authentic Food" },
  { icon: "🪔", title: "Living Traditions" },
  { icon: "🗺️", title: "Hidden Places" },
];

export default function Home() {
  return (
    <main className="w-full bg-[#faf7f2] text-[#172033]">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dfwyuhvpf/video/upload/v1765105450/v1_c7qyaw.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="relative z-10 flex min-h-[92vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                🇮🇳 Discover India&apos;s living heritage
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
                Discover India
                <span className="block text-saffron">
                  Beyond the Tourist Map.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                Explore living traditions, meaningful places, local stories
                and authentic cultural experiences — all in one connected
                platform.
              </p>

              <div className="mt-9 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                  <Search size={21} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations, culture, food..."
                    className="w-full bg-transparent outline-none placeholder:text-gray-400"
                  />
                </div>

                <Link
                  to="/explore"
                  className="flex items-center justify-center gap-2 rounded-xl bg-saffron px-7 py-3 font-semibold text-white no-underline transition hover:bg-orange-600"
                >
                  Explore
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                <span>Popular:</span>

                <Link
                  to="/explore"
                  className="text-white no-underline hover:text-saffron"
                >
                  Nashik
                </Link>

                <span>•</span>

                <Link
                  to="/explore"
                  className="text-white no-underline hover:text-saffron"
                >
                  Pune
                </Link>

                <span>•</span>

                <Link
                  to="/explore"
                  className="text-white no-underline hover:text-saffron"
                >
                  Rajasthan
                </Link>

                <span>•</span>

                <Link
                  to="/explore"
                  className="text-white no-underline hover:text-saffron"
                >
                  Tamil Nadu
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/60">
          Scroll to explore
        </div>
      </section>

      {/* ================= PRODUCT INTRO ================= */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[4px] text-saffron">
                More than travel
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#1D3557] md:text-5xl">
                Experience culture,
                <span className="text-saffron"> not just places.</span>
              </h2>
            </div>

            <p className="text-lg leading-8 text-gray-600">
              TraditionHub connects destinations, cultural knowledge,
              personalized recommendations, AI-powered planning and local
              people into one meaningful travel experience.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-[#faf7f2] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <Icon size={23} className="text-saffron" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#1D3557]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-[#faf7f2] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[4px] text-saffron">
                Explore your interests
              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#1D3557] md:text-5xl">
                What are you curious about?
              </h2>
            </div>

            <Link
              to="/explore"
              className="flex items-center gap-2 font-semibold text-saffron no-underline transition-all hover:gap-3"
            >
              Explore everything
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                to="/explore"
                className="group rounded-2xl border border-gray-100 bg-white p-5 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="text-4xl transition group-hover:scale-110">
                  {category.icon}
                </div>

                <h3 className="mt-4 font-bold text-[#1D3557]">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED EXPERIENCES ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[4px] text-saffron">
              Featured experiences
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#1D3557] md:text-5xl">
              Stories worth experiencing
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Go beyond sightseeing and discover the traditions, festivals and
              stories that make every destination unique.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {traditions.map((item) => (
              <Link
                key={item.title}
                to="/explore"
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white no-underline shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#1D3557]">
                    {item.category}
                  </span>

                  <h3 className="absolute bottom-5 left-6 text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-7 text-gray-500">
                    {item.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-saffron">
                    Discover experience
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AI PLANNER ================= */}
      <section className="relative overflow-hidden bg-[#1D3557] py-24">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
                <Sparkles size={16} />
                Intelligent travel planning
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                Your journey,
                <span className="block text-saffron">
                  intelligently planned.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Tell us where you&apos;re going, what you love and how much
                time you have. TraditionHub creates a personalized cultural
                itinerary for you.
              </p>

              <Link
                to="/planner"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-semibold text-white no-underline transition hover:bg-orange-600"
              >
                <Sparkles size={18} />
                Create My Journey
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">YOUR JOURNEY</p>

                    <h3 className="mt-1 text-xl font-bold text-[#1D3557]">
                      Nashik · 2 Days
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <MapPin size={20} className="text-saffron" />
                  </div>
                </div>

                {plannerPlaces.map(([time, place], index) => (
                  <div key={place} className="flex gap-4">
                    <div className="w-14 pt-1 text-xs font-semibold text-saffron">
                      {time}
                    </div>

                    <div className="relative pb-5">
                      {index < plannerPlaces.length - 1 && (
                        <div className="absolute left-[5px] top-4 h-full w-[2px] bg-orange-100" />
                      )}

                      <div className="relative z-10 h-3 w-3 rounded-full bg-saffron" />
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      {place}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOCAL GUIDES ================= */}
      <section className="bg-[#faf7f2] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[4px] text-saffron">
                Connect locally
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#1D3557] md:text-5xl">
                Experience a place
                <span className="text-saffron"> like a local.</span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-500">
                Discover trusted local guides who know the stories, traditions,
                food and hidden corners that do not appear on ordinary travel
                maps.
              </p>

              <Link
                to="/guides"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1D3557] px-6 py-3 font-semibold text-white no-underline transition hover:bg-[#152a45]"
              >
                Meet Local Guides
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {guideHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-lg"
                >
                  <div className="text-4xl">{item.icon}</div>

                  <h3 className="mt-5 font-bold text-[#1D3557]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    Discover authentic experiences.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRADITION AI ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-10 rounded-[2rem] border border-orange-100 bg-gradient-to-r from-[#fff1e8] to-[#fff8ef] p-8 md:p-12 lg:flex-row">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-saffron shadow-lg">
                <Bot size={30} className="text-white" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-saffron">
                  Meet TraditionAI
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#1D3557] md:text-3xl">
                  Curious about a tradition?
                </h2>

                <p className="mt-2 max-w-2xl text-gray-500">
                  Ask about history, rituals, festivals, etiquette, food and
                  the stories behind India&apos;s cultural places.
                </p>
              </div>
            </div>

            <Link
              to="/ai-guide"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1D3557] px-7 py-3.5 font-semibold text-white no-underline transition hover:bg-[#152a45]"
            >
              Ask TraditionAI
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY TRADITIONHUB ================= */}
      <section className="bg-[#faf7f2] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-saffron">
            Why TraditionHub
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#1D3557] md:text-5xl">
            Travel with meaning.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
            We bring technology and cultural knowledge together to help
            travelers discover India respectfully, personally and meaningfully.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ValueCard
              icon={ShieldCheck}
              title="Trusted Information"
              text="Explore cultural knowledge and destination information in one place."
            />

            <ValueCard
              icon={Heart}
              title="Meaningful Experiences"
              text="Discover experiences based on your interests instead of generic recommendations."
            />

            <ValueCard
              icon={Users}
              title="Local Connection"
              text="Connect with local people and experience destinations beyond the surface."
            />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-[#1D3557] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-saffron">
            Your journey starts here
          </p>

          <h2 className="mt-5 text-4xl font-bold text-white md:text-6xl">
            Discover a different
            <span className="block text-saffron">side of India.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Explore traditions, meet locals and create a journey that connects
            you with the culture behind every place.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-semibold text-white no-underline transition hover:bg-orange-600"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/planner"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white no-underline transition hover:bg-white hover:text-[#1D3557]"
            >
              <Sparkles size={18} />
              Plan My Journey
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-7 text-left transition hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
        <Icon size={22} className="text-saffron" />
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#1D3557]">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>
    </div>
  );
}
