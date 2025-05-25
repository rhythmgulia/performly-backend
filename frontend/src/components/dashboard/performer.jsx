import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingsByPerformer = () => {
  const { id } = useParams(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id, token]);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:8083/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setBookings(prev =>
        prev.map(booking =>
          booking._id === bookingId ? { ...booking, status: res.data.booking.status } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (loading) return <p className="text-center text-blue-500 text-lg">Loading bookings...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700 text-center">Performer Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found for this performer.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Booking Date: {new Date(booking.date).toLocaleDateString()}
              </h3>
              <p className="text-gray-700 mb-1"><strong>Location:</strong> {booking.location}</p>
              <p className="text-gray-700 mb-1"><strong>Status:</strong> {booking.status}</p>
              <p className="text-gray-700 mb-1"><strong>Payment:</strong> {booking.paymentStatus}</p>

              {booking.status === 'Pending' && (
                <div className="mt-4 flex gap-2">
                  <button
                    className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium"
                    onClick={() => handleUpdateStatus(booking._id, 'Confirmed')}
                  >
                    Confirm
                  </button>
                  <button
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
                    onClick={() => handleUpdateStatus(booking._id, 'Rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsByPerformer;
