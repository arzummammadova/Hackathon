import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import RoomCards from '../components/rooms/RoomCards'
import PopularRoomCard from '../components/rooms/PopularRoomCard'
const Home = () => {
  return (
    <div>
    <Hero/>
    <PopularRoomCard/>
    <RoomCards/>

    
    </div>
  )
}

export default Home
