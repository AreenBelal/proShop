import React, { useState } from 'react';
import { CardAuth, CardForm, StraightLine } from './styled_component/div.style';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const RegisterCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handlePasswordChange = (e) => {
        const newPass = e.target.value;
        setPassword(newPass);

        if (newPass.length >= 8 && validatePassword(newPass)) {
            setPasswordStrength("Strong");
        } else if (newPass.length >= 5) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Weak");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            setError("Name is required.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters, contain uppercase, lowercase, a number, and a special character.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:3000/auth/register", {
                name,
                email,
                password,
                role : 'user',
                cart: [],
                wishlist: []
            });

            if (response.status === 201) {
                setSuccess("Registration successful!");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError("An error occurred during registration. Please try again.");
            }
        } catch (error) {
            setError("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <CardAuth className="col-md-4 p-4" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <p className='text-center mb-4 logintext'>Sign up and get exclusive offers from us</p>
  
                <CardForm onSubmit={handleSubmit} className="d-flex flex-column">
                    <div className="labelAuth">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                        />
                    </div>
  
                    <div className="labelAuth">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
  
                    <div className="labelAuth">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                             className="form-control"
                        />
                    </div>
  
                    <div className="labelAuth">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
  
                    {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                    {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
  
                    <button className="loginButton fw-bolder" type="submit">
                        Sign Up
                    </button>
                </CardForm>
  
                <StraightLine className="mt-4 mb-3" />
  
                <div className="d-flex justify-content-center align-items-between haveAccount">
                    <span className=' text-muted'>Already have an account?</span>
                    <Link className='linkLogin ms-3' to="/login">
                        Login
                    </Link>
                </div>
            </CardAuth>
        </div>
    );
};

export default RegisterCard;
