import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const uf = () => {

  const navigateto = useNavigate();
  const handlenavigate = () => {
    navigateto("/signin");
  };
  const rotateCards = () => {
    const cards = document.querySelectorAll(".cards");
    let angle = 0;
    cards.forEach((card, index) => {
      if (card.classList.contains("away")) {
        card.style.transform = `translateY(-120vh) rotate(-48deg)`;
      } else {
        card.style.transform = `rotate(${angle}deg)`;
        angle -= 10;
        card.style.zIndex = cards.length - index;
      }
    });
  };

  useEffect(() => {
    rotateCards();
  }, []);

  useEffect(() => {
    const stackArea = document.querySelector(".stackarea");
    const cards = document.querySelectorAll(".cards");

    const handleScroll = () => {
      const distance = window.innerHeight / 2;
      const topval = stackArea.getBoundingClientRect().top;
      let index = -1 * (topval / distance + 1);
      index = Math.floor(index);

      for (let i = 0; i < cards.length; i++) {
        if (i <= index) {
          cards[i].classList.add("away");
        } else {
          cards[i].classList.remove("away");
        }
      }

      rotateCards();
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="stackarea h-[300vh] w-full bg-orange-100 flex">
        <div className="w-1/2  basis-[50%] sticky top-0 h-dvh">
          <div className="h-full w-full  flex items-center justify-center">
            <h1 className="text-7xl font-bold">What we OFFER !!</h1>
          </div>
        </div>
        <div className="w-1/2  basis-[50%] relative sticky top-0 h-dvh">
          <div className="cards h-140 w-140 absolute top-1/5 left-1/5  border-1 rounded-xl flex justify-center border-l-43 border-r-43 border-blue-200 text-xl font-medium bg-blue-200 items-center">
            {" "}
            Create a captivating profile with images, videos, and a compelling
            bio that highlights your talent and experience. Manage Your Gigs:
            Easily track your bookings, update availability, and get real-time
            notifications. Get Paid Securely: Receive hassle-free, timely
            payments with seamless integrations. Grow Your Reputation: Collect
            ratings and reviews to enhance your visibility in the gig community.{" "}
          </div>
          <div className="cards h-140 w-140 absolute bg-blue-300 top-1/5 left-1/5 border-1 rounded-xl flex justify-center  border-l-43 border-r-43 border-blue-300 text-xl font-medium items-center">
            <p>
              {" "}
              Browse a wide range of performers—musicians, magicians, comedians,
              dancers, and more. Filter & Find: Search by category, price,
              availability, and location to find your perfect match. Hassle-free
              Bookings: Send gig requests, confirm availability, and make secure
              payments—all in one place.
            </p>
          </div>
          {/* <div className="cards h-140 w-140 absolute top-1/5 left-1/5 border-1 rounded-xl">
            <div className="grid grid-cols-5">
              <div className=" border-1 w-full">1</div>
              <div className="border-1 w-full">2</div>{" "}
              <div className=" w-full border-1">3</div>{" "}
              <div className="border-1 w-full">4</div>{" "}
              <div className="border-1 w-full">5</div>
            </div>
          </div> */}
          <div className="cards h-140 w-140 absolute top-1/5 left-1/5 border-1 rounded-xl flex justify-center items-center ">
            {" "}
            <button    onClick={handlenavigate} className="border-1 w-33 h-13 rounded-xl hover:bg-sky-900 transition-all ease-in-out dusration-200 hover:text-white ">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default uf;

// import React, { useEffect, useRef, useState } from "react";

// const cardData = [
//   {
//     sub: "Simplified",
//     content: "Complex tasks are now simple",
//     color: "bg-blue-500",
//   },
//   {
//     sub: "Boost Productivity",
//     content: "Perform Tasks in less time",
//     color: "bg-red-500",
//   },
//   {
//     sub: "Facilitated learning",
//     content: "Train anyone from anywhere",
//     color: "bg-purple-400",
//   },
//   {
//     sub: "Support",
//     content: "Now it's 24/7 support",
//     color: "bg-pink-400",
//   },
// ];

// export default function ThirdPageStackedCards() {
//   const stackRef = useRef(null);
//   const [awayCards, setAwayCards] = useState([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const distance = window.innerHeight * 0.5;
//       const topVal = stackRef.current.getBoundingClientRect().top;
//       let index = Math.floor(-1 * (topVal / distance + 1));
//       const updated = cardData.map((_, i) => i <= index);
//       setAwayCards(updated);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial check
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="third-page h-[300vh] w-full" ref={stackRef}>
//       {/* Top Header */}
//       <div className="text-9xl h-[9%] w-full flex justify-center items-center bg-blue-200">
//         <h1 className="appearanimation">LETS GET STARTED</h1>
//       </div>

//       {/* Split Sticky Section */}
//       <div className="flex sticky top-0 h-screen w-full justify-center items-center">
//         {/* Left Side */}
//         <div className="h-full w-1/2 flex justify-center items-center bg-gray-100">
//           <div className="text-[84px] leading-[88px] font-bold font-poppins w-[420px]">
//             Our Features
//             <div className="text-sm font-poppins w-[420px] mt-8">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               <br />
//               <button className="mt-5 px-6 py-3 bg-black text-white rounded-[8mm] font-poppins text-sm">
//                 See More Details
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="h-full w-1/2 flex justify-center items-center bg-white relative">
//           <div className="h-full w-[90%] shadow-lg relative bg-transparent">

//             {cardData.map((card, i) => {
//               const angle = awayCards[i] ? 0 : -i * 10;
//               const translateY = awayCards[i] ? "-translate-y-[120vh]" : "";
//               const rotate = awayCards[i] ? "-rotate-[48deg]" : `rotate-[${angle}deg]`;

//               return (
//                 <div
//                   key={i}
//                   className={`absolute w-[350px] h-[350px] rounded-[25px] p-9 flex flex-col justify-between box-border transition-all duration-500 ease-in-out left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[${cardData.length - i}] ${card.color} transform ${translateY} ${rotate}`}
//                 >
//                   <div className="font-bold text-lg font-poppins">{card.sub}</div>
//                   <div className="text-[44px] leading-[54px] font-bold font-poppins">
//                     {card.content}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
