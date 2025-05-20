import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [performers, setPerformers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8083/api/performers/");
        setPerformers(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch performers");
      } finally {
        setLoading(false);
      }
    };
    fetchPerformers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Performers List</h2>

      {loading ? (
        <p className="text-blue-500">Loading performers...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : performers.length === 0 ? (
        <p className="text-gray-500">No performers available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {performers.map((performer) => (
            <li key={performer._id} className="p-4 border rounded shadow">
              <p><strong>Name:</strong> {performer.userId?.name || "Unknown"}</p>
              <p><strong>Category:</strong> {performer.category}</p>
              <p><strong>Sub-Category:</strong> {performer.subCategory}</p>
              <p><strong>Pricing:</strong> ₹{performer.pricing}</p>
              <p><strong>Bio:</strong> {performer.bio}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
