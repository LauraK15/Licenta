import React, { useState } from "react";
import { Constants } from "../../Helper/Helper";
import { AiOutlineLeft } from "react-icons/ai";

const Forgot = ({ setComponent }) => {
  const [email, setEmail] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    // aici poți adăuga validări dacă vrei
    setComponent(Constants.OTP);
  };

  return (
    <div className="login">
      <span onClick={() => setComponent(Constants.LOGIN)} className="back">
        <AiOutlineLeft />
        Back
      </span>
      <div className="head">
        <h3>Forgot Password</h3>
        <h5>Enter your registered email address. We’ll send you a code to reset your password.</h5>
      </div>
      <form onSubmit={handleForm}>
        <div className="inputControl">
          <label onClick={(e) => e.target.parentNode.children[1].focus()} htmlFor="email">
            Email Address
          </label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <input type="submit" value="Send OTP" />
      </form>
    </div>
  );
};

export default Forgot;
