import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../main/MainPage';
import FeaturedCategories from '../categories/category/FeaturedCategories';
import FeaturedProducts from '../products/featuedProduct/FeaturedProducts';
import ProductDetails from '../products/details/ProductDetails';
import TopRate from '../top rate product/TopRate';
import Cart from '../shoppingCart/Cart'
import WishList from '../wishlist/WishList'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={
        <>
          <MainPage />
          <FeaturedCategories />
          <FeaturedProducts />
          <TopRate/>
        </>
      } />
      <Route path='/productDetails/:id' element={<ProductDetails />} />
      <Route path='/mainpage' element={
        <>
          <MainPage />
          <FeaturedCategories />
          <FeaturedProducts />
          <TopRate/>
        </>
      } />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wishlist' element={<WishList />} />
      <Route path='/toprate' element={<TopRate/>} />
    </Routes>
  );
};

export default PublicRoutes;
