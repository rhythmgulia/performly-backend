import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Userappointments = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

 useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8083/api/bookings/
        
        
        +++++++++++by-client/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching bookings');
    }
  };

  fetchBookings();
}, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Appointments</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid gap-6 max-w-3xl mx-auto">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">
                Performer: {booking.performerId?.name || "Unknown"}
              </h3>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Status:</strong> {booking.status || "Pending"}</p>
              <p><strong>Payment:</strong> {booking.paymentStatus || "Unpaid"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Userappointments;
