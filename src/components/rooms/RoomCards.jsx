import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useSWR from 'swr'
import {
  FaBed,
  FaCar,
  FaDollarSign,
  FaExpand,
  FaHeart,
  FaInfoCircle,
  FaShare,
  FaUtensils,
  FaWifi,
  FaStar,          // ⭐ Artıq aktivdir
} from 'react-icons/fa'

/** Simple fetcher for SWR */
const fetcher = (url) => fetch(url).then((res) => res.json())

/** Base URL for the API – used to build full image paths. */
const API_BASE = 'https://notfounders-001-site1.anytempurl.com/'

const RoomCards = () => {
  const navigate  = useNavigate()
  const [favorites, setFavorites] = useState(new Set())
  const [expandedCard, setExpandedCard] = useState(null)

  // Fetch rooms via SWR
  const { data: rooms, error, isLoading } = useSWR(
    `${API_BASE}api/Room/get-all`,
    fetcher
  )

  /* ——————— Helper handlers ——————— */
  const handleDetailClick   = (id)          => navigate(`/rooms/${id}`)
  const handleFavoriteClick = (id, e)       => {
    e.stopPropagation()
    const set = new Set(favorites)
    set.has(id) ? set.delete(id) : set.add(id)
    setFavorites(set)
  }
  const handleShareClick    = (room, e)     => {
    e.stopPropagation()
    const shareUrl = window.location.href
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text : `Check out this amazing room: ${room.name} for $${room.pricePerNight}/night`,
        url  : shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    }
  }
  const handleExpandClick   = (id, e)       => {
    e.stopPropagation()
    setExpandedCard(expandedCard === id ? null : id)
  }

  /* ——————— Icons by amenity ——————— */
  const getAmenityIcon = (amenity) => {
    const icons = { wifi: <FaWifi/>, parking: <FaCar/>, restaurant: <FaUtensils/> }
    return icons[amenity] || null
  }

  /* ——————— Loading & Error states ——————— */
  if (error)      return <div className="text-center py-16">Something went wrong while loading rooms…</div>
  if (isLoading || !rooms) return <div className="text-center py-16">Loading premium rooms…</div>

  /* ——————— Render ——————— */
  return (
    <div className="py-16 container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#003B95] to-[#0056d2] bg-clip-text text-transparent">
          Our Premium Rooms
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Experience luxury and comfort in our carefully designed accommodations
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#003B95] to-[#0056d2] mx-auto mt-6 rounded-full"/>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {rooms.map((room) => {
          /* ——— Derived / fallback data ——— */
          const imageSrc   = room.imgKeys?.length
            ? `https://cavid.s3.eu-north-1.amazonaws.com/${room.imgKeys[0]}`
            : 'https://via.placeholder.com/400x300?text=No+Image'
          const available  = room.isEmpty !== true      // null/false => available
          /* ——— Static placeholders ——— */
          const rating     = 4.8
          const reviews    = 120
          const discount   = 15                         // %

          return (
            <div
              key={room.id}
              className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden border border-gray-100 ${!available ? 'opacity-75' : ''} ${expandedCard === room.id ? 'transform scale-105 z-10' : 'hover:transform hover:scale-105'}`}
              onClick={() => handleDetailClick(room.id)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img src={imageSrc} alt={room.name} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"/>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                {/* Status / Discount badges */}
                {!available && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sold Out
                  </div>
                )}

                {discount && available && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{discount}%
                  </div>
                )}

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    onClick={(e) => handleFavoriteClick(room.id, e)}
                  >
                    <FaHeart className={`text-lg transition-colors duration-200 ${favorites.has(room.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}/>
                  </button>
                  <button
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    onClick={(e) => handleShareClick(room, e)}
                  >
                    <FaShare className="text-lg text-gray-600 hover:text-[#003B95] transition-colors duration-200"/>
                  </button>
                  <button
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    onClick={(e) => handleExpandClick(room.id, e)}
                  >
                    <FaExpand className="text-lg text-gray-600 hover:text-[#003B95] transition-colors duration-200"/>
                  </button>
                </div>

                {/* Info icon */}
                <div
                  className="absolute bottom-4 right-4 bg-[#003B95] p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-[#0056d2]"
                  onClick={(e) => { e.stopPropagation(); handleDetailClick(room.id) }}
                >
                  <FaInfoCircle className="text-white text-lg"/>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#003B95] flex items-center gap-2 mb-4 group-hover:text-[#0056d2] transition-colors duration-200">
                  <FaBed className="text-lg"/> {room.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <FaStar className="text-yellow-400 text-sm"/>
                  <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
                  <span className="text-sm text-gray-500">({reviews} reviews)</span>
                </div>

                {/* Expanded description */}
                {expandedCard === room.id && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn text-sm text-gray-600">
                    {room.description}
                  </div>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-[#003B95] font-bold text-xl">
                        <FaDollarSign className="text-lg"/>
                        <span>{room.pricePerNight}</span>
                      </div>
                      {/* Əsl qiymət (məsələn, -15 % endirim üçün) */}
                      <span className="text-gray-400 line-through text-sm">
                        ${Math.round(room.pricePerNight / (1 - discount / 100))}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">per night</span>
                  </div>

                  <button
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      available
                        ? 'bg-gradient-to-r from-[#003B95] to-[#0056d2] text-white hover:shadow-lg hover:shadow-[#003B95]/25'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!available}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {available ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#003B95]/20 transition-all duration-300 pointer-events-none"/>
            </div>
          )
        })}
      </div>

      {/* Footer info */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-[#003B95]/5 to-[#0056d2]/5 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#003B95] mb-4">Need Help Choosing?</h3>
          <p className="text-gray-600 mb-6">
            Our concierge team is available 24/7 to help you find the perfect room for your stay.
          </p>
          <button className="bg-gradient-to-r from-[#003B95] to-[#0056d2] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#003B95]/25 transition-all duration-300 transform hover:scale-105">
            Contact Concierge
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCards
