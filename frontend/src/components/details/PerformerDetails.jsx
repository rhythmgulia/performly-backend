import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PerformerDetails = () => {
  const { id } = useParams();
  const [performer, setPerformer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    location: ''
  });

  useEffect(() => {
    const fetchPerformer = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/performers/${id}`);
        setPerformer(res.data);
      } catch (err) {
        setError("Failed to load performer details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPerformer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment scheduled:", appointment);
    // You can later add API call here to save the appointment.
    alert('Appointment scheduled!');
    setShowForm(false);
  };

  
  const handleBookAppointment = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      'http://localhost:8083/api/bookings/',
      { ...appointment, performerId: performer._id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    alert('Appointment successfully booked!');
    setShowForm(false);
  } catch (error) {
    console.error(error);
    alert('Failed to book appointment.');
  }
};


  if (loading) return <p className="text-blue-500">Loading performer details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!performer) return <p>Performer not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-4">{performer.userId?.name}</h2>
      <p><strong>Category:</strong> {performer.category}</p>
      <p><strong>Sub-Category:</strong> {performer.subCategory}</p>
      <p><strong>Pricing:</strong> ₹{performer.pricing}</p>
      <p><strong>Bio:</strong> {performer.bio}</p>
      <p><strong>Email:</strong> {performer.userId?.email}</p>
      <p><strong>Phone:</strong> {performer.userId?.phone}</p>

      <button 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowForm(prev => !prev)}
      >
        {showForm ? "Cancel" : "Schedule Appointment"}
      </button>

      {showForm && (
        <form 
          className="mt-6 space-y-4 border-t pt-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input 
              type="date" 
              name="date" 
              value={appointment.date} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2"
              required 
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Time</label>
            <input 
              type="time" 
              name="time" 
              value={appointment.time} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2"
              required 
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input 
              type="text" 
              name="location" 
              value={appointment.location} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2"
              placeholder="Enter appointment location"
              required 
            />
          </div>
          <button 
            type="submit" 
            onClick={handleBookAppointment}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default PerformerDetails;
