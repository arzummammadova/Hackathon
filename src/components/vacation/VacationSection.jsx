import React, { useState } from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GiTreehouse, GiCampingTent } from "react-icons/gi";

/**
 * Color palette
 * ------------------------------------------------------------------
 *  Primary brand color  : #003B95  (deep royal‑blue)
 * ------------------------------------------------------------------
 *  All gradients, icon accents and text highlights have been updated
 *  to consistently use the primary brand color through Tailwind’s
 *  arbitrary‑value utilities (e.g. text-[#003B95]).
 */

const VacationSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const primary = "[#003B95]"; // shortcut for Tailwind arbitrary color classes

  const vacationTypes = [
    {
      id: "bungalows",
      title: "Bungalows",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/square600/350814179.jpg?k=83370ddbd4a72ba5952c2d73fa2f690e1b0f425dc8f4f1ab9a47f843a94721c8&o=",
      gradient: `from-${primary}/80 to-${primary}/50`,
      size: "large"
    },
    {
      id: "apartments",
      title: "Apartments",
      icon: HiOutlineHomeModern,
      gradient: `from-${primary}/10 to-${primary}/5`,
      iconColor: `text-${primary}`,
      textColor: `text-${primary}`,
      size: "small"
    },
    {
      id: "chalets",
      title: "Chalets",
      icon: GiTreehouse,
      gradient: `from-${primary}/10 to-${primary}/5`,
      iconColor: `text-${primary}`,
      textColor: `text-${primary}`,
      size: "small"
    },
    {
      id: "villas",
      title: "Villas",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      gradient: `from-${primary}/80 to-${primary}/50`,
      textColor: `text-${primary}`,
      size: "xlarge"
    },
    {
      id: "campsites",
      title: "Campsites & Boats",
      icon: GiCampingTent,
      gradient: `from-${primary}/10 to-${primary}/5`,
      iconColor: `text-${primary}`,
      textColor: `text-${primary}`,
      size: "medium"
    },
    {
      id: "houses",
      title: "Houses",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      gradient: `from-${primary}/80 to-${primary}/50`,
      size: "medium"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-[#003B95] to-gray-900 bg-clip-text text-transparent mb-4">
          Vacation Rentals
        </h2>
        <p className="text-xl text-gray-600 font-light">
          For every kind of adventure
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#003B95] to-[#003B95] mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 grid-rows-4 gap-4 h-[600px]">
        {/* Bungalows */}
        <div
          className="col-span-3 row-span-2 group cursor-pointer"
          onMouseEnter={() => setHoveredCard("bungalows")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <img
              src={vacationTypes[0].image}
              alt="Bungalows"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${vacationTypes[0].gradient} transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                Bungalows
              </h3>
              <p className="text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                Tropical paradise awaits
              </p>
            </div>
            <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Apartments */}
        <div
          className="col-span-1 row-span-1 group cursor-pointer"
          onMouseEnter={() => setHoveredCard("apartments")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`h-full bg-gradient-to-br ${vacationTypes[1].gradient} backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center p-6 text-center border border-white/20 transition-all duration-300 hover:border-[${primary}] hover:shadow-xl transform hover:scale-105`}
          >
            <div className="p-4 bg-white rounded-full shadow-lg mb-4 transition-all duration-300 group-hover:bg-[#003B95]/10 group-hover:scale-110">
              <HiOutlineHomeModern
                className={`text-4xl ${vacationTypes[1].iconColor} transition-colors duration-300`}
              />
            </div>
            <span
              className={`font-bold text-lg ${vacationTypes[1].textColor} transition-colors duration-300`}
            >
              Apartments
            </span>
          </div>
        </div>

        {/* Chalets */}
        <div
          className="col-span-1 row-span-1 group cursor-pointer"
          onMouseEnter={() => setHoveredCard("chalets")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`h-full bg-gradient-to-br ${vacationTypes[2].gradient} backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center p-6 text-center border border-white/20 transition-all duration-300 hover:border-[${primary}] hover:shadow-xl transform hover:scale-105`}
          >
            <div className="p-4 bg-white rounded-full shadow-lg mb-4 transition-all duration-300 group-hover:bg-[#003B95]/10 group-hover:scale-110">
              <GiTreehouse
                className={`text-4xl ${vacationTypes[2].iconColor} transition-colors duration-300`}
              />
            </div>
            <span
              className={`font-bold text-lg ${vacationTypes[2].textColor} transition-colors duration-300`}
            >
              Chalets
            </span>
          </div>
        </div>

        {/* Campsites */}
        <div
          className="col-span-1 row-span-1 group cursor-pointer"
          onMouseEnter={() => setHoveredCard("campsites")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`h-full bg-gradient-to-br ${vacationTypes[4].gradient} backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center p-6 text-center border border-white/20 transition-all duration-300 hover:border-[${primary}] hover:shadow-xl transform hover:scale-105`}
          >
            <div className="p-4 bg-white rounded-full shadow-lg mb-4 transition-all duration-300 group-hover:bg-[#003B95]/10 group-hover:scale-110">
              <GiCampingTent
                className={`text-4xl ${vacationTypes[4].iconColor} transition-colors duration-300`}
              />
            </div>
            <span
              className={`font-bold text-sm ${vacationTypes[4].textColor} transition-colors duration-300 leading-tight`}
            >
              Campsites & Boats
            </span>
          </div>
        </div>

        {/* Villas */}
        <div
          className="col-span-2 row-span-2 group cursor-pointer"
          onMouseEnter={() => setHoveredCard("villas")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <img
              src={vacationTypes[3].image}
              alt="Villas"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${vacationTypes[3].gradient} transition-all duration-500`}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105">
                <h3 className="text-4xl font-black text-[#003B95] mb-4 transition-all duration-300 group-hover:text-[#0040a3]">
                  Villas
                </h3>
                <p className="text-[#003B95] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  Luxury redefined
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Houses */}
        <div
          className="col-span-2 row-span-1 group cursor-pointer"
          onMouseEnter={() => setHoveredCard("houses")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative h-full overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <img
              src={vacationTypes[5].image}
              alt="Houses"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${vacationTypes[5].gradient} transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-y-[-2px]">
                Houses
              </h3>
              <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                Home away from home
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center mt-16">
        <div className="flex space-x-8 bg-white/80 backdrop-blur-lg rounded-full px-8 py-4 shadow-xl border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">1M+</div>
            <div className="text-sm text-gray-600">Properties</div>
          </div>
          <div className="w-px bg-gray-300"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">50+</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
          <div className="w-px bg-gray-300"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">4.8★</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationSection;
