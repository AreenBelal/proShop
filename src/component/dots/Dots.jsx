import React, { useState } from 'react'
import styles from './Dots.module.css'

const Dots = ({numberOfbuttons, setNumber}) => {

  
    const buttonValues = Array.from({ length: numberOfbuttons }, (_, index) =>  index);
    const [activeIndex, setActiveIndex] = useState(0); // first button is active button


    let handleClick = (item)=>{
      setActiveIndex(item);
      setNumber(item)
    }

   

  return (
    <div className="d-flex justify-content-center mb-3">
  
    {buttonValues.map((item, index) => (
      <button
        key={index}
        id={item}
        onClick={() => handleClick(item)}
        className={item === activeIndex ? `${styles.circularButton} ${styles.circularYellow}` : styles.circularButton}
      />
  ))}
  
    </div>
    )
  }   
  
export default Dots
