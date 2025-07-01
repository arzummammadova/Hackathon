import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';

const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data?.data || res.data);

const Profile = () => {
    const { data: user, isLoading, error, mutate } = useSWR(BASE_URL + 'User/profile', fetcher);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(null);
    const [saving, setSaving] = useState(false);

    React.useEffect(() => {
        if (user) setFormData({
            userName: user.userName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            image: user.image || 'https://i.pravatar.cc/150?img=3',
        });
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => setEditing(true);
    const handleCancel = () => {
        setFormData({
            userName: user.userName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            image: user.image || 'https://i.pravatar.cc/150?img=3',
        });
        setEditing(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.put(BASE_URL + 'User/profile', formData, {
                headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
            });
            mutate();
            setEditing(false);
        } catch (err) {
            alert('Xəta baş verdi!');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-8 mt-10">
            <h1 className="text-3xl font-bold text-[#003B95] mb-8 text-center">Satıcı Profilim</h1>
            {isLoading ? (
                <div className="text-blue-600 text-center py-8">Yüklənir...</div>
            ) : error ? (
                <div className="text-red-600 text-center py-8">Xəta baş verdi!</div>
            ) : formData ? (
                <>
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src={formData.image}
                            alt="Avatar"
                            className="w-28 h-28 rounded-full object-cover border-4 border-[#003B95]/20 shadow-lg mb-4"
                        />
                        {!editing && (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 text-[#003B95] hover:underline font-semibold"
                            >
                                <Edit2 size={18} /> Redaktə et
                            </button>
                        )}
                    </div>
                    <form
                        onSubmit={e => { e.preventDefault(); handleSave(); }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">İstifadəçi adı</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                                    required
                                />
                            ) : (
                                <p className="mt-1 text-lg font-semibold text-gray-800">{formData.userName}</p>
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
                                    className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                                    required
                                />
                            ) : (
                                <p className="mt-1 text-lg font-semibold text-gray-800">{formData.email}</p>
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
                                    className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003B95]"
                                />
                            ) : (
                                <p className="mt-1 text-lg font-semibold text-gray-800">{formData.phoneNumber}</p>
                            )}
                        </div>
                        {editing && (
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
                                    disabled={saving}
                                >
                                    <X size={18} /> Ləğv et
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-1 px-4 py-2 bg-[#003B95] text-white rounded-lg hover:bg-blue-900 font-semibold"
                                    disabled={saving}
                                >
                                    <Save size={18} /> {saving ? 'Yadda saxlanır...' : 'Yadda saxla'}
                                </button>
                            </div>
                        )}
                    </form>
                </>
            ) : null}
        </div>
    );
};

export default Profile;
