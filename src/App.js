import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from './state/productSlice';
import { fetchCategories } from './state/categorySlice';
import Swal from 'sweetalert2';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './component/context/ThemeContext';
import RootLayout from './Pages/RootLayout';
import MainPage from './Pages/MainPage';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import Cart from './Pages/Cart';
import WishList from './Pages/wishlist/WishList';
import UserProfile from './Pages/UserProfile';
import Crudproduct from './Pages/admin/Crudproduct';
import Creatproduct from './Pages/admin/Creatproduct'
function App() {
 
  let dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const { categories } = useSelector(state => state.categories);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

    // Fetch categories data on component mount
    useEffect(() => {
      dispatch(fetchCategories());
    }, [dispatch]);
    
 

  // Function to handle deleting a product record with confirmation prompt
  const deleteRecord = useCallback(async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      dispatch(deleteProduct(id));
    }
  }, [dispatch]);

  // Loader function to validate URL parameter (checks if it's a number)
  const ParamHandler = ({ params }) => {
    const id = Number(params.id); // Convert the id to a number for validation
    if (!Number.isInteger(id)) {
      throw new Response("Bad Request", {
        status: 400,
        statusText: 'Please enter a valid ID',
      });
    }
    return null; // Return null to avoid further processing
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element:   <RootLayout/>,
      children: [
      {
        index: true,
        element: <MainPage products={products} categories={categories} />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "wishlist",
        element: <WishList />
      },
      {
        path: "profile/:id",
        element: <UserProfile />,
        loader: ParamHandler,
      },
      {
        path: "/crudproducts",
        element: <Crudproduct products={products} deleteRecord={deleteRecord} />,
      },
      {
        path: "/createProduct",
        element: <Creatproduct/>
      },
    ]
  },
  ]);

    return (
      <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
    );
  }
  
  export default App;
  
