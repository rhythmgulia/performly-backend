import React from "react";
import SignInPicture from "../animate/lottie2"

const signin = () => {
  return (
    <>
      <div className="signinbg h-screen w-screen flex justify-center items-center ">
        <div className="signin-body h-[70%] absolute left-[25%] w-[30%] bg-transparent border-1 hover:border-0 hover:scale-103 hover:shadow-xl hover:shadow-black transition-all ease-in relative rounded-4xl ">
          <div className="text absolute top-[30%] left-[40%] text-5xl">
            <h1>Login</h1>
          </div>
          <div className="email absolute top-[40%] left-[20%] ">
            <input
              type="email"
              className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="email absolute top-[50%] left-[20%] ">
            <input
              type="password"
              className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
              placeholder="Enter Your Password"
            />
          </div>
          <button className=" p-2 h-10 rounded-xl bg-blue-400 w-33 absolute top-[62%] hover:bg-sky-900 hover:text-white transition-all left-[37%]">
            LOGIN
          </button>
          <a href=" /signup" className="absolute top-[74%] left-[29%]">
            {" "}
            New User? Create Account
          </a>
        </div>
       

      </div> <div className="lottie-logo h-120 w-100 absolute top-[30%] left-[10%]">
        <div className="text h-[20%]  text-7xl flex justify-center items-center" > <h1>WELCOME</h1></div>
        <div className="logo h-[80%] w=full ">
         <SignInPicture/>
        </div>
      </div>
    </>
  );
};

export default signin;
