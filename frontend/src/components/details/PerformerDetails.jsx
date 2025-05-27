import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PerformerProfileForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const categoryOptions = [
    'Artist', 'Comedian', 'Dancer', 'Entertainer', 'Event Service',
    'Kids Entertainment', 'Magician', 'Musician', 'Speaker/Trainer',
    'Special Performer', 'Traditional Performer'
  ];

  const subCategoryMap = {
    'Artist': ['Live Painters', 'Sketch Artists', 'Calligraphers', 'Henna Artists'],
    'Comedian': ['Stand-up', 'Improv', 'Observational', 'Dark Humor'],
    'Dancer': ['Classical', 'Hip Hop', 'Contemporary', 'Folk', 'Street', 'Flash Mob', 'Choreographers'],
    'Entertainer': ['Stand-up Comedians', 'Magicians', 'Clowns', 'Puppeteers', 'Storytellers'],
    'Event Service': ['Photographers', 'Videographers', 'Event Hosts/MCs', 'Event Planners', 'Decorators', 'Lighting and Sound Technicians'],
    'Kids Entertainment': ['Clowns', 'Balloon Artists', 'Face Painters', 'Mascots and Character Actors'],
    'Magician': ['Card Magic', 'Illusion', 'Mentalism', 'Close-up Magic'],
    'Musician': [
      'Classical', 'Pop', 'Jazz', 'Rock', 'Folk', 'Guitarists', 'Pianists',
      'Violinists', 'Drummers', 'Rock Bands', 'Jazz Bands', 'Acoustic Bands', 'DJs'
    ],
    'Speaker/Trainer': ['Motivational Speakers', 'Corporate Trainers', 'Workshop Conductors'],
    'Special Performer': ['Fire Performers', 'Acrobats', 'Aerial Artists', 'Stunt Performers', 'Circus Performers'],
    'Traditional Performer': ['Folk Singers', 'Puppet Show Artists', 'Bharatanatyam', 'Kathak', 'Street Play Artists']
  };

  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    experience: '',
    pricing: '',
    specialties: [],
    availability: {},
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' ? { subCategory: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`http://localhost:8083/api/performers/profile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Profile created!');
      navigate(`/performerdashboard/${id}`);
    } catch (error) {
      console.error('Profile creation failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] h-[70%] max-w-lg bg-white rounded-2xl border-23 border-white shadow-2xl transition-shadow duration-300 "
      >
        <h2 className="text-4xl font-bold text-center text-gray-800">Create Performer Profile</h2>

        {/* Category */}
        <div className=' h-15 flex items-center gap-4 '> 
          <label className="block text-xl font-bold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-[50%] border border-1 rounded-lg"
          >
            <option value="">Select Category</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* SubCategory */}
        <div className='h-15 flex items-center gap-4'>
          <label className="block text-xl font-bold">Subcategory</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
            disabled={!formData.category}
            className="w-[50%] border border-1 rounded-lg"
          >
            <option value="">Select SubCategory</option>
            {formData.category && subCategoryMap[formData.category]?.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className='h-15 flex items-center gap-4'>
          <label className="block text-xl font-bold">Experience (Years)</label>
          <input
            name="experience"
            type="number"
            placeholder="Enter years of experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-[50%] h-[60%] border border-1 rounded-lg"
            required
          />
        </div>

        {/* Pricing */}
        <div className='h-15 flex items-center gap-4'>
          <label className="block text-xl font-bold">Pricing (₹)</label>
          <input
            name="pricing"
            type="number"
            placeholder="Enter pricing"
            value={formData.pricing}
            onChange={handleChange}
            className="w-[50%] h-[60%] border border-1 rounded-lg"
            required
          />
        </div>

        {/* Specialties */}
        <div className='h-15 flex  items-center gap-4'>
          <label className="block text-xl font-bold">Specialties</label>
          <input
            name="specialties"
            placeholder="Enter comma-separated specialties"
            onChange={(e) =>
              setFormData(prev => ({ ...prev, specialties: e.target.value.split(',') }))
            }
            className="w-[50%] h-[60%] border border-1 rounded-lg"
          />
        </div>

        {/* Bio */}
        <div className='h-20 flex items-center gap-4'>
          <label className="block text-xl font-bold">Bio</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            onChange={handleChange}
            rows="4"
            className="w-[50%] h-[100%] border border-1 rounded-lg"
          />
        </div>
        <div className='h-20 flex justify-center items-center gap-4'>
           <button
          type="submit"
          onClick={() => navigate(`/performerdashboard/${id}`)}
          className="w-[30%] h-[40%] rounded-lg flex justify-center items-center bg-blue-500 "
        >
          Create Profile
        </button>
        </div>
       
      </form>
    </div>
  );
};

export default PerformerProfileForm;
