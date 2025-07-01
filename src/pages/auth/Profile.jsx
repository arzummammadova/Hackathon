import React, { useState } from 'react';
import useStore from '../../store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import { toastdev } from '@azadev/react-toastdev';
import {
    User,
    Lock,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    Camera,
    Shield,
    Key,
    Eye,
    EyeOff,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const UserProfile = () => {
    const { user } = useStore();
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Calculate password strength for new password
        if (name === 'newPassword') {
            const strength = calculatePasswordStrength(value);
            setPasswordStrength(strength);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength < 50) return 'bg-red-500';
        if (strength < 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getPasswordStrengthText = (strength) => {
        if (strength < 50) return 'Zəif';
        if (strength < 75) return 'Orta';
        return 'Güclü';
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            toastdev.error('Bütün sahələri doldurun!', { sound: true, duration: 2000 });
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            toastdev.error('Yeni şifrələr uyğun deyil!', { sound: true, duration: 2000 });
            return;
        }
        if (passwordStrength < 50) {
            toastdev.error('Şifrə çox zəifdir. Daha güclü şifrə seçin!', { sound: true, duration: 2000 });
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(
                BASE_URL + 'User/update-password',
                {
                    currentPassword: form.currentPassword,
                    newPassword: form.newPassword,
                    confirmPassword: form.confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                }
            );
            console.log(res)
            toastdev.success('Şifrə uğurla yeniləndi!', { sound: true, duration: 2000 });
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setPasswordStrength(0);
        } catch (err) {
            console.log(err)
            toastdev.error(
                err.response?.data || 'Xəta baş verdi!',
                { sound: true, duration: 2000 }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Profil</h1>
                    <p className="text-gray-600">Şəxsi məlumatlarınızı idarə edin</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            {/* Profile Header */}
                            <div className="relative bg-[#003B95] p-8 text-white">
                                <div className="absolute top-4 right-4">
                                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                                        <Edit3 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img
                                            src={user?.image || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-2xl border-4 border-white/20 object-cover shadow-lg"
                                        />
                                        <button className="absolute -bottom-2 -right-2 p-2 bg-white text-blue-600 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold mb-1">{user?.userName}</h2>
                                        <p className="text-blue-100 mb-3">{user?.bio || 'Profil təsviriniz yoxdur'}</p>
                                        <div className="flex items-center gap-2 text-sm text-blue-100">
                                            <Calendar className="w-4 h-4" />
                                            <span>Qoşulub: {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString('az-AZ') : 'Məlum deyil'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="p-2 bg-[#003B95] rounded-lg">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">İstifadəçi adı</p>
                                                <p className="text-gray-800 font-semibold">{user?.userName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="p-2 bg-[#003B95] rounded-lg">
                                                <Mail className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Email</p>
                                                <p className="text-gray-800 font-semibold">{user?.email || 'Təyin edilməyib'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="p-2 bg-[#003B95] rounded-lg">
                                                <Phone className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Telefon</p>
                                                <p className="text-gray-800 font-semibold">{user?.phoneNumber || 'Təyin edilməyib'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="p-2 bg-[#003B95] rounded-lg">
                                                <MapPin className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Məkan</p>
                                                <p className="text-gray-800 font-semibold">{user?.location || 'Təyin edilməyib'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Change Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-[#003B95] to-[#003B95] p-6 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Təhlükəsizlik</h3>
                                        <p className="text-blue-100 text-sm">Şifrənizi yeniləyin</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordUpdate} className="p-6 space-y-4">
                                {/* Current Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cari şifrə
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <Key className="w-5 h-5 text-[#003B95]" />
                                        </div>
                                        <input
                                            type={showPasswords.current ? 'text' : 'password'}
                                            name="currentPassword"
                                            value={form.currentPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Cari şifrənizi daxil edin"
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('current')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPasswords.current ?
                                                <EyeOff className="w-5 h-5 text-gray-400" /> :
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            }
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Yeni şifrə
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <Lock className="w-5 h-5 text-[#003B95]" />
                                        </div>
                                        <input
                                            type={showPasswords.new ? 'text' : 'password'}
                                            name="newPassword"
                                            value={form.newPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Yeni şifrənizi daxil edin"
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('new')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPasswords.new ?
                                                <EyeOff className="w-5 h-5 text-gray-400" /> :
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            }
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {form.newPassword && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Şifrə gücü</span>
                                                <span className={`font-medium ${passwordStrength < 50 ? 'text-red-600' :
                                                        passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                                                    }`}>
                                                    {getPasswordStrengthText(passwordStrength)}
                                                </span>
                                            </div>
                                            <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                                                    style={{ width: `${passwordStrength}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Şifrəni təsdiqlə
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <CheckCircle className="w-5 h-5 text-[#003B95]" />
                                        </div>
                                        <input
                                            type={showPasswords.confirm ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Şifrəni təkrar daxil edin"
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPasswords.confirm ?
                                                <EyeOff className="w-5 h-5 text-gray-400" /> :
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            }
                                        </button>
                                    </div>

                                    {/* Password Match Indicator */}
                                    {form.confirmPassword && (
                                        <div className="mt-2 flex items-center gap-2">
                                            {form.newPassword === form.confirmPassword ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span className="text-sm text-green-600">Şifrələr uyğundur</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                                    <span className="text-sm text-red-600">Şifrələr uyğun deyil</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] ${loading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Yenilənir...</span>
                                        </div>
                                    ) : (
                                        'Şifrəni yenilə'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;