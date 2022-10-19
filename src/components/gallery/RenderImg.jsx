// import React from "react";

// const RenderImg = props => {
//   const images = props.images;
//   console.log();
//   return (
//     <div className="container">
//       <div className="hero__img">
//         <img src={props.cover} />
//       </div>
//       <div className="img__collection">
//         {images.map((img, index) => {
//           const className =
//             props.state.activeIndex === index ? "active" : "media";
//           return (
//             <div
//               className={className}
//               key={index}
//               onClick={() => props.photoChanger(index)}
//             >
//               {" "}
//               <img src={img} />{" "}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RenderImg;
