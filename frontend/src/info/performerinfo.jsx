import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Performerinfo = () => {
  const { id } = useParams(); // userId from URL
  const [performer, setPerformer] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    location: ''
  });
  const [bookingMessage, setBookingMessage] = useState('');

  useEffect(() => {
    const fetchPerformer = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/performers/${id}`);
        setPerformer(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch performer details');
      }
    };

    fetchPerformer();
  }, [id]);

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:8083/api/bookings',
        {
          performerId: id,
          ...bookingData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookingMessage('✅ Booking successful!');
      setShowForm(false); // Optional: hide form after successful booking
    } catch (err) {
      setBookingMessage('❌ Booking failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!performer) return <p>Loading performer details...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4">{performer.userId.name}</h2>
      <p><strong>Email:</strong> {performer.userId.email}</p>
      <p><strong>Phone:</strong> {performer.userId.phone}</p>
      <p><strong>Category:</strong> {performer.category}</p>
      <p><strong>Description:</strong> {performer.description}</p>
      <p><strong>Price:</strong> ₹{performer.pricing}</p>

      <div className="mt-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Book Appointment
          </button>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleBookingChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Time</label>
              <input
                type="time"
                name="time"
                value={bookingData.time}
                onChange={handleBookingChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={bookingData.location}
                onChange={handleBookingChange}
                placeholder="Enter location"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-600 underline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {bookingMessage && (
        <p className="mt-4 font-medium text-center">
          {bookingMessage}
        </p>
      )}
    </div>
  );
};

export default Performerinfo;
