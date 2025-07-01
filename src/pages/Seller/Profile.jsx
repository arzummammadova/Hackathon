import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';

const initialProfile = {
    userName: 'orxanquliyev',
    email: 'orxan@mail.com',
    phoneNumber: '+994501234567',
    image: 'https://i.pravatar.cc/150?img=3', // avatar URL nümunəsi
};

const Profile = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(initialProfile);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => setEditing(true);

    const handleCancel = () => {
        setFormData(profile);
        setEditing(false);
    };

    const handleSave = () => {
        setProfile(formData);
        setEditing(false);
        alert('Profil məlumatları yadda saxlanıldı!');
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-bold text-[#003B95] mb-6">Profilim</h1>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={profile.image}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                />
                {!editing && (
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 text-[#003B95] hover:underline"
                    >
                        <Edit2 size={16} />
                        Redaktə et
                    </button>
                )}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">İstifadəçi adı</label>
                    {editing ? (
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                            required
                        />
                    ) : (
                        <p className="mt-1">{profile.userName}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {editing ? (
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                            required
                        />
                    ) : (
                        <p className="mt-1">{profile.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon nömrəsi</label>
                    {editing ? (
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                        />
                    ) : (
                        <p className="mt-1">{profile.phoneNumber}</p>
                    )}
                </div>

                {editing && (
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-1 px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            <X size={16} />
                            Ləğv et
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1 px-4 py-2 bg-[#003B95] text-white rounded hover:bg-blue-900"
                        >
                            <Save size={16} />
                            Yadda saxla
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
