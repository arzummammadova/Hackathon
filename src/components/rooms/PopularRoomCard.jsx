import React from 'react'
import { FaBed, FaDollarSign, FaStar } from 'react-icons/fa'
import roomImage from '../../assets/images/room.jpeg'

const PopularRoomCard = () => {
  // Eyni kartı 2 dəfə göstərmək üçün massiv
  const rooms = [1, 2]

  return (
    <div className="py-12  container mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-[#003B95] px-6">
        Popular Roomss

      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        {rooms.map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="relative">
              <img
                src={roomImage}
                alt={`Popular Room ${index + 1}`}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="absolute top-3 right-3 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <FaStar /> Popular
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#003B95] flex items-center gap-2 mb-2">
                <FaBed className="text-[#003B95]" /> Deluxe Room
              </h3>
              <p className="text-gray-600 mb-4">
                Spacious, comfortable, and well-decorated room perfect for relaxation.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600 font-bold text-lg">
                  <FaDollarSign className="mr-1" /> 150 / night
                </div>
                <button className="bg-[#003B95] text-white px-4 py-2 rounded-lg hover:bg-[#0056d2] transition duration-200">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularRoomCard
