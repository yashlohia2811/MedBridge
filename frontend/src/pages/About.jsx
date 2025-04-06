import React from "react";
import { assets } from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="md:w-1/2 flex justify-center">
          <img 
            src={assets.about_image}
            alt="About Us" 
            className="w-80 h-auto rounded-lg shadow-md object-cover bg-primary border border-blue-900" 
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:ml-8">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-gray-600 mt-3 text-lg">
            We are dedicated to transforming healthcare by making it more accessible, efficient, and patient-centric. Our platform bridges the gap between patients and top healthcare professionals, offering seamless appointment scheduling, expert consultations, and personalized medical services. We believe in a future where healthcare is not just a service but a smooth and empowering experience for everyone. With our innovative approach, we ensure that quality medical care is just a few clicks away.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white shadow-lg rounded-xl mt-10 p-6 md:p-10 max-w-4xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-600">Our Vision</h2>
        <p className="text-gray-700 mt-3 text-md leading-relaxed">
          Our vision is to revolutionize the healthcare industry by making high-quality medical services accessible and effortless for everyone. We strive to bridge the gap between patients and top healthcare professionals through a seamless, digital experience. Our goal is to empower individuals with convenient, personalized, and efficient healthcare solutions that prioritize well-being and accessibility.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl w-full">
        {/* Efficiency */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-800">Efficiency</h3>
          <p className="text-gray-600 mt-2">
            Our platform ensures that you can book appointments quickly and get medical assistance without delays.
          </p>
        </div>

        {/* Convenience */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-800">Convenience</h3>
          <p className="text-gray-600 mt-2">
            Access top doctors from anywhere, at any time, without the hassle of long waiting times.
          </p>
        </div>

        {/* Personalization */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-800">Personalization</h3>
          <p className="text-gray-600 mt-2">
            We offer tailored healthcare solutions that match your individual needs and preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;