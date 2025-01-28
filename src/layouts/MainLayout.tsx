import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'
import { Toaster } from 'react-hot-toast'

const MainLayout = () => {
  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Navbar/>
      <Outlet />
      <Footer />
      <Toaster/>
    </div>
  )
}

export default MainLayout;