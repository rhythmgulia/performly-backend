import React, { useState } from "react";
import SignInPicture from "../animate/lottie2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();

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

    if (isNaN(Number(phone))) {
      alert("Please enter a valid numeric phone number");
      return;
    }

    const payload = {
      phone: Number(phone),
      password,
    };

    try {
      const res = await axios.post("https://performly-backend.onrender.com/api/users/login", payload);
      if (res.data.user.type === 1) {
        navigate("/performerdashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <>
      <div className="signinbg h-screen w-screen flex justify-center items-center">
        <div className="signin-body h-[70%] absolute left-[25%] w-[30%] bg-transparent border-1 hover:border-0 hover:scale-103 hover:shadow-xl hover:shadow-black transition-all ease-in relative rounded-4xl ">
          <div className="text absolute top-[30%] left-[40%] text-5xl">
            <h1>Login</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="email absolute top-[40%] left-[20%] ">
              <input
                type="tel"
                name="phone"
                className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
                placeholder="Enter Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="email absolute top-[50%] left-[20%] ">
              <input
                type="password"
                name="password"
                className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="p-2 h-10 rounded-xl bg-blue-400 w-33 absolute top-[62%] hover:bg-sky-900 hover:text-white transition-all left-[37%]"
            >
              LOGIN
            </button>
          </form>

          <a href="/signup" className="absolute top-[74%] left-[29%]">
            New User? Create Account
          </a>
        </div>

        <div className="lottie-logo h-120 w-100 absolute top-[30%] left-[10%]">
          <div className="text h-[20%] text-7xl flex justify-center items-center">
            <h1>WELCOME</h1>
          </div>
          <div className="logo h-[80%] w-full">
            <SignInPicture />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
