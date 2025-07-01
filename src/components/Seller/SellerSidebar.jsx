import React from 'react';
import { Home, BedDouble, Users, Settings, LogOut, ConciergeBell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarSeller = () => {
    const location = useLocation();

    const links = [
        { to: '/seller', label: 'Dashboard', icon: <Home size={18} /> },
        { to: '/seller/customers', label: 'Müştərilər', icon: <Users size={18} /> },
        // { to: '/seller/services', label: 'Xidmətlər', icon: <ConciergeBell size={18} /> },
        { to: '/seller/hotel-manager', label: 'Hotel İdarəetməsi', icon: <BedDouble size={18} /> },
        { to: '/seller/profile', label: 'Profil', icon: <Settings size={18} /> },
    ];

    return (
        <div className="w-64 min-h-screen bg-gradient-to-b from-[#003B95] to-blue-900 text-white flex flex-col shadow-2xl rounded-r-3xl overflow-hidden">
            <div className="flex items-center justify-center gap-2 py-8 border-b border-blue-800 mb-2 bg-[#003B95] shadow-md">
                <span className="text-2xl font-extrabold tracking-tight">Seller Panel</span>
            </div>
            <nav className="flex-1 space-y-1 px-4 mt-4">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-all duration-200 mb-1
                            ${location.pathname === link.to
                                ? 'bg-white/10 border-l-4 border-white text-white shadow-lg'
                                : 'hover:bg-blue-800 hover:text-blue-100 text-blue-100'}
                        `}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-blue-800 mt-4">
                <Link to={'/home'} className="flex items-center gap-2 text-sm text-blue-100 hover:text-red-400 hover:bg-white/10 px-4 py-2 rounded-xl w-full transition-all duration-200 font-semibold">
                    <LogOut size={18} />
                    Çıxış
                </Link>
            </div>
        </div>
    );
};

export default SidebarSeller;
