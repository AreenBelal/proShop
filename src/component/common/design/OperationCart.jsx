import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IncDec } from '../styled_comp/Button.style';
import { OperationContainer } from '../styled_comp/divStyles.style';
import {handleAdd, handleDec} from '../function/ReduxOP' 

function OperationCart({product, selectedSize}) {

  let cart = useSelector((state) => state.Ecommerce.cart);
  let data = cart.find((item) => item.id === product.id && item.selectedSize === selectedSize)

  let dispatch = useDispatch();

  return (
            
<OperationContainer> 


<IncDec onClick={() => handleDec(dispatch,product,selectedSize)} >
<div className="fs-4">-</div>
</IncDec>
<div className="fs-4" > {data ? data.qty : 0} </div>
<IncDec onClick={() => handleAdd(dispatch,product,selectedSize)}>
  <div className="fs-4">+</div> 
</IncDec>



</OperationContainer> 
 
   
  )
}

export default OperationCart
