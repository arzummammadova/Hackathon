import React, { useState, useRef, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaHotel, 
  FaMoneyBillWave, 
  FaUsers,
  FaChartLine,
  FaChartPie,
  FaChartBar,
  FaRegMoneyBillAlt,
  FaRegCommentDots,
  FaUserPlus,
  FaSync,
  FaFileExport,
  FaCalendarWeek,
  FaCalendar,
  FaChevronDown
} from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, 
  LineElement, 
  PointElement, 
  BarElement,
  ArcElement,
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  LineElement, 
  PointElement, 
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('payments');
  const [dateRange, setDateRange] = useState('last30');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Color scheme
  const colors = {
    primaryDark: '#153954',
    primary: '#3674B5',
    success: '#04A12B',
    accent: '#E69DB8',
    text: '#333333',
    lightText: '#666666',
    border: '#e0e0e0',
    background: '#f8f9fa'
  };

  // Sample data for charts
  const generateWeekDays = () => {
    const days = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
    return dateRange === 'last7' ? days.slice(-7) : days;
  };

  const generateRoomTypes = () => {
    return ['Standart', 'Lüks', 'Ailə', 'Biznes', 'Prezident'];
  };

  // Reservation trend data
  const reservationData = {
    labels: generateWeekDays(),
    datasets: [
      {
        label: 'Cari dövr',
        data: [12, 19, 15, 23, 18, 25, 22],
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}20`,
        tension: 0.4,
        fill: true
      },
      ...(compareMode ? [{
        label: 'Keçən dövr',
        data: [10, 15, 12, 18, 14, 20, 17],
        borderColor: colors.accent,
        backgroundColor: `${colors.accent}20`,
        tension: 0.4,
        fill: true,
        borderDash: [5, 5]
      }] : [])
    ]
  };

  // Room type distribution data
  const roomTypeData = {
    labels: generateRoomTypes(),
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        colors.primary,
        colors.success,
        colors.accent,
        '#FFCE56',
        '#4BC0C0'
      ],
      borderWidth: 1
    }]
  };

  // Revenue data
  const revenueData = {
    labels: generateWeekDays(),
    datasets: [
      {
        label: 'Cari dövr',
        data: [1200, 1900, 1500, 2300, 1800, 2500, 2200],
        backgroundColor: `${colors.success}80`,
        borderColor: colors.success,
        borderWidth: 2
      },
      ...(compareMode ? [{
        label: 'Keçən dövr',
        data: [1000, 1500, 1200, 1800, 1400, 2000, 1700],
        backgroundColor: `${colors.accent}80`,
        borderColor: colors.accent,
        borderWidth: 2
      }] : [])
    ]
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} rezervasiya`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₼${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `₼${value}`;
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Toggle date range dropdown
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  // Handle date range selection
  const handleDateRangeChange = (range) => {
    setIsLoading(true);
    setDateRange(range);
    setShowDatePicker(false);
    if (range === 'custom') {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
      // Simulate data loading
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  // Handle custom date range selection
  const handleCustomDateApply = () => {
    setIsLoading(true);
    setShowCustomDatePicker(false);
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Refresh data
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Export data
  const handleExport = (format) => {
    alert(`${format.toUpperCase()} formatında ixrac edildi!`);
    document.getElementById('export-dropdown').classList.add('hidden');
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: colors.background }}>
      {/* Control Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Date Range Selector */}
        <div className="relative flex items-center gap-2">
          <button 
            onClick={toggleDatePicker}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border"
            style={{ borderColor: colors.border }}
          >
            {dateRange === 'last7' && <><FaCalendarWeek style={{ color: colors.primary }} /> Son 7 gün</>}
            {dateRange === 'last30' && <><FaCalendar style={{ color: colors.primary }} /> Son 30 gün</>}
            {dateRange === 'custom' && <><FiCalendar style={{ color: colors.primary }} /> Xüsusi tarix</>}
            <FaChevronDown className={`text-xs transition-transform ${showDatePicker ? 'transform rotate-180' : ''}`} />
          </button>
          
          {showDatePicker && (
            <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border" style={{ top: '100%', borderColor: colors.border }}>
              <div className="py-1">
                <button
                  onClick={() => handleDateRangeChange('last7')}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm ${dateRange === 'last7' ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                  style={{ color: dateRange === 'last7' ? colors.primary : colors.text }}
                >
                  <FaCalendarWeek /> Son 7 gün
                </button>
                <button
                  onClick={() => handleDateRangeChange('last30')}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm ${dateRange === 'last30' ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                  style={{ color: dateRange === 'last30' ? colors.primary : colors.text }}
                >
                  <FaCalendar /> Son 30 gün
                </button>
                <button
                  onClick={() => handleDateRangeChange('custom')}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm ${dateRange === 'custom' ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                  style={{ color: dateRange === 'custom' ? colors.primary : colors.text }}
                >
                  <FiCalendar /> Xüsusi tarix
                </button>
              </div>
            </div>
          )}

          {showCustomDatePicker && (
            <div className="absolute z-20 mt-2 p-4 bg-white rounded-lg shadow-lg border" style={{ borderColor: colors.border, top: '100%', left: 0, width: '320px' }}>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Başlanğıc tarixi</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-full p-2 border rounded"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Bitmə tarixi</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full p-2 border rounded"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowCustomDatePicker(false)}
                    className="px-3 py-1 text-sm rounded"
                    style={{ color: colors.text, border: `1px solid ${colors.border}` }}
                  >
                    Ləğv et
                  </button>
                  <button
                    onClick={handleCustomDateApply}
                    className="px-3 py-1 text-sm rounded text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Təsdiqlə
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Toggle */}
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={compareMode}
              onChange={() => setCompareMode(!compareMode)}
              className="sr-only peer"
            />
            <div 
              className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
              style={{ backgroundColor: compareMode ? colors.primary : '#d1d5db' }}
            ></div>
            <span className="ml-2 text-sm font-medium" style={{ color: colors.text }}>Keçən dövrlə müqayisə</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            style={{ borderColor: colors.border, backgroundColor: 'white' }}
            title="Yenilə"
          >
            <FaSync 
              style={{ color: colors.primary }} 
              className={isLoading ? 'animate-spin' : ''} 
            />
            <span className="hidden md:inline" style={{ color: colors.text }}>Yenilə</span>
          </button>

          <div className="relative">
            <button
              onClick={() => document.getElementById('export-dropdown').classList.toggle('hidden')}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border hover:bg-gray-50 transition-colors"
              style={{ borderColor: colors.border }}
              title="Export"
            >
              <FaFileExport style={{ color: colors.success }} />
              <span className="hidden md:inline" style={{ color: colors.text }}>Export</span>
            </button>
            
            <div id="export-dropdown" className="hidden absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border z-10" style={{ borderColor: colors.border }}>
              <div className="py-1">
                <button
                  onClick={() => handleExport('pdf')}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  style={{ color: colors.text }}
                >
                  PDF
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  style={{ color: colors.text }}
                >
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: colors.primary }}></div>
        </div>
      ) : (
        <>
          {/* Statistik Kartlar */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col" style={{ borderTop: `4px solid ${colors.primaryDark}` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-2xl mr-2" style={{ color: colors.primary }} />
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Ümumi rezervasiyalar</h2>
                </div>
                {compareMode && <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>+5.2%</span>}
              </div>
              <p className="text-3xl font-bold" style={{ color: colors.primaryDark }}>142</p>
              {compareMode && <p className="text-sm mt-1" style={{ color: colors.lightText }}>Keçən ay: 135</p>}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col" style={{ borderTop: `4px solid ${colors.success}` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaHotel className="text-2xl mr-2" style={{ color: colors.success }} />
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Boş otaqlar</h2>
                </div>
                {compareMode && <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.success}20`, color: colors.success }}>-2</span>}
              </div>
              <p className="text-3xl font-bold" style={{ color: colors.success }}>8</p>
              {compareMode && <p className="text-sm mt-1" style={{ color: colors.lightText }}>Keçən ay: 10</p>}
              <p className="text-sm mt-1" style={{ color: colors.lightText }}>Ümumi otaqlar: 24</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col" style={{ borderTop: `4px solid ${colors.accent}` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-2xl mr-2" style={{ color: colors.accent }} />
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Ümumi gəlir</h2>
                </div>
                {compareMode && <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}>+12%</span>}
              </div>
              <p className="text-3xl font-bold" style={{ color: colors.accent }}>₼12,450</p>
              {compareMode && <p className="text-sm mt-1" style={{ color: colors.lightText }}>Keçən ay: ₼11,120</p>}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col" style={{ borderTop: `4px solid ${colors.primary}` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaUsers className="text-2xl mr-2" style={{ color: colors.primary }} />
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Yeni müştərilər</h2>
                </div>
                {compareMode && <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>+8%</span>}
              </div>
              <p className="text-3xl font-bold" style={{ color: colors.primary }}>24</p>
              {compareMode && <p className="text-sm mt-1" style={{ color: colors.lightText }}>Keçən ay: 22</p>}
            </div>
          </div>

          {/* Qrafiklər və Analitika */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2" style={{ borderTop: `4px solid ${colors.primary}` }}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <FaChartLine className="text-xl mr-2" style={{ color: colors.primary }} />
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Rezervasiya tendensiyası</h2>
                </div>
                <span className="text-sm" style={{ color: colors.lightText }}>
                  {dateRange === 'last7' && 'Son 7 gün'}
                  {dateRange === 'last30' && 'Son 30 gün'}
                  {dateRange === 'custom' && `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
                </span>
              </div>
              <div className="h-64">
                <Line data={reservationData} options={lineChartOptions} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md" style={{ borderTop: `4px solid ${colors.accent}` }}>
              <div className="flex items-center mb-4">
                <FaChartPie className="text-xl mr-2" style={{ color: colors.accent }} />
                <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Ən çox istifadə olunan otaq tipləri</h2>
              </div>
              <div className="h-64">
                <Pie data={roomTypeData} options={pieChartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md" style={{ borderTop: `4px solid ${colors.success}` }}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FaChartBar className="text-xl mr-2" style={{ color: colors.success }} />
                <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Gəlir statistikası</h2>
              </div>
              <span className="text-sm" style={{ color: colors.lightText }}>
                {dateRange === 'last7' && 'Son 7 gün'}
                {dateRange === 'last30' && 'Son 30 gün'}
                {dateRange === 'custom' && `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
              </span>
            </div>
            <div className="h-64">
              <Bar data={revenueData} options={barChartOptions} />
            </div>
          </div>

          {/* Son Aktivliklər */}
          <div className="bg-white p-6 rounded-lg shadow-md" style={{ borderTop: `4px solid ${colors.primaryDark}` }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: colors.text }}>Son Aktivliklər</h2>
              <span className="text-sm" style={{ color: colors.lightText }}>Son 24 saat</span>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b mb-4" style={{ borderColor: colors.border }}>
              <button
                className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'payments' ? 'border-b-2' : 'text-gray-500'}`}
                style={{ 
                  color: activeTab === 'payments' ? colors.primary : colors.lightText,
                  borderBottomColor: activeTab === 'payments' ? colors.primary : 'transparent'
                }}
                onClick={() => setActiveTab('payments')}
              >
                <FaRegMoneyBillAlt className="mr-2" />
                Ödənişlər
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'comments' ? 'border-b-2' : 'text-gray-500'}`}
                style={{ 
                  color: activeTab === 'comments' ? colors.primary : colors.lightText,
                  borderBottomColor: activeTab === 'comments' ? colors.primary : 'transparent'
                }}
                onClick={() => setActiveTab('comments')}
              >
                <FaRegCommentDots className="mr-2" />
                Şərhlər
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm flex items-center ${activeTab === 'registrations' ? 'border-b-2' : 'text-gray-500'}`}
                style={{ 
                  color: activeTab === 'registrations' ? colors.primary : colors.lightText,
                  borderBottomColor: activeTab === 'registrations' ? colors.primary : 'transparent'
                }}
                onClick={() => setActiveTab('registrations')}
              >
                <FaUserPlus className="mr-2" />
                Qeydiyyatlar
              </button>
            </div>
            
            <div className="space-y-4">
              {activeTab === 'payments' && (
                <>
                  <div className="border-b pb-3" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium" style={{ color: colors.text }}>Ödəniş alındı: Orxan Əliyev</p>
                        <p className="text-sm" style={{ color: colors.lightText }}>Lüks otaq, 3 gecə, ₼240</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>Ödəniş</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.lightText }}>1 saat əvvəl</p>
                  </div>
                  <div className="border-b pb-3" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium" style={{ color: colors.text }}>Ödəniş alındı: Aygün Məmmədova</p>
                        <p className="text-sm" style={{ color: colors.lightText }}>Standart otaq, 2 gecə, ₼120</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>Ödəniş</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.lightText }}>3 saat əvvəl</p>
                  </div>
                </>
              )}

              {activeTab === 'comments' && (
                <>
                  <div className="border-b pb-3" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium" style={{ color: colors.text }}>Yeni şərh: Rəşad Hüseynov</p>
                        <p className="text-sm" style={{ color: colors.lightText }}>"Xidmət çox yaxşı idi, təşəkkürlər!"</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}>Şərh</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.lightText }}>2 saat əvvəl</p>
                  </div>
                  <div className="border-b pb-3" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium" style={{ color: colors.text }}>Şərh cavablandırıldı: Ləman Əliyeva</p>
                        <p className="text-sm" style={{ color: colors.lightText }}>"Təşəkkür edirik, sizi yenidən gözləyirik!"</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}>Cavab</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.lightText }}>5 saat əvvəl</p>
                  </div>
                </>
              )}

              {activeTab === 'registrations' && (
                <>
                  <div className="border-b pb-3" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium" style={{ color: colors.text }}>Yeni müştəri: Elvin Cəfərov</p>
                        <p className="text-sm" style={{ color: colors.lightText }}>elvin@example.com</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.success}20`, color: colors.success }}>Yeni</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.lightText }}>5 saat əvvəl</p>
                  </div>
                  <div className="border-b pb-3" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium" style={{ color: colors.text }}>Yeni müştəri: Günel Əhmədova</p>
                        <p className="text-sm" style={{ color: colors.lightText }}>gunel@example.com</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${colors.success}20`, color: colors.success }}>Yeni</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.lightText }}>8 saat əvvəl</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;