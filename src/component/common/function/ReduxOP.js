import { ADD, ADDWISH, DEL_FROM_CART } from "../../Redux/action/types";

export const handleAdd = (dispatch, product, selectedSize) => {
  dispatch({
    type: ADD,
    payload: { 
      product,
      selectedSize 
    }
  });
};

export const handleWishList = (dispatch, product) => {
  dispatch({
    type: ADDWISH,
    payload: product
  });
};

export const handleDec = (dispatch, product, selectedSize) => {
  dispatch({
    type: DEL_FROM_CART,
    payload: { 
     product,   
      selectedSize 
    }
  });
};
