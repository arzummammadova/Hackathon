import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toastdev } from '@azadev/react-toastdev';
import { BASE_URL } from '../../constants/api';
import useSWR from 'swr';

const initialRooms = [
    { id: 1, name: 'Otaq 101', status: 'Boş' },
    { id: 2, name: 'Otaq 102', status: 'Dolu' },
    { id: 3, name: 'Otaq 103', status: 'Boş' },
];

const comfortOptions = [
    { id: 1, label: 'WiFi' },
    { id: 2, label: 'TV' },
    { id: 3, label: 'Kondisioner' },
    { id: 4, label: 'Səhər yeməyi' },
    { id: 5, label: 'Hovuz' },
    { id: 6, label: 'Parkinq' },
    { id: 7, label: 'Dəniz mənzərəsi' },
    { id: 8, label: '24/7 xidmət' },
];

const typeOptions = [
    { value: 0, label: 'Standart' },
    { value: 1, label: 'Premium' },
    { value: 2, label: 'Suite' },
    { value: 3, label: 'Deluxe' },
    { value: 4, label: 'Family' },
    { value: 5, label: 'Single' },
    { value: 6, label: 'Double' },
    { value: 7, label: 'Triple' },
    { value: 8, label: 'King' },
];

const S3_BASE_URL = 'https://cavid.s3.eu-north-1.amazonaws.com/';

const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data);

