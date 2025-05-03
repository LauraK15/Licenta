import React, { useState } from 'react';
import { Constants } from '../../Helper/Helper';
import { AiOutlineLeft } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

const UpdatePassword = ({ setComponent }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }
    // Simulează trimiterea parolei noi către backend
    toast.success('Password updated successfully!');
    setComponent(Constants.LOGIN);
  };

  return (
    <div className="login">
      <span onClick={() => setComponent(Constants.LOGIN)} className="back">
        <AiOutlineLeft />
        Back to Login
      </span>
      <div className="head">
        <h3>Reset Password</h3>
        <h5>Enter your new password below.</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputControl">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="inputControl">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Update Password" />
      </form>
    </div>
  );
};

export default UpdatePassword;
