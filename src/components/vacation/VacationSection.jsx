import React, { useState, useEffect } from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GiTreehouse, GiCampingTent } from "react-icons/gi";
import { useInView } from "react-intersection-observer";

/**
 * Color palette
 * ------------------------------------------------------------------
 *  Primary brand color  : #003B95  (deep royal‑blue)
 * ------------------------------------------------------------------
 *  All gradients, icon accents and text highlights have been updated
 *  to consistently use the primary brand color through Tailwind's
 *  arbitrary‑value utilities (e.g. text-[#003B95]).
 */

const Counter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) return;

    const increment = target / (duration / 16);
    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(currentCount));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const VacationSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const vacationTypes = [
    {
      id: "bungalows",
      title: "Bungalows",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/square600/350814179.jpg?k=83370ddbd4a72ba5952c2d73fa2f690e1b0f425dc8f4f1ab9a47f843a94721c8&o=",
      gradient: "from-[#003B95]/80 to-[#003B95]/50",
      size: "large",
      description: "Tropical paradise awaits"
    },
    {
      id: "apartments",
      title: "Apartments",
      icon: HiOutlineHomeModern,
      gradient: "from-[#003B95]/10 to-[#003B95]/5",
      iconColor: "text-[#003B95]",
      textColor: "text-[#003B95]",
      size: "small"
    },
    {
      id: "apartmentss",
      title: "Apartments",
      icon: HiOutlineHomeModern,
      gradient: "from-[#003B95]/10 to-[#003B95]/5",
      iconColor: "text-[#003B95]",
      textColor: "text-[#003B95]",
      size: "small"
    },
    {
      id: "chalets",
      title: "Chalets",
      icon: GiTreehouse,
      gradient: "from-[#003B95]/10 to-[#003B95]/5",
      iconColor: "text-[#003B95]",
      textColor: "text-[#003B95]",
      size: "small"
    },
    {
      id: "villas",
      title: "Villas",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      gradient: "from-[#003B95]/80 to-[#003B95]/50",
      textColor: "text-[#003B95]",
      size: "xlarge",
      description: "Luxury redefined"
    },
    {
      id: "campsites",
      title: "Campsites & Boats",
      icon: GiCampingTent,
      gradient: "from-[#003B95]/10 to-[#003B95]/5",
      iconColor: "text-[#003B95]",
      textColor: "text-[#003B95]",
      size: "medium"
    },
    {
      id: "houses",
      title: "Houses",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      gradient: "from-[#003B95]/80 to-[#003B95]/50",
      size: "medium",
      description: "Home away from home"
    },
    {
      id: "houses",
      title: "Houses",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      gradient: "from-[#003B95]/80 to-[#003B95]/50",
      size: "medium",
      description: "Home away from home"
    }
  ];

  const getGridClasses = (size) => {
    return {
      large: "md:col-span-3 md:row-span-2 col-span-6 row-span-2",
      xlarge: "md:col-span-3 md:row-span-2 col-span-6 row-span-2",
      medium: "md:col-span-1 md:row-span-1 col-span-6 row-span-2",
      small: "md:col-span-1 md:row-span-1 col-span-3 row-span-1"
    }[size];
  };

  const renderCardContent = (item) => {
    if (item.image) {
      return (
        <>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-all duration-500`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-md md:text-3xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                {item.description}
              </p>
            )}
          </div>
          <div className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white"
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
        </>
      );
    } else if (item.icon) {
      return (
        <>
          <div
            className={`h-full bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center p-4 md:p-6 text-center border border-white/20 transition-all duration-300 hover:border-[#003B95] hover:shadow-xl transform hover:scale-105`}
          >
            <div className="p-3 md:p-4 bg-white rounded-full shadow-lg mb-3 md:mb-4 transition-all duration-300 group-hover:bg-[#003B95]/10 group-hover:scale-110">
              <item.icon
                className={`text-3xl md:text-4xl ${item.iconColor} transition-colors duration-300`}
              />
            </div>
            <span
              className={`font-bold text-sm md:text-md ${item.textColor} transition-colors duration-300`}
            >
              {item.title}
            </span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-[#003B95] to-gray-900 bg-clip-text text-transparent mb-3 md:mb-4">
          Vacation Rentals
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-light">
          For every kind of adventure
        </p>
        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#003B95] to-[#003B95] mx-auto mt-4 md:mt-6 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-6 grid-rows-6 md:grid-rows-4 gap-3 md:gap-4 h-auto md:h-[600px]">
        {vacationTypes.map((item) => (
          <div
            key={item.id}
            className={`${getGridClasses(item.size)} group cursor-pointer`}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className={`relative h-full overflow-hidden rounded-xl md:rounded-2xl ${item.size === "large" || item.size === "xlarge"
                ? "rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl"
                : "shadow-md md:shadow-lg"
                } transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl md:hover:shadow-2xl`}
            >
              {renderCardContent(item)}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center mt-12 md:mt-16">
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 bg-white/80 backdrop-blur-lg rounded-lg px-6 py-3 md:px-8 md:py-4 shadow-xl border border-white/20">
          <div className="text-center px-2">
            <div className="text-xl md:text-2xl font-bold text-gray-800">
              <Counter target={1000000} />+
            </div>
            <div className="text-xs md:text-sm text-gray-600">Properties</div>
          </div>
          <div className="hidden md:block w-px bg-gray-300"></div>
          <div className="text-center px-2">
            <div className="text-xl md:text-2xl font-bold text-gray-800">
              <Counter target={50} />+
            </div>
            <div className="text-xs md:text-sm text-gray-600">Countries</div>
          </div>
          <div className="hidden md:block w-px bg-gray-300"></div>
          <div className="text-center px-2">
            <div className="text-xl md:text-2xl font-bold text-gray-800">
              4.8<span className="text-yellow-500">★</span>
            </div>
            <div className="text-xs md:text-sm text-gray-600">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationSection;