import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {

  const { aToken } = useContext(AdminContext);
  const {dToken}=useContext(DoctorContext)

  return (
    <div className="min-h-screen w-64 bg-white border-r">
      {aToken && 
        <ul className="mt-5 text-[#515151]">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
            <p className="font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-6 h-6"
            />
            <p className="font-medium">Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
            <p className="font-medium">Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-6 h-6" />
            <p className="font-medium">Doctors List</p>
          </NavLink>
        </ul>
      }
      {dToken && 
        <ul className="mt-5 text-[#515151]">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
            <p className="font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-6 h-6"
            />
            <p className="font-medium">Appointments</p>
          </NavLink>

         

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-6 h-6" />
            <p className="font-medium">Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  );
};

export default Sidebar;