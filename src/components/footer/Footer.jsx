import React from 'react';
import {
  MapPin,
  Building,
  Headphones,
  Handshake,
  Building2,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Popular Destinations */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold tracking-wide bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Popular Destinations
                </h3>
              </div>
              <ul className="space-y-3">
                {['Baku', 'Istanbul', 'Dubai', 'Paris', 'London', 'New York'].map((destination) => (
                  <li key={destination} className="group/item">
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1">
                      <div className="w-1 h-1 bg-blue-400 rounded-full group-hover/item:w-2 transition-all"></div>
                      {destination}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold tracking-wide bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Property Types
                </h3>
              </div>
              <ul className="space-y-3">
                {['Luxury Hotels', 'Boutique Apartments', 'Beach Resorts', 'Mountain Villas', 'City Hostels', 'Business Hotels'].map((type) => (
                  <li key={type} className="group/item">
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full group-hover/item:w-2 transition-all"></div>
                      {type}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Services */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold tracking-wide bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Customer Services
                </h3>
              </div>
              <ul className="space-y-3">
                {['24/7 Support', 'Live Chat', 'Help Center', 'Cancel Booking', 'Modify Reservation', 'Travel Insurance'].map((service) => (
                  <li key={service} className="group/item">
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1">
                      <div className="w-1 h-1 bg-purple-400 rounded-full group-hover/item:w-2 transition-all"></div>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partner With Us */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                  <Handshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold tracking-wide bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                  Partner With Us
                </h3>
              </div>
              <ul className="space-y-3">
                {['List Your Property', 'Affiliate Program', 'Travel Agents', 'Corporate Deals', 'API Integration', 'White Label'].map((partner) => (
                  <li key={partner} className="group/item">
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1">
                      <div className="w-1 h-1 bg-orange-400 rounded-full group-hover/item:w-2 transition-all"></div>
                      {partner}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold tracking-wide bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
                  Company
                </h3>
              </div>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Press Center', 'Investor Relations', 'Terms & Conditions', 'Privacy Policy'].map((company) => (
                  <li key={company} className="group/item">
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1">
                      <div className="w-1 h-1 bg-indigo-400 rounded-full group-hover/item:w-2 transition-all"></div>
                      {company}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">info@404rooms.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Phone className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">+994 50 123 45 67</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Globe className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Website</p>
                  <p className="text-white font-medium">www.404rooms.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600' },
                  { icon: Twitter, color: 'hover:bg-sky-500' },
                  { icon: Instagram, color: 'hover:bg-pink-600' },
                  { icon: Linkedin, color: 'hover:bg-blue-700' }
                ].map(({ icon: Icon, color }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`p-3 bg-white/10 rounded-full ${color} transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                404 Rooms
              </div>
              <p className="text-gray-400 text-sm">
                &copy; 2025 404 Rooms. All rights reserved.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-110 shadow-lg group"
            >
              <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </footer >
    </>
  );
};

export default Footer;