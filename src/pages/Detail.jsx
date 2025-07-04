import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaBed,
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCheckCircle,
  FaUtensils,
  FaSwimmingPool,
  FaParking,
  FaUmbrellaBeach,
  FaConciergeBell,
} from 'react-icons/fa';
import bg from '../assets/bg.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toastdev } from '@azadev/react-toastdev';
import { BASE_URL } from '../constants/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useStore from '../store';
import useSWR from 'swr';

const Detail = () => {
  const { id } = useParams();

  // Fetch room details from API
  const { data: roomData, isLoading: roomLoading, error: roomError } = useSWR(
    id ? `${BASE_URL}Room/get-by-id/${id}` : null,
    url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data)
  );

  // Build image URLs from imgKeys
  const S3_URL = 'https://cavid.s3.eu-north-1.amazonaws.com/';
  const images = roomData?.imgKeys && roomData.imgKeys.length > 0
    ? roomData.imgKeys.map(key => S3_URL + key)
    : [
        'https://cf.bstatic.com/xdata/images/hotel/square600/331514620.webp?k=ce55129c42dcbc816423cb0bf9948d62fb634c3fc722b3a4554133fe25d7b8c5&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/644557000.jpg?k=532d18f52dc600eeafdcab9d1c55772841898b4655fde35f11d8abff14c75781&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max500/530780795.jpg?k=676b975f6b9560a56e88ff2e9c6e29078d9c4f02594ca461cab97b978e1734ed&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max300/530780852.jpg?k=1c5353aa5d536427dfa72984d96a510414125d07d69a4eadf756e6d5fe1a902d&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max300/644566622.jpg?k=4d0cd4de9869874115a5ae9625fbe7925a51f91810a249342dcbd9b6c19899bc&o=',
      ];
  const [currentImage, setCurrentImage] = useState(images[0]);
  useEffect(() => {
    if (roomData?.imgKeys && roomData.imgKeys.length > 0) {
      setCurrentImage(S3_URL + roomData.imgKeys[0]);
    }
  }, [roomData]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { user } = useStore()

  // Comforts (amenities)
  const visibleComforts = showAllAmenities
    ? (roomData?.roomComforts || [])
    : (roomData?.roomComforts || []).slice(0, 4);

  // Video URL
  const videoUrl = roomData?.videoKey ? S3_URL + roomData.videoKey : null;

  const handleBookNow = () => {
    setShowBookingModal(true);
  };
  console.log(user?.id)

  const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data);

  // Fetch customers (members) and services
  const { data: users, isLoading: usersLoading, error: usersError } = useSWR(BASE_URL + 'User/get-all', fetcher);
  const { data: services, isLoading: servicesLoading, error: servicesError } = useSWR(BASE_URL + 'Service', fetcher);
  const memberCustomers = (users || []).filter(u => u.roles && u.roles.includes('Member'));
  // Always use logged-in user
  const selectedCustomer = user?.id || (memberCustomers[0]?.id || '');
  // Service selection state
  const [selectedService, setSelectedService] = useState('');
  // Set default service when loaded
  useEffect(() => {
    if (services && services.length > 0 && !selectedService) {
      setSelectedService(services[0].id);
    }
  }, [services]);

  // Fetch reservations for this room
  const { data: roomReservations, isLoading: reservationsLoading, error: reservationsError } = useSWR(
    id ? `${BASE_URL}Reservation?roomId=${id}` : null,
    url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data)
  );

  const handleBookingSubmit = async () => {
    if (!checkInDate || !checkOutDate) {
      toastdev.error('Tarix aralığını seçin!', { sound: true, duration: 2000 });
      return;
    }
    if (!selectedCustomer) {
      toastdev.error('Müştəri seçin!', { sound: true, duration: 2000 });
      return;
    }
    if (!selectedService) {
      toastdev.error('Xidmət seçin!', { sound: true, duration: 2000 });
      return;
    }
    // Overlap check
    if (roomReservations && roomReservations.length > 0) {
      const newStart = checkInDate.getTime();
      const newEnd = checkOutDate.getTime();
      const overlap = roomReservations.some(r => {
        const existStart = new Date(r.checkInDate).getTime();
        const existEnd = new Date(r.checkOutDate).getTime();
        // Overlap if (A starts before B ends) and (A ends after B starts)
        return newStart < existEnd && newEnd > existStart;
      });
      if (overlap) {
        toastdev.error('Bu tarix aralığında otaq artıq rezerv olunub!', { sound: true, duration: 3000 });
        return;
      }
    }
    setBookingLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + 'Reservation',
        {
          customerId: selectedCustomer,
          roomId: Number(id),
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
          serviceId: selectedService,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        }
      );
      toastdev.success('Rezervasiya uğurla tamamlandı!', { sound: true, duration: 2000 });
      setShowBookingModal(false);
      setCheckInDate(null);
      setCheckOutDate(null);
    } catch (err) {
      toastdev.error(
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : null) ||
        'Xəta baş verdi!',
        { sound: true, duration: 2000 }
      );
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Loading/Error */}
        {roomLoading && <div className="text-center text-blue-600 py-10">Yüklənir...</div>}
        {roomError && <div className="text-center text-red-600 py-10">Xəta baş verdi!</div>}
        {/* Only render if data exists */}
        {roomData && (
          <>
            {/* Title */}
            {roomData.name && (
              <h1 className="text-3xl md:text-5xl font-bold text-center text-[#003B95] mb-10">
                {roomData.name}
              </h1>
            )}
            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image Section */}
              <div className="md:w-1/2">
                {/* Main Image */}
                <img
                  src={currentImage}
                  alt={roomData.name || 'Room'}
                  className="rounded-xl shadow-lg w-full h-80 object-cover mb-3"
                />
                {/* Thumbnails */}
                <div className="flex gap-3 justify-center flex-wrap">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumbnail-${idx}`}
                      className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 transition ${img === currentImage
                        ? 'border-[#003B95] scale-105'
                        : 'border-transparent hover:border-gray-300'
                        }`}
                      onClick={() => setCurrentImage(img)}
                    />
                  ))}
                </div>
              </div>
              {/* Details */}
              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  {roomData.description && (
                    <p className="text-gray-700 mb-4">{roomData.description}</p>
                  )}
                  {roomData.pricePerNight && (
                    <div className="flex items-center text-blue-600 text-xl font-semibold mb-4">
                      <FaCheckCircle className="mr-2" /> {roomData.pricePerNight} AZN / gecə
                    </div>
                  )}
                  {roomData.roomComforts && roomData.roomComforts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Otaq İmkanları
                      </h3>
                      <ul className="grid grid-cols-2 gap-3 mb-3">
                        {visibleComforts.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <span className="text-[#003B95]">
                              {item.comfort.iconKey ? (
                                <img src={S3_URL + item.comfort.iconKey} alt={item.comfort.name} className="w-5 h-5 object-contain inline-block" />
                              ) : (
                                <FaCheckCircle />
                              )}
                            </span> {item.comfort.name}
                          </li>
                        ))}
                      </ul>
                      {roomData.roomComforts.length > 4 && (
                        <button
                          onClick={() => setShowAllAmenities(!showAllAmenities)}
                          className="text-[#003B95] text-sm font-medium hover:underline"
                        >
                          {showAllAmenities ? 'Daha az göstər' : 'Bütün imkanları göstər'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <button
                  className="mt-8 bg-[#003B95] text-white py-3 px-6 rounded-lg hover:bg-[#0056d2] transition duration-300 w-full md:w-auto shadow-md hover:shadow-lg"
                  onClick={handleBookNow}
                >
                  İndi rezerv et
                </button>
              </div>
            </div>
            {/* Video Section */}
            {videoUrl && (
              <section className="mt-16">
                <h2 className="text-2xl font-bold text-[#003B95] mb-6">Otelimiz haqqında video</h2>
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                  <video controls className="rounded-xl w-full h-[450px] object-cover">
                    <source src={videoUrl} type="video/mp4" />
                    Sizin brauzeriniz video dəstəkləmir.
                  </video>
                </div>
              </section>
            )}
            {/* Rules Section */}
            {roomData.rulesAndTerms && roomData.rulesAndTerms.length > 0 && (
              <section className="mt-16 bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#003B95] mb-6">Qaydalar və şərtlər</h2>
                <ul className="space-y-3">
                  {roomData.rulesAndTerms.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#003B95] mr-2">•</span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {/* Call to Action */}
            <div className="mt-16 text-center bg-gradient-to-r from-[#003B95] to-[#0066CC] text-white py-8 px-4 rounded-xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Premium otağınızı indi rezerv edin!</h2>
              <p className="mb-6 text-lg">Xüsusi endirimlərdən yararlanmaq üçün indi müraciət edin</p>
              <button className="bg-white text-[#003B95] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                onClick={handleBookNow}
              >
                Rezervasiya et
              </button>
            </div>
          </>
        )}
        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6 text-[#003B95]">Rezervasiya et</h2>
              {/* Service select */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">Xidmət seçin</label>
                {servicesLoading ? (
                  <div className="text-blue-600">Yüklənir...</div>
                ) : servicesError ? (
                  <div className="text-red-600">Xəta baş verdi!</div>
                ) : (
                  <select
                    className="w-full border border-gray-200 rounded-lg px-4 py-2"
                    value={selectedService}
                    onChange={e => setSelectedService(Number(e.target.value))}
                  >
                    <option value="">Xidmət seçin</option>
                    {services && services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.price} ₼)</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Giriş tarixi</label>
                <DatePicker
                  selected={checkInDate}
                  onChange={date => setCheckInDate(date)}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                  placeholderText="Giriş tarixini seçin"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Çıxış tarixi</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={date => setCheckOutDate(date)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={checkInDate || new Date()}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                  placeholderText="Çıxış tarixini seçin"
                />
              </div>
              <button
                onClick={handleBookingSubmit}
                disabled={bookingLoading}
                className={`w-full py-3 rounded-lg text-white text-lg font-bold shadow-md transition-all duration-200 ${bookingLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#003B95] hover:bg-blue-800'}`}
              >
                {bookingLoading ? 'Rezerv edilir...' : 'Təsdiqlə'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;