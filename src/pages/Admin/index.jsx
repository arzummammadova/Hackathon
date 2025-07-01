import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data);

const typeLabels = [
  'Standart', 'Premium', 'Suite', 'Deluxe', 'Family', 'Single', 'Double', 'Triple', 'King'
];
const pieColors = ['#00C49F', '#FF8042', '#8884d8', '#003B95'];

export default function AdminDashboard() {
  const { data: users, isLoading: usersLoading, error: usersError } = useSWR(BASE_URL + 'User/get-all', fetcher);
  const { data: rooms, isLoading: roomsLoading, error: roomsError } = useSWR(BASE_URL + 'Room/get-all', fetcher);

  // User roles pie chart
  const roleCounts = { Admin: 0, Member: 0, Others: 0 };
  if (users) {
    users.forEach(u => {
      if (u.roles && u.roles.includes('Admin')) roleCounts.Admin++;
      else if (u.roles && u.roles.includes('Member')) roleCounts.Member++;
      else roleCounts.Others++;
    });
  }
  const userPieData = [
    { name: 'Admin', value: roleCounts.Admin },
    { name: 'Member', value: roleCounts.Member },
    { name: 'Digər', value: roleCounts.Others }
  ].filter(d => d.value > 0);

  // Room type bar chart
  const typeCountMap = {};
  if (rooms) {
    rooms.forEach(r => {
      const t = typeof r.type === 'number' ? typeLabels[r.type] : r.type || 'Naməlum';
      typeCountMap[t] = (typeCountMap[t] || 0) + 1;
    });
  }
  const typeCounts = Object.entries(typeCountMap).map(([type, count]) => ({ type, count }));

  // Room availability pie chart
  let available = 0, occupied = 0, unknown = 0;
  if (rooms) {
    rooms.forEach(r => {
      if (r.isEmpty === true) available++;
      else if (r.isEmpty === false) occupied++;
      else unknown++;
    });
  }
  const roomPieData = [
    { name: 'Boş', value: available },
    { name: 'Dolu', value: occupied },
    { name: 'Naməlum', value: unknown }
  ].filter(d => d.value > 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003B95] mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* User Roles Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-[#003B95]">İstifadəçi Rolları</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={userPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {userPieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Room Availability Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-[#003B95]">Otaq Mövcudluğu</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={roomPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {roomPieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Total Counts */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold mb-4 text-[#003B95]">Ümumi Statistika</h2>
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="bg-blue-50 rounded-lg px-6 py-4 text-center w-full">
              <div className="text-3xl font-bold text-[#003B95]">{users ? users.length : '-'}</div>
              <div className="text-gray-700">İstifadəçi sayı</div>
            </div>
            <div className="bg-blue-50 rounded-lg px-6 py-4 text-center w-full">
              <div className="text-3xl font-bold text-[#003B95]">{rooms ? rooms.length : '-'}</div>
              <div className="text-gray-700">Otaq sayı</div>
            </div>
          </div>
        </div>
      </div>
      {/* Loading/Error States */}
      {(usersLoading || roomsLoading) && <div className="text-center text-blue-600 py-8">Yüklənir...</div>}
      {(usersError || roomsError) && <div className="text-center text-red-600 py-8">Xəta baş verdi!</div>}
    </div>
  );
}