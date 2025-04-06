import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className='flex bg-primary rounded-lg px-6 md:px-14 my-20 md:mx-10 '>
      <div className='flex-1 py-8 md:py-16'>
        <div className='text-3xl font-semibold text-white'>
            <p>Book Appointmnet</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-white text-sm text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create account</button>

      </div>
      <div className='hidden md:block md:w-1/2 relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md'src={assets.appointment_img} alt="" />

      </div>
    </div>
  )
}

export default Banner
