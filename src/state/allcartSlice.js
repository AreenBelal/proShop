import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCartAsync = createAsyncThunk('cart/addTocart', 
  async({ userId = null, product, selectedSize }, thunkAPI) => {  // Default userId to null
    const { rejectWithValue, getState } = thunkAPI;

    try {
        const { isAuthenticated } = getState().auth;

        if (isAuthenticated && userId) {  // Check if userId is valid
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:3000/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const cart = res.data.cart || [];
            const discountPrice = product.price - (product.price * (product.discount || 0) / 100);
            const cartItem = cart.find(item => item.id === product.id && item.selectedSize === selectedSize);

            if (cartItem) {
                cartItem.qty += 1;
                cartItem.totalPrice = Math.round(cartItem.qty * product.price);
                cartItem.totalPriceAfterDiscount = Math.round(cartItem.qty * discountPrice);
            } else {
                cart.push({
                    ...product,
                    selectedSize,
                    qty: 1,
                    totalPrice: Math.round(product.price),
                    totalPriceAfterDiscount: Math.round(discountPrice),
                });
            }

            const response = await axios.patch(
                `http://localhost:3000/users/${userId}`,
                { cart },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            return { userId, cart: response.data.cart };
        } else {
            const localcart = [...(getState().cart.localcart || [])];

            if (product && typeof product.id !== "undefined") {
                const discountPrice = product.price - (product.price * (product.discount || 0) / 100);

                const cartItemIndex = localcart.findIndex(item => item.product.id === product.id && item.selectedSize === selectedSize);

                if (cartItemIndex !== -1) {
                    const updatedCartItem = {
                        ...localcart[cartItemIndex],   
                        qty: localcart[cartItemIndex].qty + 1, 
                        totalPrice: Math.round((localcart[cartItemIndex].qty + 1) * product.price), 
                        totalPriceAfterDiscount: Math.round((localcart[cartItemIndex].qty + 1) * discountPrice),  
                    };

                    localcart[cartItemIndex] = updatedCartItem;
                } else {
                    localcart.push({
                        product,
                        selectedSize,
                        qty: 1,
                        totalPrice: Math.round(product.price),
                        totalPriceAfterDiscount: Math.round(discountPrice),
                    });
                }
                return { localcart };
            } else {
                console.error("Error: Product or product.id is undefined.");
            }
        }
    } catch (error) {
        console.error('Error details:', error.message);
        return rejectWithValue(error.message);
    }
});




// Remove item from cart
export const removeFromCartAsync = createAsyncThunk('cart/removeFromCart', async({ userId, product, selectedSize }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await axios.get(`http://localhost:3000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const cart = response.data.cart || [];
      const discountPrice = product.price - (product.price * (product.discount || 0) / 100);
      const cartItem = cart.find(item => item.id === product.id && item.selectedSize === selectedSize);

      if (cartItem) {
        if (cartItem.qty > 1) {
          cartItem.qty -= 1;
          cartItem.totalPrice = Math.round(cartItem.qty * product.price);
          cartItem.totalPriceAfterDiscount = Math.round(cartItem.qty * discountPrice);
        } else {
          const index = cart.findIndex(item => item.id === product.id && item.selectedSize === selectedSize);
          if (index > -1) {
            cart.splice(index, 1);  // Remove the item if quantity is 1
          }
        }
      }

      await axios.patch(
        `http://localhost:3000/users/${userId}`,
        { cart },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return { userId, cart };
    }

    else {
      return { userId, product, selectedSize };
    }
  } catch (error) {
    console.error('Error details:', error.response || error.message);
    return rejectWithValue(error.message);
  }
});


export const removeAllCartElement = createAsyncThunk('cart/removeAllCartElement', async({ userId, product, selectedSize }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await axios.get(`http://localhost:3000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const cart = response.data.cart || [];

      const cartItem = cart.find(item => item.id === product.id && item.selectedSize === selectedSize);

      if (cartItem) {
          const index = cart.findIndex(item => item.id === product.id && item.selectedSize === selectedSize);
          if (index > -1) {
            cart.splice(index, 1);  
       
        }
      }

      await axios.patch(
        `http://localhost:3000/users/${userId}`,
        { cart },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return { userId, cart };
    }

    else {
      return { userId, product, selectedSize };
    }
  } catch (error) {
    console.error('Error details:', error.response || error.message);
    return rejectWithValue(error.message);
  }
});


export const AllCart = createAsyncThunk('cart/AllCart', async({ userId}, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await axios.get(`http://localhost:3000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      let cart = response.data.cart || [];

      cart = [];

      const res = await axios.patch(
        `http://localhost:3000/users/${userId}`,
        { cart },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return { userId,cart: res.data.cart };
    } 
  } catch (error) {
    console.error('Error details:', error.response || error.message);
    return rejectWithValue(error.message);
  }
});



const allcartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: {},  
    localcart: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      const { userId, cart, localcart } = action.payload;
    
      // Handle the case when userId is missing
      if (userId && cart) {
        state.carts[userId] = cart;
      }
    
      if (localcart) {
        state.localcart = localcart;
      }
    
      state.loading = false;
    })
    
    .addCase(addToCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Unknown error';
    })


      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const { userId, cart } = action.payload;
        state.carts[userId] = cart;
        state.loading = false;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
      .addCase(removeAllCartElement.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAllCartElement.fulfilled, (state, action) => {
        const { userId, cart } = action.payload;
        state.carts[userId] = cart;
        state.loading = false;
      })
      .addCase(removeAllCartElement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
      

      .addCase(AllCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllCart.fulfilled, (state, action) => {
        const { userId, cart } = action.payload;
        state.carts[userId] = cart;
        state.loading = false;
      })
      .addCase(AllCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 

      ;
  },
});

export default allcartSlice.reducer;
