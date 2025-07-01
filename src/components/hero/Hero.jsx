import React, { useState } from 'react'
import { FaBed, FaCalendarAlt, FaUser } from 'react-icons/fa'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Hero = () => {
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)

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
    <div className="bg-[#003B95] text-white min-h-[400px] flex flex-col justify-center items-center p-5 relative">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Find your dream room</h1>
      <p className="text-xl mb-6 text-center">Search your dream room …</p>

      <div className="bg-white rounded-md border-[3px] border-yellow-400 p-2 flex flex-col md:flex-row items-center gap-2 shadow-md w-full max-w-5xl">
        {/* Location */}
        <div className="flex items-center gap-2 px-4 py-3 w-full md:w-[33%] border rounded-md">
          <FaBed className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Choose your room"
            className="w-full outline-none text-sm text-black placeholder-gray-500"
          />
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

        {/* Search Button */}
        <button className="bg-[#0071c2] text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-800 transition">
          Search
        </button>
      </div>
    </div>
  )
}

export default Hero