const SellerHotelManager = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [newRoomName, setNewRoomName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingStatus, setEditingStatus] = useState('Boş');

    // Modal state for add room
    const [showAddModal, setShowAddModal] = useState(false);
    const [addForm, setAddForm] = useState({
        name: '',
        description: '',
        type: 0,
        pricePerNight: '',
        isEmpty: true,
        comfortIds: [],
        imgFiles: [],
        videoFile: null,
        imgKeys: [],
        videoKey: '',
    });
    const [addLoading, setAddLoading] = useState(false);

    // SWR ilə otaqları çək
    const { data: roomsData, isLoading, error, mutate } = useSWR(BASE_URL + 'Room/get-all', fetcher);

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

    const handleDeleteRoom = async (id) => {
        if (!window.confirm('Otağı silmək istədiyinizə əminsiniz?')) return;
        try {
            await axios.delete(BASE_URL + `Room/delete-by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            toastdev.success('Otaq silindi!', { sound: true, duration: 2000 });
            mutate();
        } catch (err) {
            toastdev.error(
                err.response?.data?.message || 'Silinmə zamanı xəta baş verdi!',
                { sound: true, duration: 2000 }
            );
        }
    };

    const handleEditRoom = (room) => {
        setEditingId(room.id);
        setAddForm({
            name: room.name,
            description: room.description,
            type: room.type,
            pricePerNight: room.pricePerNight,
            isEmpty: room.isEmpty,
            comfortIds: room.roomComforts?.map(c => c.comfortId) || [],
            imgFiles: [],
            videoFile: null,
            imgKeys: room.imgKeys || [],
            videoKey: room.videoKey || '',
        });
        setShowAddModal(true);
    };

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

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingName('');
        setEditingStatus('Boş');
    };

    const handleAddRoomFormData = async (e) => {
        e.preventDefault();
        if (!addForm.name.trim() || !addForm.description.trim() || !addForm.pricePerNight) {
            toastdev.error('Bütün sahələri doldurun!', { sound: true, duration: 2000 });
            return;
        }
        setAddLoading(true);
        try {
            const formData = new FormData();
            formData.append('Name', addForm.name);
            formData.append('Description', addForm.description);
            formData.append('Type', addForm.type);
            formData.append('PricePerNight', addForm.pricePerNight);
            formData.append('IsEmpty', addForm.isEmpty);
            addForm.comfortIds.forEach(id => formData.append('ComfortIds', id));
            if (editingId) {
                formData.append('Id', editingId);
                if (addForm.imgKeys && addForm.imgKeys.length > 0) {
                    addForm.imgKeys.forEach(key => formData.append('ImgKeys', key));
                }
                if (addForm.videoKey) {
                    formData.append('VideoKey', addForm.videoKey);
                }
            }
            if (addForm.imgFiles && addForm.imgFiles.length > 0) {
                Array.from(addForm.imgFiles).forEach(file => formData.append('NewImageFiles', file));
            }
            if (addForm.videoFile) {
                formData.append('NewVideo', addForm.videoFile);
            }
            if (editingId) {
                await axios.put(BASE_URL + 'Room/update', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                });
                toastdev.success('Otaq uğurla yeniləndi!', { sound: true, duration: 2000 });
            } else {
                await axios.post(BASE_URL + 'Room/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                });
                toastdev.success('Otaq uğurla əlavə olundu!', { sound: true, duration: 2000 });
            }
            setShowAddModal(false);
            setAddForm({
                name: '',
                description: '',
                type: 0,
                pricePerNight: '',
                isEmpty: true,
                comfortIds: [],
                imgFiles: [],
                videoFile: null,
                imgKeys: [],
                videoKey: '',
            });
            setEditingId(null);
            mutate();
        } catch (err) {
            console.log(err)
            toastdev.error(
                err.response?.data?.message || 'Xəta baş verdi!',
                { sound: true, duration: 2000 }
            );
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-lg mt-4 md:mt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#003B95] mb-6 text-center">Hotel İdarəetməsi</h1>
            
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#003B95] to-[#0066CC] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow hover:from-[#0056d2] hover:to-[#003B95] font-semibold text-sm md:text-lg transition-all"
                >
                    <Plus size={18} /> Yeni Otaq
                </button>
            </div>
            
            {/* Otaq siyahısı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {isLoading && (
                    <div className="col-span-full text-center text-blue-700 text-lg py-8">Yüklənir...</div>
                )}
                {error && (
                    <div className="col-span-full text-center text-red-600 text-lg py-8">Xəta baş verdi!</div>
                )}
                {roomsData && roomsData.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-8">Heç bir otaq tapılmadı</div>
                )}
                {roomsData && roomsData.map(room => (
                    <div key={room.id} className="bg-blue-50 rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="relative w-full h-40 md:h-48 mb-3 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                            {room.imgKeys && room.imgKeys.length > 0 ? (
                                <img
                                    src={S3_BASE_URL + room.imgKeys[0]}
                                    alt={room.name}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className="text-gray-400">Şəkil yoxdur</span>
                            )}
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-[#003B95] mb-1">{room.name}</h2>
                        <div className="text-gray-700 mb-2 line-clamp-2 text-sm md:text-base">{room.description}</div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full text-xs font-semibold">{typeOptions.find(t => t.value === room.type)?.label || 'Standart'}</span>
                            <span className="text-base md:text-lg font-bold text-blue-900">{room.pricePerNight} ₼</span>
                        </div>
                        {room.roomComforts && room.roomComforts.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {room.roomComforts.slice(0, 3).map((c, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">{c.comfortName}</span>
                                ))}
                                {room.roomComforts.length > 3 && (
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">+{room.roomComforts.length - 3}</span>
                                )}
                            </div>
                        )}
                        <div className="mt-3 flex justify-between items-end">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${room.isEmpty ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {room.isEmpty ? 'Boşdur' : 'Dolu' }
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full"
                                    onClick={() => handleEditRoom(room)}
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-full"
                                    onClick={() => handleDeleteRoom(room.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Add Room Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div 
                        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#003B95]">Yeni Otaq Əlavə Et</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700 p-1"
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingId(null);
                                }}
                                disabled={addLoading}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddRoomFormData} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium text-sm text-gray-600">Otaq adı *</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    value={addForm.name}
                                    onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-1 font-medium text-sm text-gray-600">Açıqlama *</label>
                                <textarea
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    value={addForm.description}
                                    onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))}
                                    required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium text-sm text-gray-600">Tip *</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        value={addForm.type}
                                        onChange={e => setAddForm(f => ({ ...f, type: Number(e.target.value) }))}
                                    >
                                        {typeOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block mb-1 font-medium text-sm text-gray-600">Gecəlik Qiymət *</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            value={addForm.pricePerNight}
                                            onChange={e => setAddForm(f => ({ ...f, pricePerNight: e.target.value }))}
                                            required
                                        />
                                        <span className="absolute left-3 top-2.5 text-gray-500">₼</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                <label className="font-medium text-sm text-gray-600">Boşdur?</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={addForm.isEmpty}
                                        onChange={e => setAddForm(f => ({ ...f, isEmpty: e.target.checked }))}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            
                            <div>
                                <label className="block mb-1 font-medium text-sm text-gray-600">Komfortlar</label>
                                <div className="flex flex-wrap gap-2">
                                    {comfortOptions.map(opt => (
                                        <label key={opt.id} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                                            <input
                                                type="checkbox"
                                                className="rounded text-blue-600 focus:ring-blue-500"
                                                checked={addForm.comfortIds.includes(opt.id)}
                                                onChange={e => setAddForm(f => ({
                                                    ...f,
                                                    comfortIds: e.target.checked
                                                        ? [...f.comfortIds, opt.id]
                                                        : f.comfortIds.filter(id => id !== opt.id)
                                                }))}
                                            />
                                            <span className="text-sm">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block mb-1 font-medium text-sm text-gray-600">Şəkillər *</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Şəkilləri yüklə</span> və ya sürüklə
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {addForm.imgFiles.length > 0 
                                                    ? `${addForm.imgFiles.length} fayl seçildi` 
                                                    : 'PNG, JPG, JPEG (max. 5MB)'}
                                            </p>
                                        </div>
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={e => setAddForm(f => ({ ...f, imgFiles: e.target.files }))}
                                        />
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block mb-1 font-medium text-sm text-gray-600">Video (optional)</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Video yüklə</span> və ya sürüklə
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {addForm.videoFile 
                                                    ? addForm.videoFile.name 
                                                    : 'MP4, MOV (max. 20MB)'}
                                            </p>
                                        </div>
                                        <input 
                                            type="file" 
                                            accept="video/*" 
                                            className="hidden" 
                                            onChange={e => setAddForm(f => ({ ...f, videoFile: e.target.files[0] }))}
                                        />
                                    </label>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={addLoading}
                                    className={`w-full py-3 rounded-lg text-white font-bold shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${
                                        addLoading 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#003B95] hover:bg-blue-700'
                                    }`}
                                >
                                    {addLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Əlavə olunur...
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={18} />
                                            Əlavə et
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerHotelManager;