import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import RoomCards from '../components/rooms/RoomCards'
import PopularRoomCard from '../components/rooms/PopularRoomCard'
import Madeeasy from '../components/rooms/Madeeasy'
import VacationSection from '../components/vacation/VacationSection'
import Faqs from '../components/faqs/Faqs'
const Home = () => {
  return (
    <div>
    <Hero/>
    <PopularRoomCard/>
    <RoomCards/>
    <Madeeasy/>
    <VacationSection/>
    <Faqs/>
    
    </div>
  )
}

export default Home
