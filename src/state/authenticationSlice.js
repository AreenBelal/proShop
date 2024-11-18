import {createSlice, createAsyncThunk, } from '@reduxjs/toolkit'


const initialState = {
    user: null,   
    token: localStorage.getItem('token') || null,  
    isAuthenticated: !!localStorage.getItem('token'),
};


const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess: (state, action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); 
          },
          setUser: (state, action) => {
            state.user = action.payload;
          },
    }
});

export const { loginSuccess, logout, setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
