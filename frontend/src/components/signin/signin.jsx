import React, { useState } from "react";
import SignInPicture from "../animate/lottie2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loadingg from "../animate/loading";

const Signin = () => {
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { phone, password } = form;

    if (!phone || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    try {
      const res = await axios.post(
        "https://performly-backend.onrender.com/api/users/login",
        {
          phone: Number(phone),
          password,
        }
      );
      console.log("Login Response:", res.data);

      const { user, token } = res.data;
      localStorage.setItem("token", token);

      if (res.data.user.type === 1) {
        // if(res.data.user.performerId == undefined){
        //   navigate(`/performer/${res.data.user.id}`)
        // }
        // else{
        //   navigate(`/performerdashboard/${res.data.user.performerId}`);
        // }
        navigate(`/performerdashboard/${res.data.user.id}`);
      } else {
        navigate(`/userdashboard/${res.data.user.id}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signinbg h-screen bg-gradient-to-t from-sky-950  to-orange-100 w-screen flex justify-center items-center">
        <div className="grid grid-cols-2 h-full w-full">
          <div className="lottie-logo h-full w-full  flex items-center justify-center">
            <div>
              <div className="text h-[20%] font-bold text-8xl flex justify-center items-center">
                <h1>WELCOME</h1>
              </div>
              <div className="logo h-[80%] w-full">
                <SignInPicture />
              </div>
            </div>
          </div>

          <div className="h-full w-full flex items-center justify-center">
            <div className="signin-body h-[80%] w-[65%]   shadow-xl shadow-black rounded-4xl  ">
              <div className="  font-medium flex justify-center pt-[40%] text-5xl">
            <h1>LOGIN</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="email pt-5  justify-center flex ">
              <input
                type="tel"
                name="phone"
                className="border-2 h-12 w-80  p-4 rounded-2xl hover:scale-104 transition-all ease-in"
                placeholder="Enter Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="email pt-5  justify-center flex  ">
              <input
                type="password"
                name="password"
                className="border-2 h-12 p-4 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="pt-5  justify-center flex ">
              <button
              type="submit"
              className=" h-10 rounded-xl text-orange-100 bg-sky-900 w-33  hover:bg-sky-950 hover:text-white transition-all "
            >
              LOGIN
            </button>
            </div>
            <div className="pt-8  justify-center flex ">
              <a href="/signup" className=" hover:text-white ">
            New User? Create Account
          </a>
            </div>


            
          </form>

          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
