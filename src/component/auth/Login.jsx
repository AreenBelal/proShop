import React, { useState } from "react";
import styles from "./auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';  
import {validatePassword, validateEmail } from '../common/function/validationUtils';
import { CardAuth, LabelAuth, RememberMe, SignupText, StraightLine } from "../common/styled_comp/divStyles.style";
import { InputAuth } from "../common/styled_comp/Input.style";
import { LoginButton } from "../common/styled_comp/Button.style";


function Login({ handleLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const navigate = useNavigate();

 
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (validatePassword(value)) {
      setPasswordValid(true);
      setError(""); 
    } else {
      setPasswordValid(false);
      setError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      setError("Both email and password are required");
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    } else if (!passwordValid) {
      setError("Password does not meet the requirements.");
      return;
    }
  
    try {
      let response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);  
  
      const decodedToken = jwtDecode(access_token);
      const userEmail = decodedToken.email;
      const role = decodedToken.role;

      const usersResponse = await axios.get('/users.json');
      const users = usersResponse.data.users;
      const userNeeded = users.find((user) => user.email === userEmail);
  
      if (userNeeded) {
        handleLogin();
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate(`/profile/${userNeeded.id}`);
        }
        setSuccess("Login successful!");
      } else {
        setError("User not found");
      }
      
    } catch (error) {
      setError('Email or password wrong');
    } finally {
      setEmail('');
      setPassword('');
    }
  };
  

  return (
    <div className='d-flex justify-content-center'>
      <CardAuth>
        <div className='head my-2'> Login </div>
        <div className='logintext mt-3 mb-3'>
          Login with your data that you entered during registration
        </div>

        <form
          className="d-flex flex-column justify-content-center"
          onSubmit={handleSubmit}
        >
          <LabelAuth>
            Enter your email address
            <InputAuth
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelAuth>

          <LabelAuth>
            Enter your password
            <InputAuth
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          
          </LabelAuth>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <LoginButton type="submit" >
            <div>Login</div>
          </LoginButton>

          <div  style={{ width: "300px" }}  className="d-flex flex-column justify-content-center align-items-center mt-2" >
           
          
          <div className="d-flex align-items-center">
             
          <input
                type="checkbox"
                autoComplete="off"
                className={styles.chBox}
              />
              <RememberMe> Remember me </RememberMe>
            </div>

            <Link to="" className={styles.authLinks}>
              Forgot your password?
            </Link>
          </div>

          <StraightLine/> 

          <div
            style={{ width: "300px" }}
            className="d-flex flex-column justify-content-center align-items-center mt-4 mb-2"
          >
            <Link className={styles.signupButton} to="/register">
              <SignupText>Sign up now</SignupText>
            </Link>
          </div>
        </form>
      </CardAuth>

      <img alt="LoginImg" src='/images/login.png' className={styles.authImg} />
    </div>
  );
}

export default Login;
