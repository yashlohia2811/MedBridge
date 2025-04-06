import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors?.length > 0 && speciality) {
      const filteredDoctors = doctors.filter(
        (doc) => doc.speciality === speciality && String(doc._id) !== String(docId) // Ensure both are strings
      );
      setRelDocs(filteredDoctors);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-900 px-6">
      <h1 className="text-3xl font-semibold">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctor List */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {relDocs.slice(0, 4).map((doctor, index) => (
          <div
            key={index}
            onClick={() =>{ navigate(`/appointment/${doctor._id}`);scrollTo(0,0)}}
            className="border border-blue-300 rounded-xl cursor-pointer overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
          >
            <img className="w-full h-48 object-cover bg-blue-50" src={doctor.image} alt={doctor.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>Available</p>
              </div>
              <p className="text-lg font-medium text-gray-900">{doctor.name}</p>
              <p className="text-sm text-gray-600">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      {relDocs.length > 4 && (
        <button
          onClick={() => {
            navigate('/doctors');
            scrollTo(0, 0);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-blue-700 transition-all"
        >
          View More Doctors
        </button>
      )}
    </div>
  );
};

export default RelatedDoctors;
