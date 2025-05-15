import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData,backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const updateProfile = async() => {
    try{
        const updateData={
          address:profileData.address,
          fees:profileData.fees,
          available:profileData.available

        }
        const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
        if(data.success){
          toast.success(data.message)
          setIsEdit(false)
          getProfileData()
        }else{
          toast.error(data.message)
        }}
        catch(error){
        
          toast.error(error.message)
          console.log(error)
        }
       
        

    
    
  
  }
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  const handleFeeChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      fees: e.target.value
    }))
  }

  const handleAddressChange = (e, field) => {
    setProfileData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: e.target.value
      }
    }))
  }

  const handleAvailabilityChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      available: e.target.checked
    }))
  }

  const handleSave = () => {
    // Call update API here if needed
    setIsEdit(false)
  }

  return profileData && (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow rounded-lg mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        
        {/* Enlarged Square Profile Image */}
        <div className="flex-shrink-0">
          <img 
            src={profileData.image}
            alt="Doctor"
            className="w-60 h-60 object-cover rounded-lg bg-primary/80"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-4">
          <p className="text-xl font-semibold">{profileData.name}</p>

          {/* Degree and Experience */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className="bg-primary text-white px-3 py-1 rounded-full text-xs">{profileData.experience} Years</button>
          </div>

          {/* About Section */}
          <div>
            <p className="text-gray-800 font-medium">About</p>
            <p className="text-gray-600 text-sm">{profileData.about}</p>
          </div>

          {/* Fees */}
          <p className="text-sm text-gray-700">
            Appointment fee: <span className="font-medium">
              {currency} {isEdit
                ? <input
                    type="number"
                    className="border px-2 py-1 rounded w-24 ml-1"
                    onChange={handleFeeChange}
                    value={profileData.fees}
                  />
                : profileData.fees}
            </span>
          </p>

          {/* Address */}
          <div className="text-sm text-gray-700">
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profileData.address.line1}
                  onChange={(e) => handleAddressChange(e, 'line1')}
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={profileData.address.line2}
                  onChange={(e) => handleAddressChange(e, 'line2')}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ) : (
              <p>{profileData.address.line1}<br />{profileData.address.line2}</p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              className="accent-primary w-4 h-4"
              checked={profileData.available}
              onChange={isEdit ? handleAvailabilityChange : undefined}
              readOnly={!isEdit}
            />
            <label htmlFor="available" className="text-sm text-gray-700">Available</label>
          </div>

          {/* Edit & Save Buttons */}
          {isEdit ? (
            <button
              onClick={handleSave}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark text-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
