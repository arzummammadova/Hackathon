import React, { useState, useRef, useEffect } from 'react';
import useStore from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaChevronDown, FaUser } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import logo from '../../assets/images/logo.jpeg';
import { toastdev } from '@azadev/react-toastdev';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!user?.id && Cookies.get('accessToken')) {
      axios.get(`${BASE_URL}User/profile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
        .then(res => {
          if (res.data && res.data.id) {
            if (typeof useStore.getState === 'function') {
              useStore.setState({ user: res.data });
            }
          }
        })
        .catch(() => {
          Cookies.remove('accessToken');
        });
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await axios.post(`${BASE_URL}User/logout`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      toastdev.success('Çıxış uğurla başa çatdı!', { sound: true, duration: 2000 });
    } catch (error) {
      toastdev.error(error.message || 'Çıxış zamanı xəta baş verdi!', { sound: true, duration: 2000 });
    } finally {
      logout();
      Cookies.remove('accessToken');
      setLogoutLoading(false);
      navigate('/');
      // window.location.reload();
    }
  };

  const isLoggedIn = !!user.id;
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop nav */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1>404 Rooms</h1>
            </Link>

            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-blue-600 hover:border-blue-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - user actions */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  id="user-menu-button"
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleUserDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  {user.image ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.image}
                      alt="User avatar"
                    />
                  ) : (
                    <FaUserCircle className="h-8 w-8 text-gray-400" />
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">
                    {user.userName}
                  </span>
                  <FaChevronDown className="ml-1 text-xs text-gray-500 hidden md:inline" />
                </button>

                {/* User dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-b border-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <FaUser className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left disabled:opacity-60"
                      disabled={logoutLoading}
                    >
                      {logoutLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                      ) : (
                        <FaSignOutAlt className="mr-2" />
                      )}
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-4">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                </span>
                {isMobileMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-blue-800 hover:bg-blue-50 hover:border-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 w-full text-left disabled:opacity-60"
                disabled={logoutLoading}
              >
                {logoutLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                ) : (
                  <FaSignOutAlt className="mr-2" />
                )}
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-blue-800 hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;