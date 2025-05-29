import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8083/api/bookings/price/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data); 
        console.log(res.data)
      } catch (err) {
        setError("Error fetching booking details");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      const amount = booking.price; 

      const orderRes = await axios.post(
        "http://localhost:8083/api/payment/createOrder",
        { amount }
      );

      const { id: order_id, amount: orderAmount, currency } = orderRes.data;

      const options = {
        key: "rzp_test_L1sqG4NKJOJaSb",
        amount: orderAmount,
        currency,
        name: "Gig Booking",
        description: "Booking Payment",
        order_id,
        handler: async function (response) {
          const verifyRes = await axios.post("http://localhost:8083/api/payment/verifyPayment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.message === "Payment verified") {
            await axios.put(
              `http://localhost:8083/api/bookings/${bookingId}/payment`,
              { paymentStatus: "Paid" },
              {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              }
            );
            alert("Payment Successful!");
            navigate("/"); // redirect after payment
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Payment failed to initiate.");
    }
  };

  return (
    <div className="h-screen p-6 bg-gray-100 text-center">
      <div className="h-[20%] flex items-center justify-center bg-indigo-600 text-white">
        <h1 className="text-7xl  font-bold mb-4">Complete Your Payment</h1>
      </div>
      <div className="h-[80%] w-full bg-gray-100 flex justify-center items-center">

      
      {error && <p className="text-red-500">{error}</p>}
      {booking ? (
        <div className="bg-white h-[60%] w-[50%] grid rounded shadow max-w-md mx-auto">
          <p className="text-4xl"><strong>Performer:</strong> {booking.performerId?.name}</p>
          <p className="text-4xl"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p className="text-4xl"><strong>Time:</strong> {booking.time}</p>
          <p className="text-4xl"><strong>Location:</strong> {booking.location}</p>
          <p className="mt-4 font-bold">Amount:{booking.price} </p>
          <button
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={handlePayment}
          >
            Pay with Razorpay
          </button>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
      </div>
    </div>
  );
};

export default PaymentPage;
