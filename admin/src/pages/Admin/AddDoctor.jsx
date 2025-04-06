import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

import axios from 'axios';
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 Year')
  const [speciality,setSpeciality] = useState('General physician')
  const [degree,setDegree] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const {backendUrl,aToken}=useContext(AdminContext)

  const onSubmitHnadler = async (event) => {
    event.preventDefault()
    try{
      if(!docImg) {
        return toast.error('Please upload doctor profile picture')
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('address', JSON.stringify({line1:address1, line2:address2}))

      formData.forEach((value,key)=>{
        console.log(`${key}: ${value}`);
      })

      const {data} = await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
        if (data.success){
          toast.success(data.message)
          setDocImg(false)
          setName('')
          setEmail('')
          setPassword('')
          setDegree('')
          setFees('')
          setAbout('')
          setAddress1('')
          setAddress2('')

        } else {
          toast.error(data.message)
      }}
    
    catch(error){
     toast.error(error.message)
     console.log(error)
    };
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Doctor
        </h2>

        <form onSubmit={onSubmitHnadler} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex items-center justify-center flex-col">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload Doctor"
                className="w-32 h-32 object-cover rounded-full border border-gray-300"
              />
            </label>
            <input type="file" id="doc-img" hidden onChange={(e)=>setDocImg(e.target.files[0])} />
            <p className="text-gray-500 text-sm mt-2">Upload Doctor Picture</p>
          </div>

          {/* Main Details Section */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Doctor Name</label>
              <input
                type="text"
                name="name"
                onChange={(e)=>setName(e.target.value)} value={name}
                placeholder="Enter full name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Doctor Email</label>
              <input
                type="email"
                name="email"
                onChange={(e)=>setEmail(e.target.value)} value={email}
                placeholder="Enter email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)} value={password}
                placeholder="Enter password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Right Side Inputs */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Experience (Years)</label>
              <select
                name="experience"
                onChange={(e)=>setExperience(e.target.value)} value={experience}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >

                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="5">5+ Years</option>
                <option value="10">10+ Years</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Consultation Fees ($)</label>
              <input
                type="number"
                name="fees"
                onChange={(e)=>setFees(e.target.value)} value={fees}
                placeholder="Enter fees"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Specialization</label>
              <select
                name="specialization"
                onChange={(e)=>setSpeciality(e.target.value)} value={speciality}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Pediatrician">Pediatrician</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Education</label>
              <input
                type="text"
                name="education"
                onChange={(e)=>setDegree(e.target.value)} value={degree}
                placeholder="Enter degree (e.g. MBBS, MD)"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              name="address1"
              onChange={(e)=>setAddress1(e.target.value)} value={address1}
              placeholder="Address Line 1"
              required
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />
            <input
              type="text"
              name="address2"
              onChange={(e)=>setAddress2(e.target.value)} value={address2}
              placeholder="Address Line 2"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* About Doctor - Full Width */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">About Doctor</label>
            <textarea
              name="about"
              onChange={(e)=>setAbout(e.target.value)} value={about}
              placeholder="Write a short description about the doctor..."
              required
              className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;