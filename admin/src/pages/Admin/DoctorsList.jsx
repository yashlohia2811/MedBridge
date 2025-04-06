import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">ALL DOCTORS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 bg-indigo-50 group-hover:bg-primary transition-all duration-500"
            />
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.speciality}</p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <input onChange={()=>changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available} 
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                  readOnly
                />
                <p className={item.available ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                  {item.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
