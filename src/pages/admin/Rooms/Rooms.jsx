import React, { useState } from 'react';
import StatisticsCards from '../../../components/adminrooms/StatisticsCards';
import AddNewRoomModal from '../../../components/adminrooms/AddNewRoomModal';
import EditRoomModal from '../../../components/adminrooms/EditRoomModal';
import RoomsTable from '../../../components/adminrooms/RoomsTable';
import SearchFilterBar from '../../../components/adminrooms/SearchFilterBar';
import RoomInfoModal from '../../../components/adminrooms/RoomInfoModal';
import ReservationsModal from '../../../components/adminrooms/ReservationsModal';
import {
  FiWifi,
  FiTv,
  FiWind,
  FiDroplet,
  FiCoffee,
  FiUmbrella,
  FiActivity,
  FiMinusCircle,
  FiWatch,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AdminRooms = () => {
  const initialRooms = [
    {
      id: 1,
      number: 101,
      title: "Luks Konfort Otaq",
      price: "200₼",
      description: "Ailə üçün rahat lüks otaq. Geniş məkan və balkonlu.",
      category: "Lüks",
      size: "King-size",
      area: "32m²",
      available: true,
      capacity: 4,
      rating: 4.8,
      comments: 24,
      amenities: ["Pulsuz WiFi", "Smart TV", "Kondisioner", "Spa", "Seher yemeyi"],
      reservations: [
        {
          id: 1,
          userId: 101,
          userName: "Əli Hüseynov",
          userPhone: "+994501234567",
          checkIn: "2025-06-15",
          checkOut: "2025-06-20",
          status: "approved",
          createdAt: "2025-04-10T14:30:00",
        },
        {
          id: 2,
          userId: 102,
          userName: "Ayşə Məmmədova",
          userPhone: "+994552345678",
          checkIn: "2025-07-01",
          checkOut: "2025-07-07",
          status: "pending",
          createdAt: "2025-05-15T10:15:00",
        }
      ]
    },
    {
      id: 2,
      number: 102,
      title: "Standart Otaq",
      price: "120₼",
      description: "Tək şəxs üçün rahat standart otaq.",
      category: "Standart",
      size: "Single",
      area: "18m²",
      available: true,
      rating: 4.2,
      comments: 15,
      amenities: ["Pulsuz WiFi", "Kondisioner"],
      reservations: [],
      capacity: 1,
    },
    {
      id: 3,
      number: 201,
      title: "Aile Otağı",
      price: "180₼",
      description: "2 nəfərlik rahat ailə otağı.",
      category: "Standart",
      size: "Double",
      area: "24m²",
      available: false,
      rating: 4.5,
      comments: 18,
      amenities: ["Pulsuz WiFi", "Kondisioner", "Seher yemeyi"],
      reservations: [
        {
          id: 3,
          userId: 103,
          userName: "Mehmet Yılmaz",
          userPhone: "+994703456789",
          checkIn: "2025-05-10",
          checkOut: "2025-05-15",
          status: "approved",
          createdAt: "2025-03-20T09:45:00",
        }
      ],
      capacity: 2,
    }
  ];
  const [rooms, setRooms] = useState(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReservationsModal, setShowReservationsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filter, setFilter] = useState('all');

  const [newRoom, setNewRoom] = useState({
    title: '',
    number: '',
    price: '',
    description: '',
    category: '',
    size: '',
    area: '',
    capacity: '',
    available: true,
    amenities: [],
    reservations: []
  });

  const availableAmenities = [
    { name: "Pulsuz WiFi", icon: <FiWifi className="mr-2" /> },
    { name: "Smart TV", icon: <FiTv className="mr-2" /> },
    { name: "Kondisioner", icon: <FiWind className="mr-2" /> },
    { name: "Spa", icon: <FiDroplet className="mr-2" /> },
    { name: "Seher yemeyi", icon: <FiCoffee className="mr-2" /> },
    { name: "Hovuz", icon: <FiUmbrella className="mr-2" /> },
    { name: "Fitness", icon: <FiActivity className="mr-2" /> },
    { name: "Mini bar", icon: <FiMinusCircle className="mr-2" /> },
    { name: "Qəlyanaltılar", icon: <FiWatch className="mr-2" /> }
  ];

  const getReservationStats = () => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(room =>
      room.reservations.some(res =>
        res.status === 'approved' &&
        new Date(res.checkIn) <= new Date() &&
        new Date(res.checkOut) >= new Date()
      )
    ).length;
    const pendingReservations = rooms.reduce(
      (acc, room) => acc + room.reservations.filter(res => res.status === 'pending').length,
      0
    );
    const upcomingReservations = rooms.reduce(
      (acc, room) => acc + room.reservations.filter(res =>
        res.status === 'approved' &&
        new Date(res.checkIn) > new Date()
      ).length,
      0
    );

    return {
      totalRooms,
      occupiedRooms,
      availableRooms: totalRooms - occupiedRooms,
      pendingReservations,
      upcomingReservations
    };
  };

  const stats = getReservationStats();

  const filteredRooms = rooms.filter(room => {
    const matchesSearch =
      room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.number.toString().includes(searchTerm);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'available' && room.available) ||
      (filter === 'occupied' && !room.available);

    return matchesSearch && matchesFilter;
  });

  const handleAddRoom = () => {
    if (!newRoom.title || !newRoom.price || !newRoom.category || !newRoom.size || !newRoom.area || !newRoom.number || !newRoom.capacity) {
      MySwal.fire({
        title: 'Xəta!',
        text: 'Zəhmət olmasa bütün tələb olunan sahələri doldurun!',
        icon: 'error',
        confirmButtonColor: '#3A80CA'
      });
      return;
    }

    const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    setRooms([...rooms, {
      ...newRoom,
      id: newId,
      rating: 0,
      comments: 0,
      reservations: []
    }]);

    setShowAddModal(false);
    setNewRoom({
      title: '',
      number: '',
      price: '',
      description: '',
      category: '',
      size: '',
      area: '',
      capacity: '',
      available: true,
      amenities: [],
      reservations: []
    });

    MySwal.fire({
      title: 'Uğurlu!',
      text: 'Yeni otaq uğurla əlavə edildi!',
      icon: 'success',
      confirmButtonColor: '#3A80CA'
    });
  };

  const handleEditRoom = () => {
    setRooms(rooms.map(room => room.id === selectedRoom.id ? selectedRoom : room));
    setShowEditModal(false);

    MySwal.fire({
      title: 'Uğurlu!',
      text: 'Otaq məlumatları uğurla yeniləndi!',
      icon: 'success',
      confirmButtonColor: '#3A80CA'
    });
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Əminsiniz?',
      text: "Bu otağı silmək istədiyinizə əminsiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3A80CA',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bəli, sil!',
      cancelButtonText: 'Ləğv et'
    }).then((result) => {
      if (result.isConfirmed) {
        setRooms(rooms.filter(room => room.id !== id));
        MySwal.fire(
          'Silindi!',
          'Otaq uğurla silindi.',
          'success'
        );
      }
    });
  };

  const handleAmenityChange = (amenityName, isEditMode = false) => {
    if (isEditMode) {
      setSelectedRoom(prev => {
        if (prev.amenities.includes(amenityName)) {
          return {
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenityName)
          };
        } else {
          return {
            ...prev,
            amenities: [...prev.amenities, amenityName]
          };
        }
      });
    } else {
      setNewRoom(prev => {
        if (prev.amenities.includes(amenityName)) {
          return {
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenityName)
          };
        } else {
          return {
            ...prev,
            amenities: [...prev.amenities, amenityName]
          };
        }
      });
    }
  };

  const openEditModal = (room) => {
    setSelectedRoom({ ...room });
    setShowEditModal(true);
  };

  const openInfoModal = (room) => {
    setSelectedRoom({ ...room });
    setShowInfoModal(true);
  };

  const openReservationsModal = (room) => {
    setSelectedRoom({ ...room });
    setShowReservationsModal(true);
  };

  const getAmenityIcon = (amenityName) => {
    const amenity = availableAmenities.find(a => a.name === amenityName);
    return amenity ? amenity.icon : null;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return { icon: <FiCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-800' };
      case 'pending':
        return { icon: <FiAlertCircle className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800' };
      case 'canceled':
        return { icon: <FiXCircle className="text-red-500" />, color: 'bg-red-100 text-red-800' };
      default:
        return { icon: null, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleReservationStatus = (roomId, reservationId, newStatus) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const updatedReservations = room.reservations.map(res => {
          if (res.id === reservationId) {
            return { ...res, status: newStatus };
          }
          return res;
        });
        return { ...room, reservations: updatedReservations };
      }
      return room;
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow" style={{ fontFamily: "'Playfair Display', serif" }}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Otaqların İdarəetmə Paneli</h2>
        <StatisticsCards stats={stats} />
      </div>

      <div className="p-6">
        {/* Search and Filter Bar Component */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          setShowAddModal={setShowAddModal}
        />

        {/* Rooms Table Component */}
        <RoomsTable
          filteredRooms={filteredRooms}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilter={setFilter}
          openInfoModal={openInfoModal}
          openEditModal={openEditModal}
          openReservationsModal={openReservationsModal}
          handleDelete={handleDelete}
        />
      </div>

      {/* Info Modal Component */}
      <RoomInfoModal
        showModal={showInfoModal}
        setShowModal={setShowInfoModal}
        selectedRoom={selectedRoom}
        getAmenityIcon={getAmenityIcon}
      />

      {/* Reservations Modal Component */}
      <ReservationsModal 
        showModal={showReservationsModal}
        setShowModal={setShowReservationsModal}
        selectedRoom={selectedRoom}
        getStatusIcon={getStatusIcon}
        handleReservationStatus={handleReservationStatus}
      />

      {/* These modals already exist as components */}
      <AddNewRoomModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        newRoom={newRoom}
        setNewRoom={setNewRoom}
        availableAmenities={availableAmenities}
        handleAmenityChange={(amenityName) => handleAmenityChange(amenityName)}
        handleAddRoom={handleAddRoom}
      />
      
      <EditRoomModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        availableAmenities={availableAmenities}
        handleAmenityChange={(amenityName) => handleAmenityChange(amenityName, true)}
        handleEditRoom={handleEditRoom}
      />
    </div>
  );
};

export default AdminRooms;