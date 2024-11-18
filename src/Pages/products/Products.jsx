import React, { useState } from 'react'
import { ProductMain } from '../../component/styled_component/div.style';
import Dots from '../../component/dots/Dots';
import ProductCards from '../../component/ProductCards';


const Products = ({products}) => {

    const [number, setNumber] = useState(0);

  return (

    <ProductMain>
    <div className='title'>Featured Products </div>

    <div className='w-100 mx-auto my-5'>
    <ProductCards number={number} products={products} /> 
    </div>

    <Dots numberOfbuttons={4} setNumber={setNumber} />
    </ProductMain>

   
  )
}

export default Products