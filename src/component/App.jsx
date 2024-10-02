import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import PublicRoutes from './Routes/PublicRoutes';
import PrivateRoutes from './Routes/PrivateRoutes';
import Login from './auth/Login';
import Register from './auth/Register';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { EMPTY_CART, EMPTY_WISH } from './Redux/action/types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let dispatch = useDispatch();

  const navigate = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem('token'); 

    if (token) { 
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp < Date.now() / 1000) {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);

    dispatch({
      type: EMPTY_CART,
      payload: ''
    })

    dispatch({
      type: EMPTY_WISH,
      payload: ''
    })

    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);

    navigate('/'); 
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        {isLoggedIn ? (
          <Route path='/*' element={<PrivateRoutes handleLogout={handleLogout} />} />
        ) : (
          <Route path='/*' element={<PublicRoutes />} />
        )}
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
