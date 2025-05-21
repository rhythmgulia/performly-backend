import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PerformerDetails = () => {
  const { id } = useParams();
  const [performer, setPerformer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p className="text-blue-500">Loading performer details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!performer) return <p>Performer not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{performer.userId?.name}</h2>
      <p><strong>Category:</strong> {performer.category}</p>
      <p><strong>Sub-Category:</strong> {performer.subCategory}</p>
      <p><strong>Pricing:</strong> ₹{performer.pricing}</p>
      <p><strong>Bio:</strong> {performer.bio}</p>
      <p><strong>Email:</strong> {performer.userId?.email}</p>
      <p><strong>Phone:</strong> {performer.userId?.phone}</p>
    </div>
  );
};

export default PerformerDetails;
