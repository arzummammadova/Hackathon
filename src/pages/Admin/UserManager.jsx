import React, { useState } from 'react';

const initialUsers = [
    { id: 1, name: 'Orxan Quliyev', email: 'orxan@mail.com', role: 'Müştəri' },
    { id: 2, name: 'Aynur Əliyeva', email: 'aynur@mail.com', role: 'Satıcı' },
    { id: 3, name: 'Kamran Məmmədov', email: 'kamran@mail.com', role: 'Müştəri' },
];

const UserManager = () => {
    const [users, setUsers] = useState(initialUsers);
    const [modifiedUsers, setModifiedUsers] = useState({});

    const handleRoleChange = (id, newRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, role: newRole } : user
            )
        );

        setModifiedUsers((prev) => ({
            ...prev,
            [id]: true,
        }));
    };

    const handleSaveChanges = () => {
        const changed = users.filter(user => modifiedUsers[user.id]);

        if (changed.length > 0) {
            alert(
                `Dəyişikliklər uğurla yadda saxlanıldı:\n\n` +
                changed.map(u => `${u.name} → ${u.role}`).join('\n')
            );
        } else {
            alert("Heç bir dəyişiklik edilməyib.");
        }

        setModifiedUsers({});
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-[#003B95] mb-4">İstifadəçi İdarəetməsi</h1>

            <table className="w-full border text-sm">
                <thead className="bg-blue-100 text-blue-800">
                    <tr>
                        <th className="p-2 text-left">Ad</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Rol</th>
                        <th className="p-2 text-left">Dəyiş</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="border rounded px-2 py-1 text-sm"
                                >
                                    <option value="Müştəri">Müştəri</option>
                                    <option value="Satıcı">Satıcı</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Save Button */}
            <div className="text-right mt-4">
                <button
                    onClick={handleSaveChanges}
                    className="bg-[#003B95] text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                    Yadda saxla
                </button>
            </div>
        </div>
    );
};

export default UserManager;
