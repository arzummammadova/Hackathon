import React, { useState } from 'react';
import useStore from '../../store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isLoggedIn = !!user.id;

  return (
    <nav className="bg-[#003B95] p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Sol: Logo */}
        <div>
          <a href="/" className="text-white text-lg font-bold">Your Logo</a>
        </div>

        {/* Orta: Desktop Nav */}
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">Home</a>
          <a href="#" className="text-gray-300 hover:text-white">About</a>
          <a href="#" className="text-gray-300 hover:text-white">Contact</a>
        </div>

        {/* Sağ: Avatar və ya Login/Register */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3 text-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <i className="bi bi-person-circle text-2xl text-white"></i>
              )}
              <span className="font-medium">{user.userName}</span>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <a href="/login" className="bg-white text-[#003B95] px-4 py-2 rounded-xl">Login</a>
              <a href="/register" className="bg-white text-[#003B95] px-4 py-2 rounded-xl">Register</a>
            </div>
          )}

          {/* Mobil menyu düyməsi */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 focus:outline-none focus:text-white"
            >
              {isOpen ? (
                <i className="bi bi-x text-2xl"></i>
              ) : (
                <i className="bi bi-list text-2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menyu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 mt-2 rounded-md p-4">
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Home</a>
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Courses</a>
          <a href="#" className="block py-2 text-gray-300 hover:text-white">About</a>
          <a href="#" className="block py-2 text-gray-300 hover:text-white">Contact</a>
          <hr className="my-2 border-gray-600" />

          {isLoggedIn ? (
            <div className="flex items-center gap-3 text-white py-2">
              {user.image ? (
                <img
                  src={user.image ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <i className="bi bi-person-circle text-2xl text-white"></i>
              )}
              <span className="font-medium">{user.userName}</span>
            </div>
          ) : (
            <>
              <a href="/login" className="block py-2 text-gray-300 hover:text-white">Login</a>
              <a href="/register" className="block py-2 text-gray-300 hover:text-white">Register</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
