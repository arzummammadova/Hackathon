import React from "react";

const features = [
  {
    img: "https://t-cf.bstatic.com/design-assets/assets/v3.155.1/illustrations-traveller/TripsUnlockSpot@2x.png",
    title: "No hidden fees",
    text: "The price you see is the price you pay.",
  },
  {
    img: "https://t-cf.bstatic.com/design-assets/assets/v3.155.1/illustrations-traveller/GTAPhone@2x.png",
    title: "Instant confirmation",
    text: "Most stays can be booked instantly",
  },
  {
    img: "https://t-cf.bstatic.com/design-assets/assets/v3.155.1/illustrations-traveller/EmailSubscriptionSheet@2x.png",
    title: "Flexibility",
    text: "Many properties offer free cancellation",
  },
];

const Madeeasy = () => {
  return (
    <div className="bg-white py-12 max-w-7xl mx-auto px-4 md:px-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Booking made easy</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-amber-100 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300"
          >
            <img src={item.img} alt={item.title} className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Madeeasy;
