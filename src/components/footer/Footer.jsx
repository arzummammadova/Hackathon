import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#003B95] text-white py-9">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Five sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm">
              {["Baku", "Istanbul", "Dubai", "Paris"].map((city) => (
                <li key={city}>
                  <a
                    href="#"
                    className="link-hover relative inline-block"
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              {["Hotels", "Apartments", "Resorts", "Villas"].map((item) => (
                <li key={item}>
                  <a href="#" className="link-hover relative inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Services</h3>
            <ul className="space-y-2 text-sm">
              {["Contact Us", "FAQ", "Help Center", "Cancel Booking"].map(
                (svc) => (
                  <li key={svc}>
                    <a href="#" className="link-hover relative inline-block">
                      {svc}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Partner With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Partner With Us</h3>
            <ul className="space-y-2 text-sm">
              {["List your property", "Affiliate program", "Travel agents"].map(
                (p) => (
                  <li key={p}>
                    <a href="#" className="link-hover relative inline-block">
                      {p}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm mb-4">
              {["About Us", "Privacy Policy"].map((c) => (
                <li key={c}>
                  <a href="#" className="link-hover relative inline-block">
                    {c}
                  </a>
                </li>
              ))}
            </ul>

            {/* Subscribe form */}
            <p className="text-sm mb-2">Subscribe to our newsletter</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full px-3 py-2 rounded border border-white bg-transparent placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-[#003B95] font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-700 pt-6 text-sm">
          <p>&copy; 2025 BookingPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
