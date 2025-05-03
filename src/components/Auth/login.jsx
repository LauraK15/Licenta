import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Constants } from '../../Helper/Helper';

const Login = ({setComponent}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    e.target.parentNode.children[1].focus();
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='login'>
      <div className='logo'>
        <img src='' alt='Logo'/>
        <h1>HRM</h1>
      </div>
      <div className='head'>
        <h3>Welcome</h3>
        <h5>Please login here</h5>
      </div>
      <form>
        <div onClick={handleFocus} className='inputControl'>
          <label>Email Address</label>
          <div className='inputWrapper'>
    <input type='email' name='email' />
    <span className='inputIcon'><FaUser /></span>
    </div>
        </div>

        <div className='inputControl'>
          <label>Password</label>
          <div className='passwordWrapper'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name='password'
            />
            <span onClick={togglePassword} className='toggleIcon'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className='control'>
          <div className='remember'>
            <input type='checkbox' name='remember' />
            <label htmlFor='remember'>Remember Me</label>
          </div>
          <span onClick={()=>setComponent(Constants.FORGOT)}>Forgot Password?</span>
        </div>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;