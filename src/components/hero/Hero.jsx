import React, { useState } from 'react'
import { FaBed, FaCalendarAlt, FaUser } from 'react-icons/fa'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import useSWR from 'swr'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../constants/api'
import { useNavigate } from 'react-router-dom'

const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` } }).then(res => res.data)

const typeLabels = [
  'Standart', 'Premium', 'Suite', 'Deluxe', 'Family', 'Single', 'Double', 'Triple', 'King'
]

const S3_BASE_URL = 'https://cavid.s3.eu-north-1.amazonaws.com/'

const Hero = () => {
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const { data: rooms, isLoading } = useSWR(BASE_URL + 'Room/get-all', fetcher)
  const filteredRooms = rooms && searchValue
    ? rooms.filter(r => r.name.toLowerCase().includes(searchValue.toLowerCase()))
    : []

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  })

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]:
        operation === 'inc'
          ? prev[name] + 1
          : prev[name] > 0
            ? prev[name] - 1
            : 0,
    }))
  }


  return (
    <div className="relative min-h-[500px] flex flex-col justify-center items-center text-white">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center z-5" style={{ backgroundImage: `url('https://q-xx.bstatic.com/xdata/images/xphoto/max2880/463396394.jpg?k=3cf8c6ecca6bcd622c251d59165091e09c09676e2e0574ded4e9e84c4868b824&o=')` }}></div>

      {/* Overlay filter */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 p-5 w-full max-w-7xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Find your dream room</h1>
        <p className="text-xl mb-6">Search your dream room …</p>

        <div className="bg-white mx-auto rounded-md border-[3px] border-yellow-400 p-2 flex flex-col md:flex-row items-center gap-2 shadow-md w-full max-w-5xl relative">
          {/* Location (Room Search) */}
          <div className="flex flex-col w-full md:w-[33%] relative">
            <div className="flex items-center gap-2 px-4 py-3 border rounded-md bg-white">
              <FaBed className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Choose your room"
                className="w-full outline-none text-sm text-black placeholder-gray-500"
                value={searchValue}
                onChange={e => {
                  setSearchValue(e.target.value)
                  setShowResults(true)
                }}
                onFocus={() => setShowResults(true)}
              />
            </div>
            {/* Dynamic search results dropdown */}
            {showResults && searchValue && (
              <div className="absolute left-0 right-0 top-14 bg-white text-black rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto border border-blue-100">
                {isLoading ? (
                  <div className="p-4 text-blue-600 text-center">Yüklənir...</div>
                ) : filteredRooms.length > 0 ? (
                  filteredRooms.map(room => (
                    <div
                      key={room.id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                      onMouseDown={e => {
                        e.preventDefault();
                        navigate(`/rooms/${room.id}`);
                        setShowResults(false);
                      }}
                    >
                      <div className="w-12 h-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                        {room.imgKeys && room.imgKeys.length > 0 ? (
                          <img src={S3_BASE_URL + room.imgKeys[0]} alt={room.name} className="object-cover w-full h-full" />
                        ) : (
                          <span className="text-gray-400 text-xs">No Image</span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-[#003B95]">{room.name}</div>
                        <div className="text-xs text-gray-600">{typeLabels[room.type] || room.type}</div>
                        <div className="text-xs text-blue-900 font-bold">{room.pricePerNight} ₼</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-gray-500 text-center">Otaq tapılmadı</div>
                )}
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div
            onClick={() => setOpenDate(!openDate)}
            className="flex items-center gap-2 px-4 py-3 w-full md:w-[33%] border rounded-md cursor-pointer relative"
          >
            <FaCalendarAlt className="text-gray-500 text-lg" />
            <span className="text-sm text-gray-700">
              {`${format(date[0].startDate, 'MM/dd/yyyy')} — ${format(date[0].endDate, 'MM/dd/yyyy')}`}
            </span>
            {openDate && (
              <div className="absolute top-20 z-50">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div
            onClick={() => setOpenOptions(!openOptions)}
            className="flex items-center justify-between gap-2 px-4 py-3 w-full md:w-[33%] border rounded-md cursor-pointer relative"
          >
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-500 text-lg" />
              <span className="text-sm text-gray-700">
                {`${options.adult} adults · ${options.children} children · ${options.room} room`}
              </span>
            </div>
            <span className="text-xl text-gray-500">▼</span>

            {openOptions && (
              <div className="absolute top-20 bg-white text-black p-4 rounded-md shadow-md z-50 w-64">
                {['adult', 'children', 'room'].map((item) => (
                  <div key={item} className="flex justify-between items-center mb-2">
                    <span className="capitalize">{item}</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                        onClick={() => handleOption(item, 'dec')}
                      >
                        -
                      </button>
                      <span>{options[item]}</span>
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                        onClick={() => handleOption(item, 'inc')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
