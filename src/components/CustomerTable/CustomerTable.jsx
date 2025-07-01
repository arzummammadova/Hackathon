import { useState } from "react";
import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Search, Filter, UserPlus, Edit2, Eye, Phone, Mail } from 'lucide-react';
import CustomerTableField from "./CustomerTableField";
import { BASE_URL } from '../../constants/api';

const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data);

export const CustomerTable = () => {
    const { data, isLoading, error } = useSWR(BASE_URL + 'User/get-all', fetcher);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Hamısı');

    // Only members
    const members = (data || []).filter(user => user.roles && user.roles.includes('Member'));

    // Search and filter
    const filteredCustomers = members.filter(user => {
        const matchesSearch = (user.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.phoneNumber || '').includes(searchTerm);
        // No status filter for now, but keep for future
        return matchesSearch;
    });

    const handleView = (user) => {
        alert(`${user.userName} məlumatlarına baxılır`);
    };

    const handleEdit = (user) => {
        alert(`${user.userName} məlumatları redaktə edilir`);
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#003B95] px-6 py-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Otel Müştəri Siyahısı</h2>
                </div>
            </div>
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Müştəri adı, email və ya telefon nömrəsi ilə axtar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-blue-100 border-b border-blue-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Ad</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Telefon</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Qeydiyyat</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Rol</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                        {isLoading && (
                            <tr><td colSpan={6} className="text-center py-8 text-blue-600">Yüklənir...</td></tr>
                        )}
                        {error && (
                            <tr><td colSpan={6} className="text-center py-8 text-red-600">Xəta baş verdi!</td></tr>
                        )}
                        {filteredCustomers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 font-semibold text-blue-900">{user.userName}</td>
                                <td className="px-6 py-4">{user.email || <span className="text-gray-400">-</span>}</td>
                                <td className="px-6 py-4">{user.phoneNumber || <span className="text-gray-400">-</span>}</td>
                                <td className="px-6 py-4 text-sm">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                                <td className="px-6 py-4 text-xs">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Member</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCustomers.length === 0 && !isLoading && !error && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg">Müştəri tapılmadı</div>
                        <div className="text-gray-400 text-sm mt-2">Axtarış kriteriyalarınızı dəyişməyi cəhd edin</div>
                    </div>
                )}
            </div>
            {/* Footer */}
            <div className="bg-blue-50 px-6 py-4 border-t border-blue-100">
                <div className="flex items-center justify-between text-sm text-blue-700">
                    <div>
                        Cəmi <span className="font-semibold">{filteredCustomers.length}</span> müştəri göstərilir
                    </div>
                    <div className="flex items-center space-x-4">
                        <span>Səhifə 1 / 1</span>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 rounded bg-blue-200 text-blue-800 font-medium">1</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};