import React from 'react'
import { FaBed, FaDollarSign, FaInfoCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import roomImage from '../../assets/images/room.jpeg'

const RoomCards = () => {
  const navigate = useNavigate()

  const rooms = [
    { id: 1, name: 'Room 1', price: 120 },
    { id: 2, name: 'Room 2', price: 150 },
    { id: 3, name: 'Room 3', price: 100 },
    { id: 4, name: 'Room 4', price: 180 },
  ]

  const handleDetailClick = (id) => {
    navigate(`/rooms/${id}`)
  }

  return (
    <div className="py-12 container mx-auto">
      <h2 className="text-4xl text-center font-bold mb-10 text-[#003B95] px-6">Our Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
          >
            <img
              src={roomImage}
              alt={room.name}
              className="w-full h-48 object-cover rounded-t-2xl"
            />

            {/* Detail Icon */}
            <div
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => handleDetailClick(room.id)}
            >
              <FaInfoCircle className="text-[#003B95] text-xl hover:text-[#0056d2]" />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#003B95] flex items-center gap-2 mb-2">
                <FaBed /> {room.name}
              </h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates!
              </p>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-green-600 font-bold text-lg">
                  <FaDollarSign className="mr-1" /> {room.price} / night
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
