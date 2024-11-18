import React from 'react'
import { addToCartAsync, removeFromCartAsync } from '../state/allcartSlice';
import { OperationContainer } from './styled_component/div.style';
import { useDispatch, useSelector } from 'react-redux';

const OperationCart = ({product,selectedSize}) => {
 

    const dispatch = useDispatch();
    const { carts } = useSelector((state) => state.cart);
    const userId = Object.keys(carts)[0]
    const userCart = Object.values(carts)[0]
    const data = product ? userCart.find((item) => item.id === product.id && item.selectedSize === selectedSize) : null;
    
  
   
    
    return (
      <OperationContainer> 
  
  
      <button onClick={() =>  dispatch(removeFromCartAsync({ product, selectedSize, userId }))}  > 
      <div className="fs-4">-</div>
      </button>
      <div className="fs-4" >{data ? data.qty : 0} </div>
      <button onClick={()=>   dispatch(addToCartAsync({product,selectedSize,userId}))}  >
        <div className="fs-4">+</div> 
      </button>
      
      
      
      </OperationContainer>
    )
  }
  
  export default OperationCart
  