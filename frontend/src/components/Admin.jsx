import React from 'react'
import AdminNavbar from './Admin-Subcomponents/AdminNavbar'
import { Outlet } from 'react-router-dom'
function Admin() {
  return (
    <div className='flex h-screen overflow-hidden flex-row'>
        <AdminNavbar/>
    <div className='flex-1 overflow-y-auto'>
        <Outlet/>
    </div>
    </div>
    
  )
}

export default Admin
