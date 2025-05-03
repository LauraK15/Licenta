import React, { useState } from "react"
import Login from "./login"
import './authbody.css'
import { Constants } from "../../Helper/Helper"
import Forgot from "./forgot"
 import UpdatePassword from "./updatepassword"; 
 import OTP from "./otp"; 


const AuthBody = ()=>{
 //States
 const [component,setComponent]= useState(Constants.LOGIN)

 return (
  <div className="authBody">
   {
    (()=>{
     if(component===Constants.LOGIN) return <Login setComponent={setComponent}/>
     else if(component === Constants.FORGOT) return <Forgot setComponent={setComponent}/>
     else if(component === Constants.OTP) return <OTP setComponent={setComponent}/>
      else if(component === Constants.UPDATE_PASSWORD) return <UpdatePassword setComponent={setComponent}/>
    })()
   }
  </div>
 )
}

export default AuthBody;