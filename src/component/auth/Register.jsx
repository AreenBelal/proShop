import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.css";
import axios from "axios";
import {validatePassword, validateEmail } from '../common/function/validationUtils';
import { CardAuth, HaveAccount, LabelAuth, StraightLine } from "../common/styled_comp/divStyles.style";
import { InputAuth } from "../common/styled_comp/Input.style";
import { LoginButton } from "../common/styled_comp/Button.style";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
 
 
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  
    if (validatePassword(value)) {
      setPasswordValid(true);
      setError("");
    } else {
      setPasswordValid(false);
      setError("Password must be at least 8 characters, with 1 upper, 1 lower, 1 digit, and 1 special character.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if fields are filled
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Ensure password is valid
    if (!passwordValid) {
      setError("Password does not meet the requirements");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setSuccess("Registration successful");
      setError("");
    } catch (error) {
      setError("Error during registration");
      console.error(error);
    } finally {
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
    }
  };

  return (
    <div className='overflow-hidden'>
      <div className="row">
        <CardAuth className="col-md-4">
          <div className='head my-2'>Signup</div>
          <div className='logintext mt-3'>
            Sign up and get exclusive offers from us
          </div>

          <form className="d-flex flex-column mt-4" onSubmit={handleSubmit}>
          
          
          <LabelAuth>
              Name
              <InputAuth
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </LabelAuth>

            <LabelAuth>
              Enter your email address
              <InputAuth
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelAuth>

            <LabelAuth>
              Enter your password
              <InputAuth
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              
            </LabelAuth>

            <LabelAuth>
              Confirm your password
              <InputAuth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

              />
               
            </LabelAuth>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <LoginButton type="submit">
              <div className={styles.btntext}>Sign up</div>
            </LoginButton>
          </form>

          <StraightLine/> 

          <div className="d-flex justify-content-center my-3" style={{ width: "300px" }}>
            <HaveAccount> Have an account? </HaveAccount>
            <Link className={styles.regLinkToLogin} to="/login">
              Login
            </Link>
          </div>
        </CardAuth>

        <div className="col-md-8 ms-auto">
          <img
            alt="registerImage"
            src='/images/register.png'
            className={styles.RegisterImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
