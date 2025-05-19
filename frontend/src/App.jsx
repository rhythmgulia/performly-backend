import React from "react";
import Loader from "./components/animate/Background";
import Home from "./components/home/home"
import Signin from "./components/signin/signin"
import Signup from "./components/signup/signup";
import Role from "./components/card/uf"
import Udash from "./components/dashboard/User"
import Pdash from "./components/dashboard/performer"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/userdashboard" element={<Udash/>}/>
         <Route path="/performerdashboard" element={<Pdash/>}/>

        
      </Routes>
    </BrowserRouter>
  );
};

export default App;


// export default App;

// import React, { useState } from "react";
// const App = () => {
//   return (
//     <>
//       <div className="main bg-black h-screen justify-center flex items-center">
//         <div className="text-bg h-4xl  flex justify-center">
//           <div className="text-performly text-white text-4xl  ">PERFORMLY</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;
