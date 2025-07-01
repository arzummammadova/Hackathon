import React, { useState } from "react";

const availableRooms = ["101", "102", "103", "201", "202", "203"];

export const AssignCustomerModal = ({ customer, onClose, onAssign }) => {
    const [selectedRoom, setSelectedRoom] = useState("");

    const handleSubmit = () => {
        if (selectedRoom) {
            onAssign(customer.id, selectedRoom);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-[#003B95]">
                    {customer.name} üçün otaq təyini
                </h2>

                <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                >
                    <option value="">Otaq seçin</option>
                    {availableRooms.map((room) => (
                        <option key={room} value={room}>
                            Otaq {room}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Ləğv et
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedRoom}
                        className="px-4 py-2 bg-[#003B95] text-white rounded-lg hover:bg-blue-900"
                    >
                        Təyin et
                    </button>
                </div>
            </div>
        </div>
    );
};
