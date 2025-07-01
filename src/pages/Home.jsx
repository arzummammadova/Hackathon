import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      home
      <Link to="/courses" className="text-blue-500 hover:underline">
        Go to Courses 
        </Link>
    </div>
  )
}

export default Home
