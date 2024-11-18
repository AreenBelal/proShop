import {createSlice, createAsyncThunk, } from '@reduxjs/toolkit'

import axios from 'axios';

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist',
    async ({ userId, product, selectedSize }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
  
      try {
        const token = localStorage.getItem('token');
  
        if (token) {
          const res = await axios.get(`http://localhost:3000/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const wishlist = res.data.wishlist || [];
  
          const discountPrice = product.price - (product.price * (product.discount || 0)) / 100;
  
          const wishlistItem = wishlist.find(
            (item) => item.id === product.id && item.selectedSize === selectedSize
          );
  
          if (!wishlistItem) {
            wishlist.push({
              ...product,
              selectedSize,
              qty: 1,
              totalPrice: Math.round(product.price),
              totalPriceAfterDiscount: Math.round(discountPrice),
              discountPrice,
            });
          }
  
          const response = await axios.patch(
            `http://localhost:3000/users/${userId}`,
            { wishlist },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          return { userId, wishlist: response.data.wishlist };
        }
      } catch (error) {
        console.error('Error details:', error.message);
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const deleteWishlist = createAsyncThunk(
    'wishlist/deleteWishlist',
    async ({ userId, product, selectedSize }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
  
      try {
        const token = localStorage.getItem('token');
  
        if (token) {
          const res = await axios.get(`http://localhost:3000/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          let wishlist = res.data.wishlist || [];
  
          wishlist = wishlist.filter(
            (item) => !(item.id === product.id && item.selectedSize === selectedSize)
          );
  
          const response = await axios.patch(
            `http://localhost:3000/users/${userId}`,
            { wishlist },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          return { userId, wishlist: response.data.wishlist };
        }
      } catch (error) {
        console.error('Error details:', error.message);
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const allWishlist = createAsyncThunk(
    'wishlist/allWishlist',
    async ({ userId }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
  
      try {
        const token = localStorage.getItem('token');
  
        if (token) {
          const response = await axios.patch(
            `http://localhost:3000/users/${userId}`,
            { wishlist: [] },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  console.log(response)
          return { userId, wishlist: response.data.wishlist };
        }
      } catch (error) {
        console.error('Error details:', error.message);
        return rejectWithValue(error.message);
      }
    }
  );
  
  const allwishSlice = createSlice({
    name: 'wishlist',
    initialState: {
      wishlist: {},
      loading: false,
      error: null,
    },
    reducers: {},
  
    extraReducers: (builder) => {
      builder
        .addCase(addToWishlist.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addToWishlist.fulfilled, (state, action) => {
          const { userId, wishlist } = action.payload;
          state.wishlist[userId] = wishlist;
          state.loading = false;
        })
        .addCase(addToWishlist.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        
        .addCase(deleteWishlist.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteWishlist.fulfilled, (state, action) => {
          const { userId, wishlist } = action.payload;
          state.wishlist[userId] = wishlist;
          state.loading = false;
        })
        .addCase(deleteWishlist.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
      
        .addCase(allWishlist.pending, (state) => {
          state.loading = true;
        })
        .addCase(allWishlist.fulfilled, (state, action) => {
          const { userId, wishlist } = action.payload;
          state.wishlist[userId] = wishlist;
          state.loading = false;
        })
        .addCase(allWishlist.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        ;
    },
  });
  
  export default allwishSlice.reducer;