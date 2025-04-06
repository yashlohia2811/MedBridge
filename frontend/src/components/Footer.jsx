import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='bg-gray-100 py-10 px-6 mt-10 border-t border-gray-300'>
      <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-gray-700'>
        {/* Logo and Description */}
        <div>
          <img className='w-40 mb-5' src={assets.logo} alt="Logo" />
          <p className='text-sm leading-relaxed'>
            Book online doctor appointments easily with our secure and user-friendly platform. Connect with experienced healthcare professionals across various specialties for consultations, prescriptions, and follow-ups—anytime, anywhere. Your health, our priority!
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-lg font-semibold text-gray-800 mb-3'>Company</p>
          <ul className='space-y-2 text-sm'>
            <li className='hover:text-primary cursor-pointer'>Home</li>
            <li className='hover:text-primary cursor-pointer'>About us</li>
            <li className='hover:text-primary cursor-pointer'>Contact us</li>
            <li className='hover:text-primary cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <p className='text-lg font-semibold text-gray-800 mb-3'>Contact Us</p>
          <ul className='text-sm space-y-2'>
            <li>Email: <span className='font-medium text-primary'>yashohia25@gmail.com</span></li>
            <li>Phone: <span className='font-medium text-primary'>+91 9122264337</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
