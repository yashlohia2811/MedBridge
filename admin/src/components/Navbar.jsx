import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const {  aToken, setAToken } = useContext(AdminContext)
  const {  dToken, setDToken } = useContext(DoctorContext)

   const navigate=useNavigate()
  const logout = () => {
    navigate('/')// Replace the current URL with /login to avoid going back to the previous page after logout
    
      aToken && setAToken("");
      aToken && localStorage.removeItem("aToken");
      dToken && setDToken("");
      dToken && localStorage.removeItem("dToken");
    }
  

  return (
    <div className="px-4 py-3 border-b bg-white text-white flex justify-between items-center">
      {/* Logo & Role */}
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-36 cursor-pointer"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{aToken ? 'Admin' : 'Doctor'}</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-primary text-white px-10 py-2 rounded-full">
        Logout
      </button>
    </div>
  )
}

export default Navbar;