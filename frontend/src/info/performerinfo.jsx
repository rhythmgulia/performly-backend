import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Performerinfo = () => {
  const { id } = useParams(); // userId from URL
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
        const res = await axios.get(
          `http://localhost:8083/api/performers/${id}`
        );
        setPerformer(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch performer details"
        );
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
      setShowForm(false); // Optional: hide form after successful booking
    } catch (err) {
      setBookingMessage(
        "❌ Booking failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!performer) return <p>Loading performer details...</p>;

  return (
    <div className=" w-full flex bg-gradient-to-t from-sky-900 to-orange-100 justify-center items-center ">
      <div className="h-screen w-[80%] border-23 border-orange-100 bg-orange-100 rounded-2xl shadow-2xl relative">
        <div className="w-full h-[20%] border-b-2">
          <h2 className="text-9xl text-sky-900 font-bold mb-4">{performer.userId.name}</h2>
        </div>
        <div className="h-[60%]  border-10 border-transparent">
          <div className="h-13  flex items-center w-[20%]  text-2xl absolute top-8 right-10">
            <p >
              <strong>Email:</strong> {performer.userId.email}
            </p>
          </div>

          <div className="h-13 flex items-center w-[20%] text-xl absolute top-18 right-10">
            <p>
              <strong>Phone:</strong> {performer.userId.phone}
            </p>
          </div>
          <div className=" absolute top-[13%] left-[2%] text-sky-900  text-xl font-bold">
            <p>{performer.category}</p>
          </div>

          <div className="grid h-full gap-20 grid-rows-3">
            
            <div className=" ">
              <div className="w-[100%]  text-3xl bg-sky-900 text-white border-34 border-sky-900 rounded-2xl hover:shadow-2xl transition-all duration-700 hover:bg-blue-300 hover:border-blue-300">
                <p>
                  <strong>About Me </strong>{" "}
                </p>
                <p>{performer.bio}</p>
              </div>

              
            </div>
            <div className="w-[100%] bg-sky-900 text-white text-3xl bg-blue-100  border-34 rounded-2xl border-sky-900 hover:shadow-2xl transition-all duration-700 hover:bg-blue-300 hover:border-blue-300  ">
                <p>
                  <strong>Price:</strong> ₹{performer.pricing}/hr
                </p>
              </div>

            <div className="mt-6">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className=" text-white w-70 h-20 text-xl font-bold bg-green-500  rounded-lg hover:bg-green-700 transition"
                >
                  Book Appointment
                </button>
              ) : (
                <div className="flex justify-center items-center h-100">
                  <form
                    onSubmit={handleBookingSubmit}
                    className="border-45 border-white bg-white  rounded-xl absolute top-50 grid gap-5 shadow-xl h-160  w-[80%]"
                  >
                    <div className="">
                      <label className=" text-3xl  font-bold">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleBookingChange}
                        className="w-full h-12  border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-3xl  font-bold">Time</label>
                      <input
                        type="time"
                        name="time"
                        value={bookingData.time}
                        onChange={handleBookingChange}
                        className="w-full h-12  border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-3xl  font-bold">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={bookingData.location}
                        onChange={handleBookingChange}
                        placeholder="Enter location"
                        className="w-full h-12  border rounded-md"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white w-40 h-10 rounded-md hover:bg-blue-700 transition"
                      >
                        Confirm Booking
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="text-gray-600 "
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {bookingMessage && (
          <p className="font-bold text-3xl text-center">{bookingMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Performerinfo;
