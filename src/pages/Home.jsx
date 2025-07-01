import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import RoomCards from '../components/rooms/RoomCards'
const Home = () => {
  return (
    <div>
    <Hero/>
    <RoomCards/>
    </div>
  )
}

export default Home
