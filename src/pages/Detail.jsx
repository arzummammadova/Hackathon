import React, { useState } from 'react';
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

const Detail = () => {
  const { id } = useParams();

  const images = [
    'https://cf.bstatic.com/xdata/images/hotel/square600/331514620.webp?k=ce55129c42dcbc816423cb0bf9948d62fb634c3fc722b3a4554133fe25d7b8c5&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/644557000.jpg?k=532d18f52dc600eeafdcab9d1c55772841898b4655fde35f11d8abff14c75781&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max500/530780795.jpg?k=676b975f6b9560a56e88ff2e9c6e29078d9c4f02594ca461cab97b978e1734ed&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max300/530780852.jpg?k=1c5353aa5d536427dfa72984d96a510414125d07d69a4eadf756e6d5fe1a902d&o=',
    'https://cf.bstatic.com/xdata/images/hotel/max300/644566622.jpg?k=4d0cd4de9869874115a5ae9625fbe7925a51f91810a249342dcbd9b6c19899bc&o=',
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { user } = useStore()

  const data = {
    id,
    title: 'Premium Otaq',
    image: currentImage,
    price: '180 AZN / gecə',
    description:
      'Rahat və zövqlü dizayna malik otaq. WiFi, TV, kondisioner və daha çox imkanlar.',
    amenities: [
      { icon: <FaWifi />, label: 'Pulsuz WiFi' },
      { icon: <FaTv />, label: 'Smart TV' },
      { icon: <FaSnowflake />, label: 'Kondisioner' },
      { icon: <FaBed />, label: 'Kral yatağı' },
      { icon: <FaUtensils />, label: 'Səhər yeməyi' },
      { icon: <FaSwimmingPool />, label: 'Hovuz' },
      { icon: <FaParking />, label: 'Pulsuz parkinq' },
      { icon: <FaUmbrellaBeach />, label: 'Dəniz mənzərəsi' },
      { icon: <FaConciergeBell />, label: '24/7 xidmət' },
    ],
    detailedDescription: [
      {
        title: 'Otaq haqqında',
        content:
          'Bu premium otaq 35 m² sahəyə malikdir və müasir interyer dizaynı ilə təchiz edilmişdir. Otaqda geniş və rahat yataq, iş masası və istirahət üçün oturacaq zonası var. Pəncərələrdən şəhərin gözəl mənzərəsini seyr edə bilərsiniz.',
      },
      {
        title: 'Yemək imkanları',
        content:
          'Səhər açıq büfe şəklində zəngin səhər yeməyi təqdim edilir. Oteldə restoran və kafe də mövcuddur. Otaqda minibar və çay/qəhvə hazırlama dəsti var.',
      },
      {
        title: 'Ətraflı məlumat',
        content:
          'Otaqda təmizlik gündəlik həyata keçirilir. Dəyərli əşyalar üçün seyf mövcuddur. Qonaqlar fitnes zalından, spa mərkəzindən və hovuzdan pulsuz istifadə edə bilərlər. Resepsiya 24 saat xidmət göstərir.',
      },
    ],
    videoUrl: 'https://www.youtube.com/embed/MYDRWJuAlB0',
    rules: [
      'Giriş: 14:00 | Çıxış: 12:00',
      'Uşaq 6 yaşadək pulsuz',
      'Piyada heyvanlara icazə verilmir',
      'Tütün məhsullarının istifadəsi qadağandır',
    ],
  };

  const visibleAmenities = showAllAmenities
    ? data.amenities
    : data.amenities.slice(0, 4);

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async () => {
    if (!checkInDate || !checkOutDate) {
      toastdev.error('Tarix aralığını seçin!', { sound: true, duration: 2000 });
      return;
    }
    setBookingLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + 'Reservation',
        {
          customerId: user?.id,
          roomId: 1,
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
          serviceId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        }
      );
      console.log(res)

      toastdev.success('Rezervasiya uğurla tamamlandı!', { sound: true, duration: 2000 });
      setShowBookingModal(false);
      setCheckInDate(null);
      setCheckOutDate(null);
    } catch (err) {
      console.log(err)
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
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#003B95] mb-10">
          {data.title}
        </h1>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="md:w-1/2">
            {/* Main Image */}
            <img
              src={currentImage}
              alt={data.title}
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
              <p className="text-gray-700 mb-4">{data.description}</p>

              <div className="flex items-center text-blue-600 text-xl font-semibold mb-4">
                <FaCheckCircle className="mr-2" /> {data.price}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Otaq İmkanları
                </h3>
                <ul className="grid grid-cols-2 gap-3 mb-3">
                  {visibleAmenities.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="text-[#003B95]">{item.icon}</span> {item.label}
                    </li>
                  ))}
                </ul>
                {data.amenities.length > 4 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-[#003B95] text-sm font-medium hover:underline"
                  >
                    {showAllAmenities ? 'Daha az göstər' : 'Bütün imkanları göstər'}
                  </button>
                )}
              </div>
            </div>

            <button
              className="mt-8 bg-[#003B95] text-white py-3 px-6 rounded-lg hover:bg-[#0056d2] transition duration-300 w-full md:w-auto shadow-md hover:shadow-lg"
              onClick={handleBookNow}
            >
              İndi rezerv et
            </button>
          </div>
        </div>

        {/* Detailed Information Section */}
        <section className="mt-16 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#003B95] mb-6">Otaq haqqında ətraflı məlumat</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.detailedDescription.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#003B95] mb-6">Otelimiz haqqında video</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="450"
              src={data.videoUrl}
              title="Hotel video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>
        </section>

        {/* Rules Section */}
        <section className="mt-16 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#003B95] mb-6">Qaydalar və şərtlər</h2>
          <ul className="space-y-3">
            {data.rules.map((rule, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#003B95] mr-2">•</span>
                <span className="text-gray-700">{rule}</span>
              </li>
            ))}
          </ul>
        </section>

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