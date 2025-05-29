

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const PerformerCard = ({ performer, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true });


  return (
    <Link
      ref={ref}
      to={
        performer.userId?._id
          ? `/performerinfo/${performer.userId._id}`
          : "#"
      }
      key={performer.userId?._id || performer._id}
      className={`bg-sky-900
        h-60 rounded-2xl border-30  border-sky-900    text-white shadow-xl hover:scale-110 transition-all duration-400 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        relative z-[${50 - index}] w-full `}
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        {performer.userId?.name || "Unnamed Performer"}
      </h3>
      <p>
        <strong>Category:</strong> {performer.category}
      </p>
      <p>
        <strong>Sub-Category:</strong> {performer.subCategory}
      </p>
      <p>
        <strong>Pricing:</strong> ₹{performer.pricing}
      </p>
      <span className="inline-block mt-4 text-indigo-500 font-medium hover:underline transition-all duration-700 ease-out">
        View Details →
      </span>
    </Link>
  );
};

const User = () => {
  const [performers, setPerformers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
              
  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const res = await axios.get(
          "https://performly-backend.onrender.com/api/performers/"
        );
        setPerformers(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch performers");
      } finally {
        setLoading(false);
      }
    };
    fetchPerformers();
  }, []);
   

  const handleYourAppointment = () => {
    navigate(`/user/appointments/${id}`);
  };

  return (
    <div className="h-full w-screen flex bg-orange-100 justify-center">
      <div className="container w-screen ">
        
        <div className="heading h-full  ">
          <div className="h-[6%] bg-orange-100 border-t-54 font-bold text-8xl border-orange-100">

<h1>WELCOME </h1>
          </div>
          <div className="h-[10%] ">
          <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-900 to-orange-100  border-t-73 border-orange-100 ">
  Discover Talented Performers
</h2>

          <div className="flex h-17 items-center text-xl text-sky-900 border-l-2 border-orange-100 font-medium w-[50%]">
            <h1> Find extraordinary performers who will transform your event into an unforgettable experience</h1>
          </div>
          </div>
          <button
            onClick={handleYourAppointment}
            className=" text-white font-semibold  absolute w-60 h-20 right-23 bottom-153 z-[100] rounded-lg bg-sky-900 hover:shadow-2xl
  transition-all duration-400 ease-in-out"
          >
            Your Appointments
          </button>
        

        <div className=" w-full h-[84%] justify-center">
          <div className="w-full h-full md:w-full border-t-53 border-orange-100  flex flex-col items-center justify-center relative">
            {loading ? (
              <p className="text-center text-blue-500 text-lg">
                Loading performers...
              </p>
            ) : error ? (
              <p className="text-center text-red-500 text-lg">{error}</p>
            ) : performers.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                No performers available at the moment.
              </p>
            ) : (
              <div className="w-[80%] grid grid-cols gap-8">
                {performers.map((performer, index) => (
                  <PerformerCard performer={performer} index={index} key={performer._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
</div>
  );
};

export default User;












