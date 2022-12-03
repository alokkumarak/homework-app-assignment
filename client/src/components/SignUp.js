import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from "@mui/material/Button";
import '../css/signup.css'


function SignUp() {
       const navigate=useNavigate()
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [confirmPassword, setConfirmPassword] = useState("");
       const [errMsg,setErrMsg]=useState("")
 

       const uploadData=()=>{
           if (password.length <= 6) {
             setErrMsg("Password must be atleast 6 character")
             return;
           }

           fetch("/signup", {
             method: "post",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               email,
               password,
               confirmPassword,
             }),
           })
             .then((res) => res.json())
             .then((signupData) => {
               if (signupData.error) {
                 setErrMsg(signupData.error);
               } else {
                 setErrMsg("");
                 navigate("/login");
                 setEmail("");
                 setPassword("");
                 setConfirmPassword("");
               }
             })
             .catch((error) => console.log(error));

       }

       const signup=()=>{
          uploadData();
       }

    return (
      <div className="signup">
        <div className="signup_container">
          <div className="signup_title">SignUp</div>
          <form className="signup_form">
            <input
              className="signup_input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="signup_input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="signup_input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errMsg && <div style={{fontSize:"14px",color:"red"}}>{errMsg}</div>}
            <Button variant="contained" onClick={signup}>
              SignUp
            </Button>
          </form>
          <div className="signup_log">
            Already have an Account <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    );
}

export default SignUp
