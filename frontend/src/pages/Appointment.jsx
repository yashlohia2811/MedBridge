import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [slotDateTime, setSlotDateTime] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const isSlotAvailable = docInfo?.slots_booked?.[slotDate]?.includes(formattedTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login is required');
      return navigate('/login');
    }

    if (!slotDateTime || !slotTime) {
      toast.error('Please select a valid time slot');
      return;
    }

    try {
      const date = slotDateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    if (docSlots.length > 0 && docSlots[0][0]) {
      setSlotTime(docSlots[0][0].time);
      setSlotDateTime(docSlots[0][0].datetime);
    }
  }, [docSlots]);

  return docInfo && (
    <div className="flex flex-col items-center py-12 px-5 bg-gray-50 min-h-screen">
      {/* Doctor Card */}
      <div className="bg-white shadow-xl rounded-2xl w-full sm:w-3/4 lg:w-2/3 p-6 flex flex-col md:flex-row gap-6 border border-gray-200">
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <img 
            className="w-44 h-44 md:w-52 md:h-52 rounded-xl object-cover border-4 border-primary shadow-md"
            src={docInfo.image}
            alt="Doctor"
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            {docInfo.name}
            <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
          </h2>
          <p className="text-gray-600 text-md mt-1">{docInfo.degree} - {docInfo.speciality}</p>
          <p className="text-lg font-medium text-gray-700 mt-3">
            Appointment fee: 
            <span className="text-primary font-semibold ml-1">{currencySymbol}{docInfo.fees}</span>
          </p>
          <span className="mt-3 bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full w-fit">
            {docInfo.experience} years experience
          </span>
        </div>
      </div>

      {/* About */}
      <div className="bg-white shadow-md rounded-2xl mt-8 w-full sm:w-3/4 lg:w-2/3 p-6 border border-gray-200">
        <p className="flex items-center gap-2 text-gray-700 font-semibold text-lg mb-2">
          About 
          <img className="w-5 h-5" src={assets.info_icon} alt="Info" />
        </p>
        <p className="text-gray-600 text-md">{docInfo.about}</p>
      </div>

      {/* Related Doctors */}
      <div className="mt-8 w-full sm:w-3/4 lg:w-2/3">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>

      {/* Slots */}
      <div className="mt-10 w-full sm:w-3/4 lg:w-2/3">
        <p className="font-semibold text-lg text-gray-700 mb-3">Booking Slots</p>

        {/* Days Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {
            docSlots.map((daySlots, index) => {
              const firstSlot = daySlots[0];
              const day = firstSlot?.datetime ? daysOfWeek[firstSlot.datetime.getDay()] : 'N/A';
              const date = firstSlot?.datetime ? firstSlot.datetime.getDate() : '--';

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    if (daySlots[0]) {
                      setSlotTime(daySlots[0].time);
                      setSlotDateTime(daySlots[0].datetime);
                    }
                  }}
                  className={`min-w-[60px] px-3 py-4 text-center rounded-xl cursor-pointer transition-all duration-300 
                    ${slotIndex === index ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                >
                  <p>{day}</p>
                  <p>{date}</p>
                </div>
              );
            })
          }
        </div>

        {/* Times Scroll */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {
            docSlots[slotIndex]?.map((slot, idx) => (
              <p
                key={idx}
                onClick={() => {
                  setSlotTime(slot.time);
                  setSlotDateTime(slot.datetime);
                }}
                className={`px-5 py-2 rounded-full text-sm cursor-pointer transition-all duration-200 
                  ${slot.time === slotTime 
                    ? 'bg-primary text-white' 
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
              >
                {slot.time.toLowerCase()}
              </p>
            ))
          }
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={bookAppointment}
        className="mt-8 px-8 py-3 bg-primary text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition duration-300 shadow"
      >
        Book an Appointment
      </button>
    </div>
  );
};

export default Appointment;
