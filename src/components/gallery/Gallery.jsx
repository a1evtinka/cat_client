// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import Img1 from "../public/img/1.jpg";
// import Img2 from "../public/img/2.jpg";
// import Img3 from "../public/img/3.jpg";
// import Img4 from "../public/img/4.jpg";
// import "./styles.css";
// import RenderImg from "./RenderImg.jsx";

// class Gallery extends Component {
//   state = {
//     images: [Img1, Img2, Img3, Img4],
//     activeIndex: 0
//   };
//   photoChanger = index => {
//     const images = this.state.images;
//     this.setState({
//       img: [images[index]],
//       activeIndex: index
//     });
//     console.log(index);
//   };

//   render() {
//     const images = this.state.images;
//     const cover = this.state.images[this.state.activeIndex];
//     return (
//       <div>
//         <RenderImg
//           state={this.state}
//           cover={cover}
//           photoChanger={this.photoChanger}
//           images={images}
//         />
//       </div>
//     );
//   }
// }
