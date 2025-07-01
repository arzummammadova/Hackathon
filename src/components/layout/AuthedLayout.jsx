import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

const AuthedLayout = () => {

    return (
        <div>
            <Navbar />
            <Outlet />

            <Footer />

        </div>
    )
}

export default AuthedLayout