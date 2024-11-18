import { configureStore } from "@reduxjs/toolkit";
import products from './productSlice'
import categories from './categorySlice'
import auth from './authenticationSlice' 
import cart from './allcartSlice'
import wishlist from './allwishSlice'

export default configureStore({
    reducer:{products, categories,auth, cart, wishlist}
})