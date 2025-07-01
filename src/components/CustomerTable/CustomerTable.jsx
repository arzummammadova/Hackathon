import { useState } from "react";
import { Search, Filter, UserPlus, Edit2, Eye, Phone, Mail } from 'lucide-react';
import CustomerTableField from "./CustomerTableField";
// Sample customer data for hotel


const sampleCustomers = [
    {
        id: 1,
        name: "Ayşe Məmmədova",
        email: "ayse.mammadova@gmail.com",
        phone: "+994 50 123 45 67",
        status: "Aktiv",
        roomNumber: "205",
        checkIn: "2024-06-28",
        checkOut: "2024-07-02",
        totalSpent: "₼450"
    },
    {
        id: 2,
        name: "Rəşad Əliyev",
        email: "reshad.aliyev@email.com",
        phone: "+994 55 987 65 43",
        status: "Çıxış edilib",
        roomNumber: "312",
        checkIn: "2024-06-25",
        checkOut: "2024-06-30",
        totalSpent: "₼680"
    },
    {
        id: 3,
        name: "Leyla Həsənova",
        email: "leyla.hasanova@outlook.com",
        phone: "+994 70 456 78 90",
        status: "Gözləyir",
        roomNumber: "108",
        checkIn: "2024-07-05",
        checkOut: "2024-07-08",
        totalSpent: "₼320"
    },
    {
        id: 4,
        name: "Elvin Quliyev",
        email: "elvin.guliyev@company.az",
        phone: "+994 51 234 56 78",
        status: "Aktiv",
        roomNumber: "401",
        checkIn: "2024-06-29",
        checkOut: "2024-07-03",
        totalSpent: "₼590"
    }
];


export const CustomerTable = () => {
    const [customers] = useState(sampleCustomers);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Hamısı');

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);

        const matchesFilter = filterStatus === 'Hamısı' || customer.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const handleView = (customer) => {
        alert(`${customer.name} məlumatlarına baxılır`);
    };

    const handleEdit = (customer) => {
        alert(`${customer.name} məlumatları redaktə edilir`);
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#003B95] px-6 py-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Otel Müştəri Siyahısı</h2>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Yeni Müştəri
                    </button>
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
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                        >
                            <option value="Hamısı">Hamısı</option>
                            <option value="Aktiv">Aktiv</option>
                            <option value="Çıxış edilib">Çıxış edilib</option>
                            <option value="Gözləyir">Gözləyir</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-blue-100 border-b border-blue-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                Müştəri
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                Elektron Poçt
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                Telefon
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                Tarixlər
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                Ödəniş
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                Əməliyyatlar
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                        {filteredCustomers.map((customer) => (
                            <CustomerTableField
                                key={customer.id}
                                customer={customer}
                                onView={handleView}
                                onEdit={handleEdit}
                            />
                        ))}
                    </tbody>
                </table>

                {filteredCustomers.length === 0 && (
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