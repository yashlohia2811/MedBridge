import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='flex gap-10 my-10 flex-col justify-center md:flex-row mb-28 text-sm'>
        <img className='w-full md:w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-700'> Our Office</p>
          <p className='text-gray-500'> Flat No. B303<br/>Krishna Apaartment,Ratu Road,Ranchi</p>
          <p className='text-gray-500'> +91 9122264337</p>
          <p className='font-semibold text-lg text-gray-700'>Carrrers at Medbridge</p>
          <p className='text-gray-500'>Learn more about careers</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>

        </div>
      </div>
    </div>
  )
}

export default Contact
