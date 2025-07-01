import React, { useState } from 'react';
// Assuming Bootstrap icons are available via CDN or installation
// e.g., <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#003B95] p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand - Left */}
        <div>
          <a href="#" className="text-white text-lg font-bold">Your Logo</a>
        </div>

        {/* Desktop Nav Links - Center */}
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">Home</a>
          <a href="#" className="text-gray-300 hover:text-white">About</a>
          <a href="#" className="text-gray-300 hover:text-white">Contact</a>
        </div>

        {/* Right Section (Login/Register and Mobile Button) */}
        <div className="flex items-center space-x-4">
          {/* Desktop Login/Register - Right */}
          <div className="hidden md:flex space-x-4">
            <a href="/login" className="bg-white  hover:bg-bg-[#003B95] border px-4 py-2 rounded-xl border-amber-100">Login</a>
            <a href="/register" className="bg-white hover:bg-bg-[#003B95] border px-4 py-2 rounded-xl border-amber-100">Register</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 focus:outline-none focus:text-white"
            >
              {/* Bootstrap burger icon */}
              {isOpen ? (
                <i className="bi bi-x text-2xl"></i> // Close icon when menu is open
              ) : (
                <i className="bi bi-list text-2xl"></i> // Burger icon when menu is closed
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (toggled by button) */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 mt-2 rounded-md p-4">
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Home</a>
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Courses</a>
          <a href="#" className="block py-2 text-gray-300 hover:text-white">About</a>
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Contact</a>
          <hr className="my-2 border-gray-600" /> {/* Optional separator */}
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Login</a>
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Register</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;