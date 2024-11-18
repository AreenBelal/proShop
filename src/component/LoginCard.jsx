import React, { useEffect, useState } from 'react'
import { CardAuth, CardForm, StraightLine } from './styled_component/div.style';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../state/authenticationSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
     const { user } = useSelector((state) => state.auth);
  
     useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token && user) {
        if (user.role === 'admin') {
          navigate('/crudproducts');
        } else {
          navigate(`/profile/${user.id}`);
        }
      }
    }, [user, navigate]);
  
  
    const validate = () => {
      const newErrors = {};
      
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
      }
  
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };
  
    // Handle login request
    const handleLogin = async (e) => {
      e.preventDefault();
  
      if (validate()) {
        try {
          const res = await axios.post('http://localhost:3000/auth/login', {
            email,
            password,
          });
  
          const data = await res.data;
          const token = data.accessToken;
  
  
          if (token) {
            // Dispatch login success action and pass user data and token
            dispatch(loginSuccess({ user: data.user, token }));
            
  
          } else {
            // If no token, redirect to login
            navigate('/login');
          }
  
        } catch (error) {
          const newErrors = {};
          if (error.response && error.response.data) {
            newErrors.email = error.response.data.message || 'Email or Password failed';
          } else {
            newErrors.email = 'Something went wrong. Please try again later';
          }
          setErrors(newErrors);
        }
      }
    };
  
    return (
      <CardAuth>
        <div className="head my-2"> Login </div>
        <div className="logintext mt-3 mb-3">
          Login with your data that you entered during registration
        </div>
  
        <CardForm className="d-flex flex-column justify-content-center">
          <div className="labelAuth">
            Enter your email address
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          <div className="labelAuth">
            Enter your password
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          {errors.password && <span>{errors.password}</span>}
          {errors.email && <span>{errors.email}</span>}
  
          <button className="loginButton" type="submit" onClick={handleLogin}>
            <div>Login</div>
          </button>
  
          <div style={{ width: "300px" }} className="d-flex flex-column justify-content-center align-items-center mt-2">
            <div className="d-flex align-items-center">
              <input type="checkbox" autoComplete="off" className="chBox" />
              <div className="rememberMe"> Remember me </div>
            </div>
  
            <Link to="" className="authLinks">
              Forgot your password?
            </Link>
          </div>
  
          <StraightLine />
  
          <div style={{ width: "300px" }} className="d-flex flex-column justify-content-center align-items-center mt-4 mb-2">
            <Link className="signupButton" to="/register">
              <div className="SignupText">Sign up now</div>
            </Link>
          </div>
        </CardForm>
      </CardAuth>
    );
  };
  
  export default LoginCard;
