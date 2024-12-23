import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const MainLayout = () => {
  return (
    <div>
        <div>
          <Navbar/>
        </div>
       <div className="">
       <Outlet/>
       </div>
        <div>
          <Footer/>
        </div>
    </div>
  )
}

export default MainLayout