import React, { useState } from 'react';
import Dots from '../../common/design/Dots';
import { Cardmain, CardTitle } from '../../common/styled_comp/divStyles.style';
import CardsCat from '../cards/CardsCat';

function FeaturedCategories() {
  const [number, setNumber] = useState(0); 
  

  return (
    <Cardmain>
      <div className='d-flex align-items-center'>
        <CardTitle>Featured Categories</CardTitle>
        <div className='d-flex ms-auto'>
         <Dots setNumber={setNumber} numberOfButtons={4}/>
       
        </div>

      </div>

       <CardsCat number={number}/>

     </Cardmain>
  );
}

export default FeaturedCategories;
