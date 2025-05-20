import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = () => {
  const [performers, setPerformers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Discover Talented Performers</h2>

      {loading ? (
        <p className="text-center text-blue-500 text-lg">Loading performers...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : performers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No performers available at the moment.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {performers.map((performer) => (
            <Link
              to={`/performer/${performer._id}`}
              key={performer._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border hover:border-indigo-400"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {performer.userId?.name || "Unnamed Performer"}
              </h3>
              <p className="text-gray-600"><strong>Category:</strong> {performer.category}</p>
              <p className="text-gray-600"><strong>Sub-Category:</strong> {performer.subCategory}</p>
              <p className="text-gray-600"><strong>Pricing:</strong> ₹{performer.pricing}</p>
              <p className="text-gray-600 mt-2"><strong>Bio:</strong> {performer.bio}</p>
              <span className="inline-block mt-4 text-indigo-500 font-medium hover:underline">View Details →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
