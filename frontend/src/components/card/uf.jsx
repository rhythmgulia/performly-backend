import React, { useEffect } from 'react'

const uf = () => {
  
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

    return () => window.removeEventListener("scroll", handleScroll); // ✅ Cleanup
  }, []);
  return (
    <>
    <div className="stackarea h-[300vh] w-full bg-white flex">
     <div className='w-1/2 bg-blue-200 basis-[50%] sticky top-0 h-dvh'></div>
     <div className='w-1/2 bg-blue-500 basis-[50%] relative sticky top-0 h-dvh'>
     <div className="cards h-140 w-140 absolute top-1/5 left-1/5 bg-blue-900 rounded-xl"></div>
     <div className="cards h-140 w-140 absolute top-1/5 left-1/5 bg-blue-800 rounded-xl"></div>
     <div className="cards h-140 w-140 absolute top-1/5 left-1/5 bg-blue-900 rounded-xl"></div>
     <div className="cards h-140 w-140 absolute top-1/5 left-1/5 bg-blue-600 rounded-xl"></div>
         
     </div>  
    </div>
    </>
  )
}

export default uf














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

