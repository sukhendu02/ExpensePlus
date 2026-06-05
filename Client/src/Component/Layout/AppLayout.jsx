import React from 'react'
import Sidebar from '../ui/Sidebar'
import BottomNav from '../ui/BottomNav'
import Topbar from '../ui/Topbar'
import MobileHeader from '../ui/MobileHeader'
import {Outlet} from 'react-router-dom'

export default function AppLayout() {
  return (
    <>
      <div  className="flex w-full h-screen bg-gray-100" >
      <Sidebar  />
      <main className="main-content flex-1 overflow-x-hidden overflow-y-auto sm:m-1 p-2  mb-28 sm:mb-0 md:ml-60">
        <Outlet />
      </main>

    </div>
    </>
    
  )
}
