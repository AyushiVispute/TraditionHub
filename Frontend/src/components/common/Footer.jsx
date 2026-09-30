import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white">

      {/* Main Footer */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}

          <div className="lg:col-span-1">

            <Link
              to="/"
              className="inline-block no-underline"
            >
              <h2 className="text-3xl font-bold text-white">
                Tradition
                <span className="text-saffron">
                  Hub
                </span>
              </h2>
            </Link>

            <p className="text-white/60 text-sm leading-7 mt-5 max-w-sm">
              Discover India's living traditions, meaningful
              places, local stories and authentic experiences
              through one connected cultural platform.
            </p>

            {/* Location */}

            <div className="flex items-center gap-2 mt-6 text-white/60 text-sm">
              <MapPin
                size={17}
                className="text-saffron"
              />
              <span>
                India
              </span>
            </div>

            {/* Email */}

            <div className="flex items-center gap-2 mt-3 text-white/60 text-sm">
              <Mail
                size={17}
                className="text-saffron"
              />
              <span>
                hello@traditionhub.com
              </span>
            </div>

          </div>


          {/* EXPLORE */}

          <div>

            <h3 className="font-semibold text-lg">
              Explore
            </h3>

            <div className="w-8 h-[2px] bg-saffron mt-3 mb-5" />

            <div className="flex flex-col gap-3">

              <FooterLink
                to="/explore"
                text="Explore Places"
              />

              <FooterLink
                to="/guides"
                text="Local Guides"
              />

              <FooterLink
                to="/planner"
                text="AI Trip Planner"
              />

              <FooterLink
                to="/ai-guide"
                text="TraditionAI"
              />

              <FooterLink
                to="/preferences"
                text="My Preferences"
              />

            </div>

          </div>


          {/* PLATFORM */}

          <div>

            <h3 className="font-semibold text-lg">
              TraditionHub
            </h3>

            <div className="w-8 h-[2px] bg-saffron mt-3 mb-5" />

            <div className="flex flex-col gap-3">

              <FooterLink
                to="/"
                text="About TraditionHub"
              />

              <FooterLink
                to="/guides"
                text="Become a Local Guide"
              />

              <FooterLink
                to="/planner"
                text="Plan a Journey"
              />

              <FooterLink
                to="/login"
                text="Sign In"
              />

              <FooterLink
                to="/register"
                text="Create Account"
              />

            </div>

          </div>


          {/* NEWSLETTER */}

          <div>

            <h3 className="font-semibold text-lg">
              Stay Connected
            </h3>

            <div className="w-8 h-[2px] bg-saffron mt-3 mb-5" />

            <p className="text-white/60 text-sm leading-6">
              Get cultural stories, destination inspiration
              and new experiences delivered to your inbox.
            </p>


            {/* Newsletter */}

            <div className="mt-5">

              <div className="
                flex
                bg-white/10
                border border-white/10
                rounded-xl
                overflow-hidden
                focus-within:border-saffron
                transition
              ">

                <input
                  type="email"
                  placeholder="Your email address"
                  className="
                    flex-1
                    min-w-0
                    bg-transparent
                    px-4 py-3
                    text-sm
                    text-white
                    placeholder:text-white/40
                    outline-none
                  "
                />

                <button
                  className="
                    px-4
                    bg-saffron
                    hover:bg-orange-600
                    transition
                    flex items-center
                    justify-center
                  "
                  aria-label="Subscribe"
                >
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>


            {/* Social */}

            <div className="flex items-center gap-3 mt-6">

              <SocialButton
                icon={<Instagram size={18} />}
                label="Instagram"
              />

              <SocialButton
                icon={<Facebook size={18} />}
                label="Facebook"
              />

              <SocialButton
                icon={<Twitter size={18} />}
                label="Twitter"
              />

            </div>

          </div>

        </div>


        {/* Divider */}

        <div className="border-t border-white/10 mt-14 pt-7">

          <div className="
            flex flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          ">

            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} TraditionHub.
              All rights reserved.
            </p>


            <div className="flex items-center gap-6">

              <Link
                to="/"
                className="
                  text-sm
                  text-white/40
                  hover:text-white
                  no-underline
                  transition
                "
              >
                Privacy
              </Link>

              <Link
                to="/"
                className="
                  text-sm
                  text-white/40
                  hover:text-white
                  no-underline
                  transition
                "
              >
                Terms
              </Link>

              <Link
                to="/"
                className="
                  text-sm
                  text-white/40
                  hover:text-white
                  no-underline
                  transition
                "
              >
                Contact
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};


/* ================= FOOTER LINK ================= */

const FooterLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="
        group
        flex items-center gap-2
        text-sm
        text-white/60
        hover:text-white
        no-underline
        transition
      "
    >
      <span
        className="
          w-0
          h-[1px]
          bg-saffron
          group-hover:w-4
          transition-all
          duration-300
        "
      />

      {text}
    </Link>
  );
};


/* ================= SOCIAL BUTTON ================= */

const SocialButton = ({ icon, label }) => {
  return (
    <button
      aria-label={label}
      className="
        w-10 h-10
        rounded-full
        bg-white/5
        border border-white/10
        flex items-center
        justify-center
        text-white/60
        hover:text-white
        hover:bg-saffron
        hover:border-saffron
        transition-all
        duration-300
      "
    >
      {icon}
    </button>
  );
};

export default Footer;