import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingsByPerformer = () => {
  const { id } = useParams(); // performerId from route
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(`http://localhost:8083/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:8083/api/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI after status change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bookings for Performer</h1>
      {bookings.length === 0 ? (
        <p>No bookings found for this performer.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded-lg p-4 shadow">
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>

              {booking.status === 'Pending' && (
                <div className="mt-2 space-x-2">
                  <button
                    className="px-4 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleStatusUpdate(booking._id, 'Confirmed')}
                  >
                    Confirm
                  </button>
                  <button
                    className="px-4 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
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
