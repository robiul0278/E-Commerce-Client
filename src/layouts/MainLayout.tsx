import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/Footer'
import ResponsiveNavbar from '../shared/ResponsiveNavbar'

const MainLayout = () => {
  return (
    <div>
      <ResponsiveNavbar />
      <div className='max-w-[1390px] mx-auto mt-32'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout