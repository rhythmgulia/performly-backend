import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentPic from "../animate/paymentlottie";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [price, setPrice] = useState(null);
  const [performer, setPerformer] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8083/api/bookings/price/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooking(res.data.booking);
        setPrice(res.data.price);
        setPerformer(res.data.performer);
      } catch (err) {
        setError("Error fetching booking details");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      const amount = price;

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
          const verifyRes = await axios.post(
            "http://localhost:8083/api/payment/verifyPayment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verifyRes.data.message === "Payment verified") {
            await axios.put(
              `http://localhost:8083/api/bookings/${bookingId}/payment`,
              { paymentStatus: "Paid" },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            alert("Payment Successful!");
            navigate("/");
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
    <div className="h-screen p-6 bg-white text-center">
      <div className="h-[20%] flex items-center border-30 border-sky-900 bg-sky-900 text-white">
        <h1 className="text-7xl font-bold mb-4">Your Payment</h1>
      </div>
      <div className="h-[80%] w-full grid grid-cols-2 bg-gray-100">
        <div className="flex items-center justify-center">
          <div className="h-100 w-100">
            <PaymentPic />
          </div>
        </div>

        <div className="flex items-center justify-center">
          {error && <p className="text-red-500">{error}</p>}
          {booking ? (
            <div className="bg-white w-[80%] h-130 border-64 grid gap-2 border-white rounded-2xl shadow-xl p-8 mt-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">
                  Booking Summary
                </h1>

                <div className="space-y-6 text-left max-w-2xl mx-auto">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xl font-semibold text-gray-600">Performer:</span>
                    <span className="text-xl font-bold text-gray-900">{performer?.name}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xl font-semibold text-gray-600">Date:</span>
                    <span className="text-xl text-gray-900">{booking.date ? new Date(booking.date).toLocaleDateString() : "-"}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xl font-semibold text-gray-600">Time:</span>
                    <span className="text-xl text-gray-900">{booking.time || "-"}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-xl font-semibold text-gray-600">Location:</span>
                    <span className="text-xl text-gray-900 text-right max-w-xs">{booking.location || "-"}</span>
                  </div>

                  <div className="flex justify-between items-center py-4 mt-6 bg-sky-50 rounded-lg px-4">
                    <span className="text-2xl font-bold text-gray-800">Total Amount:</span>
                    <span className="text-2xl font-bold text-sky-800">₹{price}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-53 h-23 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xl font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
    </div>
  );
};

export default PaymentPage;
