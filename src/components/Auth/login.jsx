import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { Constants } from '../../Helper/Helper';
import { useAuth } from '../../helper/authContext';
import { toast } from 'react-hot-toast';

const Login = ({ setComponent }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login reușit!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="login">
      <div className="logo"><h1>HRM</h1></div>
      <div className="head">
        <h3>Welcome</h3>
        <h5>Please login here</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputControl">
          <label htmlFor="email">Email Address</label>
          <div className="inputWrapper">
            <input type="email" id="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <span className="inputIcon"><FaUser /></span>
          </div>
        </div>

        <div className="inputControl">
          <label htmlFor="password">Password</label>
          <div className="passwordWrapper">
            <input type={showPassword ? 'text' : 'password'}
              id="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <span onClick={togglePassword} className="toggleIcon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="control">
          <div className="remember">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <span onClick={() => setComponent(Constants.FORGOT)}>Forgot Password?</span>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
