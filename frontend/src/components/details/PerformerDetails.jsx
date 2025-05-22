// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const PerformerDetails = () => {
//   const { id } = useParams();
//   const [performer, setPerformer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPerformer = async () => {
//       try {
//         const res = await axios.get(`https://performly-backend.onrender.com/api/performers/${id}`);
//         setPerformer(res.data);
//       } catch (err) {
//         setError("Failed to load performer details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPerformer();
//   }, [id]);

//   if (loading) return <p className="text-blue-500">Loading performer details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!performer) return <p>Performer not found.</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-4">{performer.userId?.name}</h2>
//       <p><strong>Category:</strong> {performer.category}</p>
//       <p><strong>Sub-Category:</strong> {performer.subCategory}</p>
//       <p><strong>Pricing:</strong> ₹{performer.pricing}</p>
//       <p><strong>Bio:</strong> {performer.bio}</p>
//       <p><strong>Email:</strong> {performer.userId?.email}</p>
//       <p><strong>Phone:</strong> {performer.userId?.phone}</p>
//     </div>
//   );
// };

// export default PerformerDetails;

import React, { useState } from "react";
import axios from "axios";

const AddPerformerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subCategory: "",
    pricing: "",
    bio: "",
  });
  

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "https://performly-backend.onrender.com/api/performers",
        {
          userId: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          category: formData.category,
          subCategory: formData.subCategory,
          pricing: formData.pricing,
          bio: formData.bio,
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Performer added successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          subCategory: "",
          pricing: "",
          bio: "",
        });
      }
    } catch (err) {
      setError("Failed to add performer. Please try again.");
    }
  };

  return (
    <>
      <div className=" h-screen flex gap-20 justify-center items-center">
        <div className="h-[20%] w-[20%] flex justify-center">
          <h2 className="text-2xl font-bold mb-4">PERFORMER DETAILS</h2>
        </div>

        <div className="h-[60%] w-[25%] bg-white border-34 rounded-3xl border-white shadow-2xl flex items-center ">
          {success && <p className="text-green-600 mb-3">{success}</p>}
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className=" grid w-full gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Performer Name"
              onChange={handleChange}
              className="w-full border-1 h-10 rounded-xl "
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full border-1 h-10 rounded-xl"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border-1 h-10 rounded-xl"
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              placeholder="Category"
              onChange={handleChange}
              className="w-full border-1 h-10 rounded-xl"
              required
            />
            <input
              type="text"
              name="subCategory"
              value={formData.subCategory}
              placeholder="Sub-Category"
              onChange={handleChange}
              className="w-full border-1 h-10 rounded-xl"
            />
            <input
              type="number"
              name="pricing"
              value={formData.pricing}
              placeholder="Pricing (INR)"
              onChange={handleChange}
              className="w-full border-1 h-10 rounded-xl"
            />
            <textarea
              name="bio"
              value={formData.bio}
              placeholder="Bio"
              onChange={handleChange}
              className="w-full border-1 h-10 rounded-xl"
              rows="4"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="border-2 w-[60%] h-10 text-black rounded-2xl hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPerformerForm;
