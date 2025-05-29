// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Performerinfo = () => {
//   const { id } = useParams(); 
//   const [performer, setPerformer] = useState(null);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     date: "",
//     time: "",
//     location: "",
//   });
//   const [bookingMessage, setBookingMessage] = useState("");

//   useEffect(() => {
//     const fetchPerformer = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8083/api/performers/${id}`
//         );
//         setPerformer(res.data);
//       } catch (err) {
//         setError(
//           err.response?.data?.message || "Failed to fetch performer details"
//         );
//       }
//     };

//     fetchPerformer();
//   }, [id]);

//   const handleBookingChange = (e) => {
//     setBookingData({ ...bookingData, [e.target.name]: e.target.value });
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     setBookingMessage("");
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://localhost:8083/api/bookings",
//         {
//           performerId: id,
//           ...bookingData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setBookingMessage("✅ Booking successful!");
//       setShowForm(false); 
//     } catch (err) {
//       setBookingMessage(
//         "❌ Booking failed: " + (err.response?.data?.message || err.message)
//       );
//     }
//   };

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!performer) return <p>Loading performer details...</p>;

//   return (
//     <div className=" w-full h-screen flex bg-gradient-to-t from-sky-900 to-orange-100 justify-center items-center ">
//       <div className="h-[90%] w-[80%] p-15  bg-orange-100 rounded-2xl shadow-2xl relative">
//         <div className="w-full h-[20%] ">
//           <h2 className="text-9xl text-sky-900 font-bold">{performer.userId.name}</h2>
//            <div className="  text-sky-900 border-b-2 text-xl ml-2 font-bold">
//             <p>{performer.category}</p>
//           </div>
//         </div>
       
//         <div className="h-[60%] mt-[4%] border-transparent">
          
//           <div>
//             <div className="h-13  flex items-center w-full  text-2xl ">
//             <p >
//               <strong>Email:</strong> {performer.userId.email}
//             </p>
//           </div>

//           <div className="h-13 flex items-center w-[20%] text-xl ">
//             <p>
//               <strong>Phone:</strong> {performer.userId.phone}
//             </p>
//           </div>
//           </div>
          

//           <div className="grid h-full gap-20 grid-rows-3">
            
//             <div className=" ">
//               <div className="w-[100%]  text-3xl bg-sky-900 text-white border-34 border-sky-900 rounded-2xl hover:shadow-2xl transition-all duration-700 hover:bg-blue-300 hover:border-blue-300">
//                 <p>
//                   <strong>About Me </strong>{" "}
//                 </p>
//                 <p>{performer.bio}</p>
//               </div>

              
//             </div>
//             <div className="w-[100%] bg-sky-900 text-white text-3xl bg-blue-100  border-34 rounded-2xl border-sky-900 hover:shadow-2xl transition-all duration-700 hover:bg-blue-300 hover:border-blue-300  ">
//                 <p>
//                   <strong>Price:</strong> ₹{performer.pricing}/hr
//                 </p>
//               </div>

//             <div className="">
//               {!showForm ? (
//                 <button
//                   onClick={() => setShowForm(true)}
//                   className=" text-white w-70 h-20 text-xl font-bold bg-green-500  rounded-lg hover:bg-green-700 transition"
//                 >
//                   Book Appointment
//                 </button>
//               ) : (
//                 <div className="flex justify-center items-center h-100">
//                   <form
//                     onSubmit={handleBookingSubmit}
//                     className="p-[7%] bg-white  rounded-xl absolute top-20 grid gap-5 shadow-xl h-180  w-[50%]"
//                   >
//                     <div className="">
//                       <label className=" text-5xl  font-bold">Date</label>
//                       <input
//                         type="date"
//                         name="date"
//                         value={bookingData.date}
//                         onChange={handleBookingChange}
//                         className="w-full h-12 mt-2 p-4 border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-5xl  font-bold">Time</label>
//                       <input
//                         type="time"
//                         name="time"
//                         value={bookingData.time}
//                         onChange={handleBookingChange}
//                         className="w-full h-12  mt-2 p-4 border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="text-5xl  font-bold">Location</label>
//                       <input
//                         type="text"
//                         name="location"
//                         value={bookingData.location}
//                         onChange={handleBookingChange}
//                         placeholder="Enter location"
//                         className="w-full h-12 mt-2 p-4 border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <button
//                         type="submit"
//                         className="bg-blue-600 text-white w-40 h-10 rounded-md hover:bg-blue-700 transition"
//                       >
//                         Confirm Booking
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setShowForm(false)}
//                         className="text-gray-600 "
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {bookingMessage && (
//           <p className="font-bold text-3xl text-center">{bookingMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Performerinfo;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Performerinfo = () => {
  const { id } = useParams();
  const [performer, setPerformer] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    location: "",
  });
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchPerformer = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/performers/${id}`);
        setPerformer(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch performer details");
      }
    };

    fetchPerformer();
  }, [id]);

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8083/api/bookings",
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
      setBookingMessage("✅ Booking successful!");
      setShowForm(false);
    } catch (err) {
      setBookingMessage("❌ Booking failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;
  if (!performer) return <p className="text-center text-lg">Loading performer details...</p>;

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-sky-800 to-orange-200 py-10">
      <div className="w-[90%] max-w-6xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-6 relative">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-sky-900">{performer.userId.name}</h2>
          <p className="text-xl text-sky-700 mt-2 border-b-2 pb-2 inline-block">{performer.category}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-lg"><strong>Email:</strong> {performer.userId.email}</p>
            <p className="text-lg"><strong>Phone:</strong> {performer.userId.phone}</p>
            <div className="p-4 bg-sky-900 text-white rounded-2xl hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">About Me</h3>
              <p>{performer.bio}</p>
            </div>
            <div className="p-4 bg-blue-100 text-sky-900 rounded-2xl hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">Price</h3>
              <p>₹{performer.pricing}/hr</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 text-xl font-bold bg-green-700 text-white rounded-lg hover:bg-green-500 transition"
              >
                Book Appointment
              </button>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                className="w-full bg-sky-800 p-6 rounded-2xl text-white shadow-lg space-y-4"
              >
                <div>
                  <label className="block text-lg font-bold">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleBookingChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={bookingData.time}
                    onChange={handleBookingChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={bookingData.location}
                    onChange={handleBookingChange}
                    placeholder="Enter location"
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all  ease-in-out duration-300"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-white hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {bookingMessage && (
              <p className="text-lg font-bold text-center mt-2">{bookingMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performerinfo;

