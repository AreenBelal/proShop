import React from "react";
import Firstsec from "./Firstsec";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function MainPage() {
  return (
    <>
      <style>
        {`
          .carousel .control-dots .dot {
            width: 15px !important;  
            height: 15px !important;  
            background-color: #333;  
            border-radius: 50% !important;  
            margin: 0 5px !important;  
            opacity: 0.3;  
            transition: opacity 0.3s;  
          }

          .carousel .control-dots .dot.active {
            background-color: #FCDD06 !important; 
            opacity: 1 !important;
          }
        `}
      </style>
      <Carousel>
        <Firstsec />
        <Firstsec />
        <Firstsec />
      </Carousel>
    </>
  );
}

export default MainPage;
