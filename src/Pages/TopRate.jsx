import React, { useEffect, useState } from 'react'
import ProductCardDetails from '../component/ProductCardDetails';
import { Cardmain } from '../component/styled_component/div.style';

const TopRate = ({products}) => {

    const [topRated, setTopRated] = useState([]);

    useEffect(()=>{
        const TopRated = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      setTopRated(TopRated);
    },[products])
  
  
  
    return (
      <Cardmain>
      <p className='mt-auto'>TOP RATE PRODUCTS</p>
      <div className='container'>

     <div className="row justify-content-center">
     {topRated?.map((product,index) => {
       return (
         <div className="col-md-3" key={index}>
         <ProductCardDetails product={product}/>

         </div>
       );
     })}
   </div>

   
     
   </div>
      
      </Cardmain>
 
  )
}

export default TopRate