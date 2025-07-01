import React from 'react'
import { FaBed, FaDollarSign } from 'react-icons/fa'
import roomImage from '../../assets/images/room.jpeg'

const RoomCards = () => {
  const rooms = [1, 2, 3, 4]

  return (
    <div className="py-12  container mx-auto">
      <h2 className="text-4xl text-center font-bold mb-10 text-[#003B95] px-6 ">Our Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={roomImage}
              alt={`Room ${room}`}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#003B95] flex items-center gap-2 mb-2">
                <FaBed className="text-[#003B95]" /> Room {room}
              </h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates!
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-green-600 font-bold text-lg">
                  <FaDollarSign className="mr-1" /> 120 / night
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

export default RoomCards
