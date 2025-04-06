import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const initPay = (order, appointmentId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Doctor Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post(
            `${backendUrl}/api/user/verify-payment`,
            { response, appointmentId },
            { headers: { token } }
          );

          if (verifyRes.data.success) {
            toast.success('Payment successful');
            getUserAppointments();
          } else {
            toast.error('Payment verification failed');
          }
        } catch (err) {
          console.error(err);
          toast.error('Payment verification error');
        }
      },
      theme: {
        color: "#0ea5e9", // Tailwind blue-500
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order, appointmentId);
      } else {
        toast.error('Unable to initiate payment');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error initializing Razorpay');
    }
  };

  useEffect(() => {
    // Dynamically load Razorpay script if not already loaded
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-2xl font-semibold mb-4 text-center">My Appointments</p>
      <div className="space-y-6">
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center md:items-start gap-4"
            >
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.docData?.image}
                  alt="Doctor"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-lg font-semibold text-gray-800">{item.docData?.name}</p>
                <p className="text-gray-600">{item.docData?.speciality}</p>
                <p className="text-gray-500 font-medium">Address:</p>
                <p className="text-gray-600">{item.docData?.address?.line1}</p>
                <p className="text-gray-600">{item.docData?.address?.line2}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Date & Time:</span>{' '}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:ml-auto">
                {!item.cancelled && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-600">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
