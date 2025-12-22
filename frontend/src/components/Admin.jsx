import React from 'react'
import AdminNavbar from './Admin-Subcomponents/AdminNavbar'
import { Outlet } from 'react-router-dom'
function Admin() {
  return (
    <div className='grid grid-cols-[20%_80%] h-screen w-full'>
        <AdminNavbar/>
    <div className='flex flex-col h-screen overflow-y-auto'>
      
        <Outlet/>
    </div>
    </div>
    
  )
}

export default Admin
