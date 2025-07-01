import React from 'react';
import { useParams } from 'react-router-dom';
import { FaBed, FaWifi, FaTv, FaSnowflake, FaCheckCircle } from 'react-icons/fa';

const Detail = () => {
  const { id } = useParams();

  // Mock Data
  const data = {
    id,
    title: 'Premium Otaq',
    image: 'https://cf.bstatic.com/xdata/images/hotel/square600/331514620.webp?k=ce55129c42dcbc816423cb0bf9948d62fb634c3fc722b3a4554133fe25d7b8c5&o=',
    price: '180 AZN / gecə',
    description: 'Rahat və zövqlü dizayna malik otaq. WiFi, TV, kondisioner və daha çox imkanlar.',
    amenities: [
      { icon: <FaWifi />, label: 'WiFi' },
      { icon: <FaTv />, label: 'TV' },
      { icon: <FaSnowflake />, label: 'Kondisioner' },
      { icon: <FaBed />, label: 'Rahat Yataq' },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-[#003B95] mb-10">
          {data.title}
        </h1>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={data.image}
              alt={data.title}
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-gray-700 mb-4">{data.description}</p>

              <div className="flex items-center text-blue-600 text-xl font-semibold mb-4">
                <FaCheckCircle className="mr-2" /> {data.price}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Otaq İmkanları</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {data.amenities.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      {item.icon} {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="mt-8 bg-[#003B95] text-white py-3 px-6 rounded-lg hover:bg-[#0056d2] transition duration-300 w-full md:w-auto">
              İndi rezerv et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
