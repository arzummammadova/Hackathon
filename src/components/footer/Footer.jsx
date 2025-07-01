import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#003B95] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Five sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li>Baku</li>
              <li>Istanbul</li>
              <li>Dubai</li>
              <li>Paris</li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              <li>Hotels</li>
              <li>Apartments</li>
              <li>Resorts</li>
              <li>Villas</li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Cancel Booking</li>
            </ul>
          </div>

          {/* Partner With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Partner With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>List your property</li>
              <li>Affiliate program</li>
              <li>Travel agents</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-700 pt-6 text-sm">
          <p>&copy; 2025 BookingPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
