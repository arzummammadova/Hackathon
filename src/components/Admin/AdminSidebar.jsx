import React from 'react';
import { Home, BedDouble, Users, Settings, LogOut, ConciergeBell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { to: '/admin', label: 'Dashboard', icon: <Home size={18} /> },
        { to: '/admin/customers', label: 'Müştərilər', icon: <Users size={18} /> },
        { to: '/admin/services', label: 'Xidmətlər', icon: <ConciergeBell size={18} /> },
        { to: '/admin/user-manager', label: 'İstifadəçi İdarəetməsi', icon: <Users size={18} /> },
        { to: '/admin/hotel-manager', label: 'Hotel İdarəetməsi', icon: <BedDouble size={18} /> },
        { to: '/admin/profile', label: 'Profil', icon: <Settings size={18} /> },
    ];

    return (
        <div className="w-64 bg-[#003B95] min-h-screen text-white flex flex-col">
            <div className="text-2xl font-bold text-center py-6">Admin Panel</div>
            <nav className="flex-1 space-y-1 px-4">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-800 transition ${location.pathname === link.to ? 'bg-blue-900' : ''
                            }`}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-blue-800">
                <button className="flex items-center gap-2 text-sm hover:text-red-300">
                    <LogOut size={18} />
                    Çıxış
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
