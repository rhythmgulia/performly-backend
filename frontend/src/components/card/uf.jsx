import { useEffect } from "react";

export default function CardRotation() {
  useEffect(() => {
    let cards = document.querySelectorAll(".cardelements");
    let angle = 360;
    cards.forEach((card, index) => {
      card.style.transform = `rotate(${angle}deg)`;
      angle -= 10;
      card.style.zIndex = cards.length - index;
    });
  }, []);

  return (
    <div className="h-[300vh] w-full relative">
      <div ></div>
      <div className=" sticky top-20">
        <div className="cardelements h-100 w-100 bg-blue-200 rounded-xl absolute top-[10%] left-[33%]"></div>
        <div className="cardelements h-100 w-100 bg-blue-100 rounded-xl absolute top-[10%] left-[33%]"></div>
        <div className="cardelements h-100 w-100 bg-blue-400 rounded-xl absolute top-[10%] left-[33%]"></div>
        <div className="cardelements h-100 w-100 bg-blue-500 rounded-xl absolute top-[10%] left-[33%]"></div>
        <div className="cardelements h-100 w-100  bg-blue-600 rounded-xl absolute top-[10%] left-[33%]"></div>
      </div>
    </div>
  );
}


// import { useEffect } from "react";

// export default function CardRotation() {
//   useEffect(() => {
//     const cards = document.querySelectorAll(".cardelements");
//     let angle = 360;
//     cards.forEach((card, index) => {
//       card.style.transform = `rotate(${angle}deg)`;
//       angle -= 10;
//       card.style.zIndex = cards.length - index;
//     });
//   }, []);

//   return (
//     <div className="h-[300vh] w-full bg-white relative">
//       {/* Sticky Container */}
//       <div className="sticky top-0 h-screen w-full flex justify-center items-center">
//         {/* Card Stack Container */}
//         <div className="relative w-[200px] h-[300px]">
//           <div className="cardelements absolute top-0 left-0 w-full h-full bg-blue-200 rounded-xl transition-opacity duration-500" />
//           <div className="cardelements absolute top-0 left-0 w-full h-full bg-blue-100 rounded-xl transition-opacity duration-500" />
//           <div className="cardelements absolute top-0 left-0 w-full h-full bg-blue-400 rounded-xl transition-opacity duration-500" />
//           <div className="cardelements absolute top-0 left-0 w-full h-full bg-blue-500 rounded-xl transition-opacity duration-500" />
//           <div className="cardelements absolute top-0 left-0 w-full h-full bg-blue-600 rounded-xl transition-opacity duration-500" />
//         </div>
//       </div>
//     </div>
//   );
// }
