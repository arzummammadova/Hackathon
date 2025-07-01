import React from 'react'
import { Search, Filter, UserPlus, Edit2, Eye, Phone, Mail } from 'lucide-react';

const CustomerTableField = ({ customer, onView, onEdit }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Aktiv':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Çıxış edilib':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Gözləyir':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <tr className="bg-white hover:bg-blue-50 border-b border-blue-100 transition-colors duration-200">
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Otaq {customer.roomNumber}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center text-sm text-gray-900">
                    <Mail className="w-4 h-4 text-blue-500 mr-2" />
                    {customer.email}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center text-sm text-gray-900">
                    <Phone className="w-4 h-4 text-blue-500 mr-2" />
                    {customer.phone}
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                    {customer.status}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
                <div>Giriş: {customer.checkIn}</div>
                <div className="text-gray-500">Çıxış: {customer.checkOut}</div>
            </td>
            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {customer.totalSpent}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onView(customer)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Bax"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(customer)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Redaktə et"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};
export default CustomerTableField