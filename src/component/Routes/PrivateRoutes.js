import React from "react";
import { Routes, Route } from "react-router-dom";
import Userprofile from "../User/Userprofile";
import ProductDetails from "../products/details/ProductDetails";
import Cart from "../shoppingCart/Cart";
import WishList from "../wishlist/WishList";
import MainPage from "../main/MainPage";
import FeaturedCategories from "../categories/category/FeaturedCategories";
import FeaturedProducts from "../products/featuedProduct/FeaturedProducts";
import TopRate from "../top rate product/TopRate";
import AdminDashbord from "../admin/AdminDashbord";
import CreateNewProduct from "../admin/CreateNewProduct";
import ProductTable from "../admin/ProductTable";
import Edit from "../admin/Edit";
const PrivateRoutes = ({ handleLogout }) => {
  return (
    <Routes>
      <Route path="/" element={<Userprofile handleLogout={handleLogout} />} />

      <Route
        path="/profile/:id"
        element={<Userprofile handleLogout={handleLogout} />}
      />

      <Route
      path="/edit/:id"
      element={<Edit />}
    />

      <Route path="addproduct" element={<CreateNewProduct />} />

      <Route path="producttable" element={<ProductTable />} />
      <Route
        path="/mainpage"
        element={
          <>
            <MainPage />
            <FeaturedCategories />
            <FeaturedProducts />
            <TopRate />
          </>
        }
      />
      <Route path="/productDetails/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />

      <Route
        path="/admin"
        element={<AdminDashbord handleLogout={handleLogout} />}
      />
    </Routes>
  );
};

export default PrivateRoutes;
