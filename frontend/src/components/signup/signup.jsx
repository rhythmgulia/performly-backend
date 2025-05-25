import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [category, setCategory] = useState(""); // "user" or "performer"
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, phone, password } = form;

    // Basic validation
    if (!name || !email || !phone || !password || !category) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(Number(phone)) || phone.length !== 10) {
      alert("Please enter a valid 10-digit numeric phone number");
      return;
    }

    const payload = {
      name,
      email,
      phone: Number(phone),
      password,
      type: category === "user" ? 0 : 1,
    };

    try {
      const res = await fetch(
        "https://performly-backend.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");

        // Store the token if it's provided
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Token stored:", data.token); // Debug log
        }

        const userId = data.user?.id;

        if (category === "performer" && userId) {
          // Redirect to performer profile creation
          navigate(`/performer/${userId}`);
        } else {
          navigate("/signin");
        }
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error during signup: " + error.message);
    }
  };

  return (
    <div className="signinbg h-screen w-screen flex justify-center items-center">
      <div className="signin-body h-[80%] w-[30%] bg-transparent border-0.5 hover:scale-103 hover:shadow-xl hover:shadow-black transition-all ease-in relative rounded-4xl">
        <div className="text absolute top-[10%] left-[35%] text-5xl">
          <h1>Sign Up</h1>
        </div>

        <div className="absolute top-[25%] left-[20%]">
          <input
            type="text"
            name="name"
            className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in px-3"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="absolute top-[35%] left-[20%]">
          <input
            type="email"
            name="email"
            className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in px-3"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="absolute top-[45%] left-[20%]">
          <input
            type="tel"
            name="phone"
            className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in px-3"
            placeholder="Enter Your Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="absolute top-[55%] left-[20%]">
          <input
            type="password"
            name="password"
            className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in px-3"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="absolute top-[65%] left-[20%]">
          <select
            className="border-2 h-12 w-80 rounded-2xl hover:scale-104 transition-all ease-in px-3"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          >
            <option value="">Select Category</option>
            <option value="user">User</option>
            <option value="performer">Performer</option>
          </select>
        </div>

        <button
          className="p-2 h-10 rounded-xl bg-blue-400 w-33 absolute top-[78%] hover:bg-sky-900 hover:text-white transition-all left-[37%]"
          onClick={handleSubmit}
        >
          SIGN UP
        </button>

        <a href="/signin" className="top-[85%] left-[30%] absolute">
          Already Registered? LOGIN
        </a>
      </div>
    </div>
  );
};

export default Signup;