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
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const PerformerCard = ({ performer, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });



  return (
    <Link
      ref={ref}
      to={`/performer/${performer._id}`}
      className={`bg-white rounded-2xl border-34  border-white p-6 shadow-xl transition-all duration-700 ease-out
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
      <p className="mt-2">
        <strong>Bio:</strong> {performer.bio}
      </p>
      <span className="inline-block mt-4 text-indigo-500 font-medium hover:underline">
        View Details →
      </span>
    </Link>
  );
};

const User = () => {
  const [performers, setPerformers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen w-full flex justify-center bg-blue-100">
      <div className="container w-[80%] bg-blue-200 shadow-lg rounded-lg">
   
        <div className="heading flex justify-center items-center h-32 bg-blue-400 rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">Discover Talented Performers</h2>
        </div>

        <div className="flex justify-center">
          <div className="w-full md:w-[70%] py-12 flex flex-col items-center justify-center relative">
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
              <div className="w-[70%] grid gap-8 items-center border-20 border-transparent">
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
