import React, { useState } from "react";
import styles from '../../categories/category/FeaturedCategories.module.css';

function Dots({ setNumber, numberOfButtons }) {

  const [activeIndex, setActiveIndex] = useState(0);
 // 0 1 2 3 
  const buttonValues = Array.from({ length: numberOfButtons }, (_, index) =>  index);

  const handleClick = (value) => {
    setNumber(value);
    setActiveIndex(value);

  };

  const getButtonClassStyle = (value) => {
    return activeIndex === value
      ? `${styles.circularDiv} ${styles.yellow}`
      : styles.circularDiv;
  };


  return (
    <div className="d-flex justify-content-center mb-3">
      {buttonValues.map(value => (  
        <button
          key={value}
          id={value}
          className={getButtonClassStyle(value)}
          onClick={() => handleClick(value)}
        >
          
        </button>
      ))}
    </div>
  );
}

export default Dots;
