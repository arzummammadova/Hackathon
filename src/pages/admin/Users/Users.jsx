import React, { useState, useEffect } from 'react';
import { 
  FaTrash, 
  FaUserShield, 
  FaInfoCircle, 
  FaUserPlus, 
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaVenusMars,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminUsers = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    gender: 'all',
    active: 'all'
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'joinDate',
    direction: 'desc'
  });
  const [users, setUsers] = useState([]);

  // Sample user data
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const sampleUsers = [
      {
        id: 1,
        username: 'admin_user',
        email: 'admin@example.com',
        role: 'Admin',
        gender: 'Kişi',
        birthDate: '1990-05-15',
        joinDate: '2020-01-10',
        lastActive: '2023-06-20',
        image: 'https://i.pravatar.cc/150?img=1',
        rezervcount: 3,
        isActive: true
      },
      {
        id: 2,
        username: 'user1',
        email: 'user1@example.com',
        role: 'User',
        gender: 'Qadın',
        birthDate: '1995-08-22',
        joinDate: '2021-03-15',
        lastActive: '2023-06-18',
        image: 'https://i.pravatar.cc/150?img=2',
        rezervcount: 7,
        isActive: true
      },
      {
        id: 3,
        username: 'user2',
        email: 'user2@example.com',
        role: 'User',
        gender: 'Kişi',
        birthDate: '1988-11-30',
        joinDate: '2021-06-20',
        lastActive: '2023-05-10',
        image: null,
        rezervcount: 0,
        isActive: false
      },
      {
        id: 4,
        username: 'manager1',
        email: 'manager@example.com',
        role: 'Manager',
        gender: 'Qadın',
        birthDate: '1985-04-05',
        joinDate: '2020-11-15',
        lastActive: '2023-06-19',
        image: 'https://i.pravatar.cc/150?img=3',
        rezervcount: 12,
        isActive: true
      }
    ];
    setUsers(sampleUsers);
  }, []);

  const handleUserInfoClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleRoleChangeClick = (user) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: 'Əminsiniz?',
      text: "Bu istifadəçini silmək istədiyinizə əminsiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bəli, sil!',
      cancelButtonText: 'Xeyr'
    }).then((result) => {
      if (result.isConfirmed) {
        // In a real app, you would call an API here
        setUsers(users.filter(user => user.id !== userId));
        Swal.fire(
          'Silindi!',
          'İstifadəçi uğurla silindi.',
          'success'
        );
      }
    });
  };

  const handleRoleUpdate = (newRole) => {
    // In a real app, you would call an API here
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    setShowRoleModal(false);
    Swal.fire(
      'Uğurlu!',
      `İstifadəçi rolu ${newRole} olaraq yeniləndi`,
      'success'
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user => {
    // Search filter
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Role filter
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    
    // Gender filter
    const matchesGender = filters.gender === 'all' || user.gender === filters.gender;
    
    // Active filter
    const matchesActive = 
      filters.active === 'all' || 
      (filters.active === 'active' && user.isActive) || 
      (filters.active === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesGender && matchesActive;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ml-1 opacity-30" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="ml-1" /> : 
      <FaSortDown className="ml-1" />;
  };

  return (
    <div className="bg-white rounded-lg shadow relative">
      {/* User Info Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-200 opacity-30"
            onClick={() => setShowUserModal(false)}
          ></div>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl relative z-10 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">İstifadəçi məlumatları</h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <img 
                src={selectedUser.image || `https://picsum.photos/seed/${selectedUser.id}/150`} 
                alt={selectedUser.username}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="text-lg font-medium">@{selectedUser.username}</h4>
                <p className="text-gray-600">{selectedUser.email}</p>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                  selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedUser.isActive ? 'Aktiv' : 'Qeyri-aktiv'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Rol:</span>
                <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                  selectedUser.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                  selectedUser.role === 'Manager' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedUser.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cins:</span>
                <span className="font-medium">{selectedUser.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doğum tarixi:</span>
                <span className="font-medium">{selectedUser.birthDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Qeydiyyat tarixi:</span>
                <span className="font-medium">{selectedUser.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Son aktivlik:</span>
                <span className="font-medium">{selectedUser.lastActive}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rezerv sayı:</span>
                <span className="font-medium">{selectedUser.rezervcount}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-gray-200 opacity-30"
            onClick={() => setShowRoleModal(false)}
          ></div>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl relative z-10 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Rol dəyişikliyi</h3>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="mb-4">
              <p className="mb-2">@{selectedUser.username} üçün yeni rol seçin:</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleRoleUpdate('Admin')}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    selectedUser.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaUserShield className="inline mr-2" /> Admin
                </button>
                <button
                  onClick={() => handleRoleUpdate('Manager')}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    selectedUser.role === 'Manager' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaUserShield className="inline mr-2" /> Menecer
                </button>
                <button
                  onClick={() => handleRoleUpdate('User')}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                    selectedUser.role === 'User' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaUserShield className="inline mr-2" /> İstifadəçi
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2"
              >
                Ləğv et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">İstifadəçi İdarəsi</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <FaUserPlus className="mr-2" /> Yeni İstifadəçi
        </button>
      </div>
      
      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="İstifadəçi axtar..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUserShield className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none bg-white"
              value={filters.role}
              onChange={(e) => setFilters({...filters, role: e.target.value})}
            >
              <option value="all">Bütün rollar</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Menecer</option>
              <option value="User">İstifadəçi</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaVenusMars className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none bg-white"
              value={filters.gender}
              onChange={(e) => setFilters({...filters, gender: e.target.value})}
            >
              <option value="all">Bütün cinslər</option>
              <option value="Kişi">Kişi</option>
              <option value="Qadın">Qadın</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none bg-white"
              value={filters.active}
              onChange={(e) => setFilters({...filters, active: e.target.value})}
            >
              <option value="all">Bütün statuslar</option>
              <option value="active">Aktiv</option>
              <option value="inactive">Qeyri-aktiv</option>
            </select>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200">Şəkil</th>
                <th 
                  className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200 cursor-pointer"
                  onClick={() => handleSort('username')}
                >
                  <div className="flex items-center">
                    Username
                    {getSortIcon('username')}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200 cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    {getSortIcon('email')}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200 cursor-pointer"
                  onClick={() => handleSort('gender')}
                >
                  <div className="flex items-center">
                    Cins
                    {getSortIcon('gender')}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200 cursor-pointer"
                  onClick={() => handleSort('birthDate')}
                >
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    Doğum
                    {getSortIcon('birthDate')}
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200">Otaq sayı</th>
                <th 
                  className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200 cursor-pointer"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center">
                    Rol
                    {getSortIcon('role')}
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200">Status</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium border-b border-gray-200">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-gray-500">
                    Heç bir istifadəçi tapılmadı
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b border-gray-100">
                      <img 
                        src={user.image || `https://picsum.photos/seed/${user.id}/50`} 
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100">@{user.username}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{user.email}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{user.gender}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{user.birthDate}</td>
                    <td className="py-3 px-4 border-b border-gray-100 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        user.rezervcount > 5 ? 'bg-green-100 text-green-800' : 
                        user.rezervcount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.rezervcount}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'Manager' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isActive ? 'Aktiv' : 'Qeyri-aktiv'}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleUserInfoClick(user)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                          title="Məlumat"
                        >
                          <FaInfoCircle />
                        </button>
                        <button 
                          onClick={() => handleRoleChangeClick(user)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full"
                          title="Rol dəyiş"
                        >
                          <FaUserShield />
                        </button>
                        {user.role !== 'Admin' && (
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                            title="Sil"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Ümumi {filteredUsers.length} istifadəçi
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
                Əvvəlki
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                1
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
                Növbəti
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;