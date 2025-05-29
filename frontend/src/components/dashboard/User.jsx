// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const User = () => {
//   const [performers, setPerformers] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPerformers = async () => {
//       try {
//         const res = await axios.get(
//           "https://performly-backend.onrender.com/api/performers/"
//         );
//         setPerformers(res.data);
//       } catch (err) {
//         setError(err.message || "Failed to fetch performers");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPerformers();
//   }, []);

//   return (
//     <div className="h-screen w-full flex justify-center">
//       <div className="performer container h-full w-[80%] bg-blue-300">
//         <div className="heading flex justify-center items-center h-[20%] bg-blue-400 ">
//           <h2 className="">Discover Talented Performers</h2>
//         </div>
//         <div className="card-container flex justify-center">
//         <div className="h-[80%] w-[60%] flex border-34 border-blue-300 justify-center">
//           <div>
//             {loading ? (
//               <p className="text-center text-blue-500 text-lg">
//                 Loading performers...
//               </p>
//             ) : error ? (
//               <p className="text-center text-red-500 text-lg">{error}</p>
//             ) : performers.length === 0 ? (
//               <p className="text-center text-gray-500 text-lg">
//                 No performers available at the moment.
//               </p>
//             ) : (
//               // <div className="bg-white h-full w-full border-3">
//               //   {performers.map((performer) => (
//               //     <Link
//               //       to={`/performer/${performer._id}`}
//               //       key={performer._id}
//               //       className= "bg-black h-30 w-40 border-3"
//               //     >
//               //       <h3 className=" ">
//               //         {performer.userId?.name || "Unnamed Performer"}
//               //       </h3>
//               //       <p className="">
//               //         <strong>Category:</strong> {performer.category}
//               //       </p>
//               //       <p className="">
//               //         <strong>Sub-Category:</strong> {performer.subCategory}
//               //       </p>
//               //       <p className="text-gray-600">
//               //         <strong>Pricing:</strong> ₹{performer.pricing}
//               //       </p>
//               //       <p className="text-gray-600 mt-2">
//               //         <strong>Bio:</strong> {performer.bio}
//               //       </p>
//               //       <span className="inline-block mt-4 text-indigo-500 font-medium hover:underline">
//               //         View Details →
//               //       </span>
//               //     </Link>
//               //   ))}
//               // </div>
//               <div className="w-full grid sm:grid-rows-2 md:grid-rows-3 gap-6">
//                 {performers.map((performer) => (
//                   <Link
//                     to={`/performer/${performer._id}`}
//                     key={performer._id}
//                     className="bg-white rounded-2xl border-white border-23"
//                   >
//                     <h3 className="text-lg font-semibold text-indigo-600 mb-2">
//                       {performer.userId?.name || "Unnamed Performer"}
//                     </h3>
//                     <p>
//                       <strong>Category:</strong> {performer.category}
//                     </p>
//                     <p>
//                       <strong>Sub-Category:</strong> {performer.subCategory}
//                     </p>
//                     <p>
//                       <strong>Pricing:</strong> ₹{performer.pricing}
//                     </p>
//                     <p className="mt-2">
//                       <strong>Bio:</strong> {performer.bio}
//                     </p>
//                     <span className="inline-block mt-4 text-indigo-500 font-medium hover:underline">
//                       View Details →
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             )}{" "}
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default User;





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
      className={`bg-white rounded-2xl border-30 w-50 border-white p-6 shadow-xl hover:scale-110 transition-all duration-400 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        relative z-[${50 - index}] w-full -mt-20`}
    >
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
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
      {/* <p className="mt-2">
        <strong>Bio:</strong> {performer.bio}
      </p> */}
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
    <div className="h-screen w-full flex justify-center bg-blue-100">
      <div className="container w-full bg-blue-200 shadow-lg rounded-lg">
        <div className="heading flex justify-center items-center h-100 bg-blue-400 ">
          <h2 className="text-8xl font-bold text-white">
            Discover Talented Performers
          </h2>
          <button
            onClick={handleYourAppointment}
            className="bg-white text-blue-500 font-semibold px-4 absolute w-50 h-10 right-23 bottom-150 z-[100] rounded-lg shadow hover:bg-blue-100 transition"
          >
            Your Appointments
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full md:w-full border-34 border-blue-200  flex flex-col items-center justify-center relative">
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
              <div className="w-[100%] grid grid-cols-4 gap-8">
                {performers.map((performer, index) => (
                  <PerformerCard performer={performer} index={index} key={performer._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;















// import React, { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";

// const PerformerCard = ({ performer, index }) => {
//   const { ref, inView } = useInView({ triggerOnce: true });
  
//   const getCategoryIcon = (category) => {
//     const icons = {
//       'Musician': '🎵',
//       'Dancer': '💃',
//       'Comedian': '😂',
//       'Magician': '🎩',
//       'Artist': '🎨',
//       'Speaker/Trainer': '🎤',
//       'Entertainer': '🎭',
//       'Event Service': '📋',
//       'Kids Entertainment': '🎈',
//       'Special Performer': '🎪',
//       'Traditional Performer': '🎭'
//     };
//     return icons[category] || '🎭';
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Musician': 'from-purple-500 to-pink-500',
//       'Dancer': 'from-pink-500 to-rose-500',
//       'Comedian': 'from-yellow-500 to-orange-500',
//       'Magician': 'from-indigo-500 to-purple-500',
//       'Artist': 'from-blue-500 to-indigo-500',
//       'Speaker/Trainer': 'from-green-500 to-emerald-500',
//       'Entertainer': 'from-red-500 to-pink-500',
//       'Event Service': 'from-gray-500 to-slate-500',
//       'Kids Entertainment': 'from-cyan-500 to-blue-500',
//       'Special Performer': 'from-orange-500 to-red-500',
//       'Traditional Performer': 'from-amber-500 to-yellow-500'
//     };
//     return colors[category] || 'from-indigo-500 to-purple-500';
//   };
  
//   return (
//     <div
//       ref={ref}
//       className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-3 border border-gray-100 overflow-hidden ${
//         inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       }`}
//       style={{ transitionDelay: `${index * 150}ms` }}
//     >
//       {/* Gradient Header */}
//       <div className={`h-24 bg-gradient-to-r ${getCategoryColor(performer.category)} relative overflow-hidden`}>
//         <div className="absolute inset-0 bg-black opacity-10"></div>
//         <div className="absolute top-4 left-6 text-white">
//           <div className="text-2xl mb-1">{getCategoryIcon(performer.category)}</div>
//           <div className="text-xs font-medium opacity-90">{performer.category}</div>
//         </div>
//         <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
//         <div className="absolute -top-12 -right-12 w-32 h-32 bg-white opacity-5 rounded-full"></div>
//       </div>

//       <div className="p-6 flex flex-col h-full">
//         {/* Header */}
//         <div className="mb-4 -mt-2">
//           <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
//             {performer.userId?.name || "Unnamed Performer"}
//           </h3>
//           <div className="flex items-center gap-2">
//             <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-200">
//               {performer.subCategory}
//             </span>
//             {performer.experience && (
//               <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
//                 {performer.experience}+ years
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Pricing */}
//         <div className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
//           <div className="flex items-baseline gap-2">
//             <span className="text-2xl font-bold text-green-600">
//               ₹{performer.pricing?.toLocaleString()}
//             </span>
//             <span className="text-sm text-green-500 font-medium">per event</span>
//           </div>
//           <div className="text-xs text-green-600 mt-1">Starting price</div>
//         </div>

//         {/* Specialties */}
//         {performer.specialties && performer.specialties.length > 0 && (
//           <div className="mb-4">
//             <div className="flex flex-wrap gap-1">
//               {performer.specialties.slice(0, 3).map((specialty, idx) => (
//                 <span 
//                   key={idx} 
//                   className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium border border-blue-100"
//                 >
//                   {specialty.trim()}
//                 </span>
//               ))}
//               {performer.specialties.length > 3 && (
//                 <span className="text-xs text-gray-500 px-2 py-1">
//                   +{performer.specialties.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Bio */}
//         <div className="mb-6 flex-grow">
//           <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
//             {performer.bio || "Professional performer ready to make your event memorable with exceptional talent and dedication."}
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-auto space-y-3">
//           <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
//             <span>View Details</span>
//             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//           <button className="w-full bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             <span>Book Now</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const User = () => {
//   const [performers, setPerformers] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPerformers = async () => {
//       try {
//         const response = await fetch("https://performly-backend.onrender.com/api/performers/");
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setPerformers(data);
//       } catch (err) {
//         console.error('Error fetching performers:', err);
//         setError(err.message || "Failed to fetch performers");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPerformers();
//   }, []);

//   const handleYourAppointment = () => {
//     navigate('/');
//     alert("Your Appointments clicked!");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-indigo-600 text-lg font-medium">Loading performers...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
//         <div className="text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <p className="text-red-600 text-lg font-medium">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
//       {/* Background Decorations */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
//         <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-200 rounded-full opacity-15 animate-pulse"></div>
//         <div className="absolute bottom-40 right-10 w-28 h-28 bg-indigo-200 rounded-full opacity-25"></div>
//       </div>

//       {/* Header */}
//       <div className="relative w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-white/50">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
//                 🎭
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent mb-2">
//                   Discover Talented Performers
//                 </h1>
//                 <p className="text-gray-600 text-lg">
//                   Find the perfect performer for your next unforgettable event
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={handleYourAppointment}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               <span>Your Appointments</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Bar */}
//       <div className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex justify-center items-center gap-12">
//             <div className="text-center">
//               <div className="text-2xl font-bold">{performers.length}+</div>
//               <div className="text-sm opacity-90">Talented Performers</div>
//             </div>
//             <div className="w-px h-8 bg-white opacity-30"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold">500+</div>
//               <div className="text-sm opacity-90">Events Completed</div>
//             </div>
//             <div className="w-px h-8 bg-white opacity-30"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold">4.9★</div>
//               <div className="text-sm opacity-90">Average Rating</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative w-full px-6 py-12">
//         <div className="max-w-7xl mx-auto">
//           {performers.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="text-8xl mb-6 animate-bounce">🎭</div>
//               <h3 className="text-2xl font-bold text-gray-700 mb-4">No Performers Available</h3>
//               <p className="text-gray-500 text-lg mb-8">
//                 We're working hard to bring you amazing performers. Check back soon!
//               </p>
//               <button 
//                 onClick={() => window.location.reload()} 
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//               >
//                 Refresh Page
//               </button>
//             </div>
//           ) : (
//             <>
//               {/* Category Filter Tabs */}
//               <div className="mb-12 text-center">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
//                 <div className="flex flex-wrap justify-center gap-3">
//                   {['All', 'Musician', 'Dancer', 'Comedian', 'Magician', 'Artist'].map((category) => (
//                     <button
//                       key={category}
//                       className="px-6 py-2 rounded-full bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 font-medium"
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Performers Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {performers.map((performer, index) => (
//                   <PerformerCard 
//                     performer={performer} 
//                     index={index} 
//                     key={performer._id} 
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
