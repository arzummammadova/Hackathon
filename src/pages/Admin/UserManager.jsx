import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const UserManager = () => {
    const { data, error, isLoading, mutate } = useSWR(
        'https://notfounders-001-site1.anytempurl.com/api/User/get-all',
        fetcher
    );

    const { data: rolesData, error: rolesError, isLoading: rolesLoading } = useSWR(
        'https://notfounders-001-site1.anytempurl.com/api/Settings/get-by-key/userroles',
        fetcher
    );

    const [users, setUsers] = useState([]);
    const [modifiedUsers, setModifiedUsers] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const enriched = data.map((u) => ({
                id: u.id,
                name: u.userName,
                email: u.email || '-',
                phoneNumber: u.phoneNumber || '-',
                createdAt: u.createdAt,
                role: u.roles[0],
            }));
            setUsers(enriched);
        }
    }, [data]);

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

    const handleSaveChanges = async () => {
        const changed = users.filter(user => modifiedUsers[user.id]);

        if (changed.length === 0) {
            alert("Heç bir dəyişiklik edilməyib.");
            return;
        }

        setIsSaving(true);

        try {
            const results = await Promise.all(
                changed.map((user) =>
                    fetch('https://notfounders-001-site1.anytempurl.com/api/User/change-role', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Cookies.get('accessToken')}`
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            newRole: user.role,
                        }),
                    })
                )
            );

            const failed = results.filter(r => !r.ok);
            if (failed.length > 0) {
                alert(`${failed.length} dəyişiklik uğursuz oldu. Yenidən yoxlayın.`);
            } else {
                alert(
                    `Dəyişikliklər uğurla göndərildi:\n\n` +
                    changed.map(u => `${u.name} → ${u.role}`).join('\n')
                );
                setModifiedUsers({});
                mutate(); // SWR datanı təzələsin
            }

        } catch (err) {
            console.error(err);
            alert("Xəta baş verdi. İnternet bağlantınızı və ya serveri yoxlayın.");
        } finally {
            setIsSaving(false);
        }
    };

    if (error || rolesError) return <div className="text-red-500 text-center mt-10">Xəta baş verdi</div>;
    if (isLoading || rolesLoading) return <div className="text-center mt-10">Yüklənir...</div>;

    return (
        <div className="bg-white rounded-xl p-6 shadow max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-[#003B95] mb-4">İstifadəçi İdarəetməsi</h1>

            <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                    <thead className="bg-blue-100 text-blue-800">
                        <tr>
                            <th className="p-2 text-left">Ad</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Telefon</th>
                            <th className="p-2 text-left">Yaranma Tarixi</th>
                            <th className="p-2 text-left">Rol</th>
                            <th className="p-2 text-left">Dəyiş</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.phoneNumber}</td>
                                <td className="p-2">{new Date(user.createdAt).toLocaleString('az-AZ')}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        {rolesData && Array.isArray(rolesData) && rolesData.map((role, index) => (
                                            <option key={index} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-right mt-4">
                <button
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className={`px-5 py-2 rounded-lg transition text-white ${isSaving ? 'bg-blue-300 cursor-not-allowed' : 'bg-[#003B95] hover:bg-blue-900'}`}
                >
                    {isSaving ? 'Yadda saxlanılır...' : 'Yadda saxla'}
                </button>
            </div>
        </div>
    );
};

export default UserManager;
