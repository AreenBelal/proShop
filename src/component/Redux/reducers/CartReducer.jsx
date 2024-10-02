import { ADD, ADDWISH, DEL_FROM_CART, DELWISH,EMPTY_CART,EMPTY_WISH } from "../action/types";

const initialState = {
  cart: [],
  wishlist: []
};
 
const CartReducer = (state = initialState, action) => {
  switch (action.type) {

    case EMPTY_CART:{
      return {...state, cart: []};
    }
    case ADD: {
      const cartItem = state?.cart?.find(
        item => item.id === action.payload.product.id && item.selectedSize === action.payload.selectedSize
      );

      const { price, discount = 0 } = action.payload.product;
      const discountPrice = price - (price * discount / 100);

      if (cartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.product.id && item.selectedSize === action.payload.selectedSize
              ? {
                  ...item,
                  qty: item.qty + 1,
                  totalprice: (item.qty + 1) * price,
                  totalPriceAfterDiscount: (item.qty + 1) * discountPrice
                }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload.product,  
              selectedSize: action.payload.selectedSize,
              qty: 1,
              totalprice: price,
              totalPriceAfterDiscount: discountPrice,
              discountPrice
            }
          ]
        };
      }
    }

    case DEL_FROM_CART: {
      const itemToDelete = state?.cart?.find(
        item => item.id === action.payload.product.id && item.selectedSize === action.payload.selectedSize
      );

      if (itemToDelete) {
        if (itemToDelete.qty > 1) {
          return {
            ...state,
            cart: state.cart.map(item =>
              item.id === action.payload.product.id && item.selectedSize === action.payload.selectedSize
                ? {
                    ...item,
                    qty: item.qty - 1,
                    totalprice: (item.qty - 1) * item.price,
                    totalPriceAfterDiscount: (item.qty - 1) * item.discountPrice
                  }
                : item
            )
          };
        } else {
          return {
            ...state,
            cart: state.cart.filter(
              item => !(item.id === action.payload.product.id && item.selectedSize === action.payload.selectedSize)
            )
          };
        }
      }
      return state;
    }

    case ADDWISH: {
      const exist = state.wishlist.find(item => item.id === action.payload.id);

      if (exist) {
        return state;
      } else {
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }
    }

    case DELWISH: {
      const exist = state.wishlist.find(item => item.id === action.payload.id);

      if (exist) {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.id !== action.payload.id)
        };
      } else {
        return state;
      }
    }

    case EMPTY_WISH:{
      return {...state, wishlist: []};
    }

    default:
      return state;
  }
};

export default CartReducer;
