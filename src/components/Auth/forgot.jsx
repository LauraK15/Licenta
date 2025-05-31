import React, { useState } from "react";
import { Constants } from "../../Helper/Helper";
import { AiOutlineLeft } from "react-icons/ai";
import { useAuth } from "../../helper/authContext";
import { toast } from 'react-hot-toast';

const Forgot = ({ setComponent }) => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      toast.success("Verifică adresa de email pentru resetare.");
      setComponent(Constants.LOGIN);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="login">
      <span onClick={() => setComponent(Constants.LOGIN)} className="back">
        <AiOutlineLeft /> Back
      </span>
      <div className="head">
        <h3>Forgot Password</h3>
        <h5>Enter your registered email address. We’ll send you a code to reset your password.</h5>
      </div>
      <form onSubmit={handleForm}>
        <div className="inputControl">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <input type="submit" value="Send Email" />
      </form>
    </div>
  );
};

export default Forgot;
