import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingsByPerformer = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [performer, setPerformer] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8083/api/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id, token]);

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

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:8083/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: res.data.booking.status }
            : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center text-blue-500 text-lg">Loading bookings...</p>
    );

  return (
    <div className="h-screen w-screen bg-orange-100 ">
      <div className="h-[40%] w-full border-73 border-orange-100    text-9xl font-bold  ">
        {" "}
        <h1>Welcome {performer.userId.name} </h1>
        <h1 className="text-2xl font-medium border-l-23 border-orange-100">Performer Dashboard</h1>
      </div>
     

    
      <div className="h-50 text-sky-900 flex items-center border-l-73 text-9xl border-t-2 border-b-1  border-r-43  ">
        <h1 className="font-bold ">Your Bookings</h1>
      </div>

       <div className="h-full w-full flex justify-center bg-orange-100 ">
      <div className=" h-full w-[90%] border-23 border-orange-100 bg-orange-100 flex justify-center">
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">
            No bookings found for this performer.
          </p>
        ) : (
          <div className="grid w-[93%]  h-50 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-sky-900 h-54 border-33 border-sky-900 shadow-xl rounded-xl text-white hover:shadow-2xl hover:scale-104 transition duration-300"
              >
                <h3 className="text-lg font-semibold  mb-2">
                  Booking Date: {new Date(booking.date).toLocaleDateString()}
                </h3>
                <p className=" ">
                  <strong>Location:</strong> {booking.location}
                </p>
                <p className="">
                  <strong>Status:</strong> {booking.status}
                </p>
                <p className="">
                  <strong>Payment:</strong> {booking.paymentStatus}
                </p>

                {booking.status === "Pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      className="w-full px-4 py-2 bg-blue-500 border-t-2 hover:bg-blue-600 text-white rounded-md text-sm font-medium"
                      onClick={() =>
                        handleUpdateStatus(booking._id, "Confirmed")
                      }
                    >
                      Confirm
                    </button>
                    <button
                      className="w-full h-18 px-4 border-t-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
                      onClick={() =>
                        handleUpdateStatus(booking._id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
      </div>
  );
};

export default BookingsByPerformer;
