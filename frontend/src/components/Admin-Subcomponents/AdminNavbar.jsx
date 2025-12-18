import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
function AdminNavbar() {
  const navigate = useNavigate();
  const [isActive , setIsActive] = useState(false)
  const handleClick = ()=>{
    navigate('register')
    setIsActive(true)
    console.log(isActive)
  }
  return (
    <>
      <div className="w-100 bg-slate-700 flex flex-col">
        <div className="h-30 bg-slate-900 flex items-center justify-center shadow-2xl">
          <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div className={`mt-5 relative text-white  w-full h-15 flex rounded-md p-4 pl-8 font-semibold hover:bg-slate-600  cursor-pointer ${isActive ?'bg-slate-600 border-l-5 border-cyan-300': ''}`}onClick={handleClick}>
            <FaUserPlus className="absolute top-5.5 text-white text-[18px]" />
            <p className="text-[19px] ml-8">Registration</p>
          </div>
          <div className="mt-2 text-white text-[18px]">User Management</div>
          <div className="mt-2 text-white text-[18px]">Settings</div>
          <div className="mt-2 text-white text-[18px]">Reports</div>
        </div>
      <div className="h-25 w-full border-t-2 border-cyan-300  bg-slate-600 mt-auto flex items-center gap-2 justify-center cursor-pointer" onClick={()=>navigate('/')}>
        <MdLogout className="text-white" size={24}/>
        <p className="text-white font-semibold text-[19px]">Log Out</p>
      </div>
      </div>
    </>
  );
}

export default AdminNavbar;
