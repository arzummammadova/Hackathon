import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const initialRooms = [
    { id: 1, name: 'Otaq 101', status: 'Boş' },
    { id: 2, name: 'Otaq 102', status: 'Dolu' },
    { id: 3, name: 'Otaq 103', status: 'Boş' },
];

const HotelManager = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [newRoomName, setNewRoomName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingStatus, setEditingStatus] = useState('Boş');

    // Yeni otaq əlavə et
    const handleAddRoom = () => {
        if (!newRoomName.trim()) return;
        const newRoom = {
            id: Date.now(),
            name: newRoomName.trim(),
            status: 'Boş',
        };
        setRooms([...rooms, newRoom]);
        setNewRoomName('');
    };

    // Otaq sil
    const handleDeleteRoom = (id) => {
        if (window.confirm('Otağı silmək istədiyinizə əminsiniz?')) {
            setRooms(rooms.filter(room => room.id !== id));
        }
    };

    // Redaktəyə başla
    const handleEditRoom = (room) => {
        setEditingId(room.id);
        setEditingName(room.name);
        setEditingStatus(room.status);
    };

    // Redaktəni yadda saxla
    const handleSaveEdit = () => {
        if (!editingName.trim()) return;
        setRooms(
            rooms.map(room =>
                room.id === editingId ? { ...room, name: editingName.trim(), status: editingStatus } : room
            )
        );
        setEditingId(null);
        setEditingName('');
        setEditingStatus('Boş');
    };

    // Redaktəni ləğv et
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingName('');
        setEditingStatus('Boş');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
            <h1 className="text-3xl font-bold text-[#003B95] mb-6">Hotel İdarəetməsi</h1>

            {/* Yeni otaq əlavə et */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Yeni otaq adı"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddRoom()}
                />
                <button
                    onClick={handleAddRoom}
                    className="flex items-center gap-1 bg-[#003B95] text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                    <Plus size={18} />
                    Əlavə et
                </button>
            </div>

            {/* Otaq siyahısı */}
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-blue-100 text-blue-900">
                        <th className="border px-4 py-2 text-left">Otaq adı</th>
                        <th className="border px-4 py-2 text-left">Status</th>
                        <th className="border px-4 py-2 text-center w-32">Əməliyyatlar</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.id} className="border-b hover:bg-gray-50">
                            {editingId === room.id ? (
                                <>
                                    <td className="p-2">
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <select
                                            value={editingStatus}
                                            onChange={(e) => setEditingStatus(e.target.value)}
                                            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                                        >
                                            <option value="Boş">Boş</option>
                                            <option value="Dolu">Dolu</option>
                                        </select>
                                    </td>
                                    <td className="p-2 text-center space-x-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            className="text-green-600 hover:text-green-800 font-semibold"
                                            title="Yadda saxla"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="text-gray-400 hover:text-gray-600 font-semibold"
                                            title="Ləğv et"
                                        >
                                            Ləğv
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-2">{room.name}</td>
                                    <td className="p-2">{room.status}</td>
                                    <td className="p-2 text-center space-x-4">
                                        <button
                                            onClick={() => handleEditRoom(room)}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Redaktə et"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRoom(room.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Sil"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    {rooms.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center p-4 text-gray-500">
                                Heç bir otaq tapılmadı
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HotelManager;
