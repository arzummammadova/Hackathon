import React, { useState, useRef, useEffect } from 'react';
import useStore from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  UserCircle,
  Home,
  Building,
  Info,
  Mail,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import logo from '../../assets/images/logo.jpeg';
import { toastdev } from '@azadev/react-toastdev';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    }
  };

  const isLoggedIn = !!user.id;
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/rooms', label: 'Rooms', icon: Building },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">0</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    404 Rooms
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Premium Stays</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:ml-10 lg:flex lg:space-x-1">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="group flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 relative overflow-hidden"
                    >
                      <IconComponent className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      {link.label}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Search Bar - Hidden on mobile */}
            {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 text-sm transition-all"
                />
              </div>
            </div> */}

            {/* Right side - user actions */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                      onClick={toggleUserDropdown}
                    >
                      <div className="relative">
                        {user.image ? (
                          <img
                            className="h-8 w-8 rounded-lg object-cover ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all"
                            src={user.image}
                            alt="User avatar"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                          {user.userName}
                        </p>
                        <p className="text-xs text-gray-500">Premium Member</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isUserDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* User dropdown menu */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50 border border-gray-100">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            {user.image ? (
                              <img
                                className="h-12 w-12 rounded-xl object-cover"
                                src={user.image}
                                alt="User avatar"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{user.userName}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                Premium
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <User className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                            <div>
                              <p className="font-medium">Profile</p>
                              <p className="text-xs text-gray-500">Manage your account</p>
                            </div>
                          </Link>
                          
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Settings className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                            <div>
                              <p className="font-medium">Settings</p>
                              <p className="text-xs text-gray-500">Preferences & privacy</p>
                            </div>
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 py-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group disabled:opacity-50"
                            disabled={logoutLoading}
                          >
                            {logoutLoading ? (
                              <div className="mr-3 h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <LogOut className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                            )}
                            <div>
                              <p className="font-medium">Sign out</p>
                              <p className="text-xs text-gray-500">See you soon!</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div> */}
                {/* <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 text-sm"
                /> */}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Section */}
            <div className="border-t border-gray-100 px-4 py-3">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    {user.image ? (
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={user.image}
                        alt="User avatar"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.userName}</p>
                      <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                    disabled={logoutLoading}
                  >
                    {logoutLoading ? (
                      <div className="w-5 h-5 mr-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <LogOut className="w-5 h-5 mr-3" />
                    )}
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-3 text-center text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-3 text-center text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;