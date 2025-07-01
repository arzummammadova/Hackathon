import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiUser, 
  FiPhone, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiFilter,
  FiSearch,
  FiDownload,
  FiPrinter
} from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Nümunə rezervasiya məlumatları
const sampleReservations = [
  {
    id: 1,
    roomId: 101,
    roomName: "Lüks Konfort Otaq",
    userName: "Əli Hüseynov",
    userPhone: "+994501234567",
    checkIn: "2023-06-15",
    checkOut: "2023-06-20",
    status: "approved",
    createdAt: "2023-05-10T14:30:00",
    price: "200₼",
    guests: 2
  },
  {
    id: 2,
    roomId: 102,
    roomName: "Standart Otaq",
    userName: "Ayşə Məmmədova",
    userPhone: "+994552345678",
    checkIn: "2023-07-01",
    checkOut: "2023-07-07",
    status: "pending",
    createdAt: "2023-05-15T10:15:00",
    price: "120₼",
    guests: 1
  },
  {
    id: 3,
    roomId: 103,
    roomName: "VIP Süit",
    userName: "Mehmet Yılmaz",
    userPhone: "+994703456789",
    checkIn: "2023-06-25",
    checkOut: "2023-06-30",
    status: "canceled",
    createdAt: "2023-05-20T16:45:00",
    price: "350₼",
    guests: 3
  }
];

// Nümunə otaq məlumatları
const sampleRooms = [
  { id: 101,number:101, name: "Lüks Konfort Otaq", capacity: 2, status: "occupied" },
  { id: 102,number:102, name: "Standart Otaq", capacity: 1, status: "reserved" },
  { id: 103,number:103, name: "VIP Süit", capacity: 4, status: "available" },
  { id: 104,number:104, name: "Ailə Otağı", capacity: 5, status: "available" }
];

const AllReservation = () => {
  const [reservations, setReservations] = useState(sampleReservations);
  const [rooms, setRooms] = useState(sampleRooms);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });

  // Filtrlənmiş rezervasiyalar
  const filteredReservations = reservations.filter(res => {
    // Status filtrasiyası
    if (filter !== 'all' && res.status !== filter) return false;
    
    // Axtarış sorğusu
    // if (searchQuery && 
    //     !res.userName.toLowerCase().includes(searchQuery.toLowerCase()) && 
    //     !res.userPhone.includes(searchQuery) {
    //   return false;
    // }
    
    // Tarix aralığı
    if (dateRange.start && dateRange.end) {
      const checkInDate = new Date(res.checkIn);
      const checkOutDate = new Date(res.checkOut);
      return checkInDate >= dateRange.start && checkOutDate <= dateRange.end;
    }
    
    return true;
  });

  // Otaq statuslarına görə statistikalar
  const roomStats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    reserved: rooms.filter(r => r.status === 'reserved').length
  };

  // Rezervasiya statusunu dəyişmə
  const updateReservationStatus = (id, newStatus) => {
    setReservations(reservations.map(res => 
      res.id === id ? {...res, status: newStatus} : res
    ));
  };

  // Status ikonu və rəngi
  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return { 
          icon: <FiCheckCircle className="text-green-500" />,
          color: 'bg-green-100 text-green-800',
          text: 'Təsdiqlənib'
        };
      case 'pending':
        return { 
          icon: <FiAlertCircle className="text-yellow-500" />,
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Gözləmədə'
        };
      case 'canceled':
        return { 
          icon: <FiXCircle className="text-red-500" />,
          color: 'bg-red-100 text-red-800',
          text: 'Ləğv edilib'
        };
      default:
        return { 
          icon: null,
          color: 'bg-gray-100 text-gray-800',
          text: 'Naməlum'
        };
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ümumi Rezervasiya İdarəetmə Paneli</h1>
      
      {/* Statistik Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Ümumi Otaqlar</h3>
          <p className="text-2xl font-bold">{roomStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Boş Otaqlar</h3>
          <p className="text-2xl font-bold text-green-600">{roomStats.available}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Dolu Otaqlar</h3>
          <p className="text-2xl font-bold text-red-600">{roomStats.occupied}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Rezervasiyalı</h3>
          <p className="text-2xl font-bold text-yellow-600">{roomStats.reserved}</p>
        </div>
      </div>
      
      {/* Filtr və Axtarış Paneli */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-500" />
            <select 
              className="border rounded px-3 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Hamısı</option>
              <option value="approved">Təsdiqlənmiş</option>
              <option value="pending">Gözləmədə</option>
              <option value="canceled">Ləğv edilmiş</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Ad, soyad və ya telefon nömrəsi ilə axtar"
              className="border rounded px-3 py-2 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <DatePicker
              selectsRange={true}
              startDate={dateRange.start}
              endDate={dateRange.end}
              onChange={(update) => {
                setDateRange({
                  start: update[0],
                  end: update[1]
                });
              }}
              placeholderText="Tarix aralığı seçin"
              className="border rounded px-3 py-2 w-full md:w-64"
            />
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-3 py-2 rounded flex items-center">
              <FiDownload className="mr-2" />
              Export
            </button>
            <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded flex items-center">
              <FiPrinter className="mr-2" />
              Çap et
            </button>
          </div>
        </div>
      </div>
      
      {/* Rezervasiya Cədvəli */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Otaq</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İstifadəçi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymət</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReservations.length > 0 ? (
              filteredReservations.map(reservation => {
                const status = getStatusBadge(reservation.status);
                return (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{reservation.roomName}</div>
                      <div className="text-sm text-gray-500">{reservation.guests} nəfər</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiUser className="mr-2 text-gray-500" />
                        <div>
                          <div className="font-medium">{reservation.userName}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FiPhone className="mr-1" />
                            {reservation.userPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-500" />
                        <div>
                          <div className="text-sm">
                            <span className="font-medium">Giriş:</span> {reservation.checkIn}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Çıxış:</span> {reservation.checkOut}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                        {status.icon && <span className="mr-1">{status.icon}</span>}
                        {status.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {reservation.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {reservation.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => updateReservationStatus(reservation.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Təsdiqlə
                          </button>
                          <button 
                            onClick={() => updateReservationStatus(reservation.id, 'canceled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Ləğv et
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Heç bir rezervasiya tapılmadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4"> Rezerv Otaq Statusları</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Otaq Nömrəsi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Otaq Adı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map(room => (
              <tr key={room.number}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {room.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {room.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {room.capacity} nəfər
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    room.status === 'available' ? 'bg-green-100 text-green-800' :
                    room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {room.status === 'available' ? 'Boş' :
                     room.status === 'occupied' ? 'Dolu' : 'Rezervasiyalı'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReservation;