import React, { useState } from "react";


import { CustomerAssignTable } from "../../components/AssingCustomer/CustomerAssignTable";
import { AssignCustomerModal } from "../../components/AssingCustomer/CustomerAssignModal";


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

export default function AssignCustomer() {
    const [customers, setCustomers] = useState(sampleCustomers);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleAssignClick = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleAssignRoom = (customerId, roomNumber) => {
        setCustomers((prev) =>
            prev.map((c) =>
                c.id === customerId ? { ...c, roomNumber, status: "Aktiv" } : c
            )
        );
        setSelectedCustomer(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">
                <h1 className="text-2xl font-bold text-[#003B95] mb-4">Müştərini Otelə Təyin Et</h1>
                <CustomerAssignTable customers={customers} onAssignClick={handleAssignClick} />
            </div>

            {selectedCustomer && (
                <AssignCustomerModal
                    customer={selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                    onAssign={handleAssignRoom}
                />
            )}
        </div>
    );
}
