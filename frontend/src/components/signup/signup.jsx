// import React from "react";
// import { useNavigate } from "react-router-dom";
// import home from "../animate/Background";

// const signup = () => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate("/signin");
//   };

//   const isvalid = () => {
//     alert("logged in");
//     navigate("/home");
//   };
//   //   const rects = Array.from({ length: 5 }, (_, index) => (
//   //     <div key={index} className="secondhalf"></div>
//   //   ));
//   return (
//     <div className="signup-body">
//       <div className="firsthalf"></div>
      
    

//       <div className="second">
//         <div className="signup-bg">
//           <div className="signup-form">
//             <h1>Sign Up</h1>
//             <div className="signup-grid">
//               <input
//                 type="text"
//                 placeholder="username"
//                 className="username-box"
//               />
//               <input
//                 type="password"
//                 placeholder="password"
//                 className="password-box"
//               />
//             </div>

//             <button onClick={isvalid}>Login</button>
//             <a href="" onClick={handleClick} className="new-user">
//               new user?create account
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default signup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const signup = () => {
  const navigate=useNavigate();
  const [category, setcategory] =useState("");
  const handlenavigate =()=>{

    if(category=="user"){
      navigate("/userdashboard")
    }else if(category=="performer"){
      navigate("/performerdashboard")
      
    }
  }
  return (
    <>
      <div className="signinbg h-screen w-screen flex justify-center items-center">
        <div className="signin-body h-[80%] w-[30%] bg-transparent border-0.5 hover:scale-103 hover:shadow-xl hover:shadow-black transition-all ease-in relative rounded-4xl">
          <div className="text absolute top-[10%] left-[35%] text-5xl">
            <h1>Sign Up</h1>
          </div>

          <div className="absolute top-[25%] left-[20%]">
            <input
              type="text"
              className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
              placeholder="Enter Your Name"
            />
          </div>

          <div className="absolute top-[35%] left-[20%]">
            <input
              type="email"
              className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
              placeholder="Enter Your Email"
            />
          </div>

          <div className="absolute top-[45%] left-[20%]">
            <input
              type="password"
              className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
              placeholder="Enter Your Password"
            />
          </div>

          <div className="absolute top-[55%] left-[20%]">
            <input
              type="tel"
              className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
              placeholder="Enter Your Phone Number"
            />
          </div>

          <div className="absolute top-[65%] left-[20%]">
            <select className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in" onChange={(e)=>setcategory(e.target.value)} value={category}>
              <option value="">Select Category</option>
              <option value="user">User</option>
              <option value="performer">Performer</option>
            </select>
          </div>

          <button className="p-2 h-10 rounded-xl bg-blue-400 w-33 absolute top-[78%] hover:bg-sky-900 hover:text-white transition-all left-[37%]" onClick={handlenavigate}>
            SIGN UP
          </button>
          <a href="/signin" className="top-[85%] left-[30%] absolute">Already Registered? LOGIN</a>
        </div>
      </div>
    </>
  );
};

export default signup;
