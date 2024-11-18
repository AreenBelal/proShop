import React, { useState } from 'react'
import { Cardmain } from '../component/styled_component/div.style';
import CategoryCard from '../component/CategoryCard';
import Dots from '../component/dots/Dots'

const CategoriesPage = ({categories}) => {
    const [number, setNumber] = useState(0); 
  
    return (
      <Cardmain>
      <div className='d-flex align-items-center justify-content-between'>
        <p>Featured Categories</p>
       <Dots setNumber={setNumber} numberOfbuttons={4}/>
      </div>
  
       <CategoryCard number={number} categories={categories}/>
  
     </Cardmain>
    )
  }
  
  export default CategoriesPage
  