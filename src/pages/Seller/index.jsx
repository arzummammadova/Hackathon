import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data);

const typeLabels = [
  'Standart', 'Premium', 'Suite', 'Deluxe', 'Family', 'Single', 'Double', 'Triple', 'King'
];
const pieColors = ['#00C49F', '#FF8042', '#8884d8'];

export default function Seller() {
  const { data: rooms, isLoading, error } = useSWR(BASE_URL + 'Room/get-all', fetcher);
  const [search, setSearch] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Bar chart: room type counts (type is string)
  const typeCountMap = {};
  if (rooms) {
    rooms.forEach(r => {
      const t = r.type || 'Naməlum';
      typeCountMap[t] = (typeCountMap[t] || 0) + 1;
    });
  }
  const typeCounts = Object.entries(typeCountMap).map(([type, count]) => ({ type, count }));

  // Pie chart: availability (Boş, Dolu, Naməlum)
  let available = 0, occupied = 0, unknown = 0;
  if (rooms) {
    rooms.forEach(r => {
      if (r.isEmpty === true) available++;
      else if (r.isEmpty === false) occupied++;
      else unknown++;
    });
  }
  const pieData = [
    { name: 'Boş', value: available },
    { name: 'Dolu', value: occupied },
    { name: 'Naməlum', value: unknown }
  ].filter(d => d.value > 0);

  // Search logic
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (rooms) {
      const found = rooms.find(r => r.name.toLowerCase() === e.target.value.toLowerCase());
      setSelectedRoom(found || null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003B95] mb-8 text-center">Satıcı Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Room Type Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-[#003B95]">Otaq Tipləri üzrə Say</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={typeCounts}>
              <XAxis dataKey="type" fontSize={12} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#003B95" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Room Availability Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-[#003B95]">Otaq Mövcudluğu</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Room Search */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-[#003B95]">Otaq Axtarışı</h2>
        <input
          type="text"
          placeholder="Otaq adını daxil edin..."
          value={search}
          onChange={handleSearch}
          className="w-full border border-blue-200 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {selectedRoom ? (
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
              {selectedRoom.imgKeys && selectedRoom.imgKeys.length > 0 ? (
                <img src={`https://cavid.s3.eu-north-1.amazonaws.com/${selectedRoom.imgKeys[0]}`} alt={selectedRoom.name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-400">Şəkil yoxdur</span>
              )}
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#003B95] text-lg mb-1">{selectedRoom.name}</div>
              <div className="text-gray-700 mb-1">{selectedRoom.description}</div>
              <div className="text-sm text-blue-900 mb-1">Tip: {selectedRoom.type || 'Naməlum'}</div>
              <div className="text-sm text-blue-900 mb-1">Qiymət: {selectedRoom.pricePerNight} ₼</div>
              <div className="text-sm text-blue-900 mb-1">Status: {selectedRoom.isEmpty === true ? 'Boş' : selectedRoom.isEmpty === false ? 'Dolu' : 'Naməlum'}</div>
              {selectedRoom.roomComforts && selectedRoom.roomComforts.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRoom.roomComforts.map((c, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{c.comfortName}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : search ? (
          <div className="text-gray-500">Otaq tapılmadı</div>
        ) : null}
      </div>
      {/* Loading/Error States */}
      {isLoading && <div className="text-center text-blue-600 py-8">Yüklənir...</div>}
      {error && <div className="text-center text-red-600 py-8">Xəta baş verdi!</div>}
    </div>
  );
}