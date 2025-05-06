// src/components/Auth/login.jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { Constants } from '../../Helper/Helper';
import { useAuth } from '../../helper/authContext';

const Login = ({ setComponent }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); // Accesăm metoda de login din context

  const handleFocus = (e) => {
    e.target.parentNode.children[1].focus();
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificăm email și parolă (poți adăuga validări aici)
    login(); // Apelăm login din context
  };

  return (
    <div className="login">
      <div className="logo">
        <h1>HRM</h1>
      </div>
      <div className="head">
        <h3>Welcome</h3>
        <h5>Please login here</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div onClick={handleFocus} className="inputControl">
          <label htmlFor="email">Email Address</label> {/* Folosim htmlFor și id pentru input */}
          <div className="inputWrapper">
            <input type="email" id="email" name="email" />
            <span className="inputIcon"><FaUser /></span>
          </div>
        </div>

        <div className="inputControl">
          <label htmlFor="password">Password</label> {/* Folosim htmlFor și id pentru input */}
          <div className="passwordWrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
            />
            <span onClick={togglePassword} className="toggleIcon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="control">
          <div className="remember">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember Me</label> {/* Folosim htmlFor */}
          </div>
          <span onClick={() => setComponent(Constants.FORGOT)}>Forgot Password?</span>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
