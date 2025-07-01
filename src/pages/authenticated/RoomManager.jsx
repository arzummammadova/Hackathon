import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Repeat } from 'lucide-react'

const RoomManager = () => {
    const [rooms, setRooms] = useState([
        { id: 1, name: 'Otaq 1', status: 'boş' },
        { id: 2, name: 'Otaq 2', status: 'dolu' },
    ])
    const [newRoom, setNewRoom] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editingName, setEditingName] = useState('')

    const handleAddRoom = () => {
        if (newRoom.trim()) {
            setRooms([...rooms, { id: Date.now(), name: newRoom, status: 'boş' }])
            setNewRoom('')
        }
    }

    const handleDeleteRoom = (id) => {
        setRooms(rooms.filter((room) => room.id !== id))
    }

    const handleEditRoom = (id, name) => {
        setEditingId(id)
        setEditingName(name)
    }

    const handleSaveEdit = () => {
        setRooms(
            rooms.map((room) =>
                room.id === editingId ? { ...room, name: editingName } : room
            )
        )
        setEditingId(null)
        setEditingName('')
    }

    const toggleStatus = (id) => {
        setRooms(
            rooms.map((room) =>
                room.id === id
                    ? { ...room, status: room.status === 'boş' ? 'dolu' : 'boş' }
                    : room
            )
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
                <h1 className="text-2xl font-bold text-[#003B95] mb-4">Otaqlar</h1>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newRoom}
                        onChange={(e) => setNewRoom(e.target.value)}
                        placeholder="Yeni otaq adı"
                        className="flex-1 border p-2 rounded-md"
                    />
                    <button
                        onClick={handleAddRoom}
                        className="bg-[#003B95] text-white px-4 py-2 rounded-md hover:bg-blue-800"
                    >
                        <Plus size={18} className="inline mr-1" />
                        Əlavə et
                    </button>
                </div>

                <ul className="space-y-2">
                    {rooms.map((room) => (
                        <li
                            key={room.id}
                            className="flex justify-between items-center border p-3 rounded-md"
                        >
                            {editingId === room.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        className="flex-1 border p-1 rounded-md mr-2"
                                    />
                                    <button
                                        onClick={handleSaveEdit}
                                        className="text-green-600 hover:text-green-800 font-medium"
                                    >
                                        Yadda saxla
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4 flex-1">
                                        <span className="text-[#003B95] font-medium">
                                            {room.name}
                                        </span>
                                        <span
                                            className={`text-sm font-semibold px-2 py-1 rounded-full ${room.status === 'boş'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {room.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleStatus(room.id)}
                                            title="Status dəyiş"
                                            className="text-yellow-600 hover:text-yellow-800"
                                        >
                                            <Repeat size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleEditRoom(room.id, room.name)}
                                            title="Redaktə et"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRoom(room.id)}
                                            title="Sil"
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RoomManager
