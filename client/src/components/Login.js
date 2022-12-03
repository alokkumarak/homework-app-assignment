import React, { useState , useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../css/signup.css";
import { UserContext } from "../App";

function Login() {
  const { state, dispatch } = useContext(UserContext);
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errLog,setErrLog]=useState("")

 const login = () => {
   fetch("/signin", {
     method: "post",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       email,
       password,
     }),
   })
     .then((res) => res.json())
     .then((signinData) => {
       if (signinData.error) {
         setErrLog(signinData.error)
       } else {
          console.log(signinData.message)
          
         localStorage.setItem("movieToken", signinData.token);
         localStorage.setItem("user", JSON.stringify(signinData.user));

         dispatch({ type: "USER", payload: signinData.user });
         navigate("/home");
         setEmail("");
         setPassword("");
       }
     })
     .catch((error) => console.log(error));
 };


  return (
    <div className="signup">
      <div className="signup_container">
        <div className="signup_title">LogIn</div>
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

          <Button variant="contained" onClick={login}>
            LogIn
          </Button>
        </form>
        <div className="signup_log">
          Don't have an Account <Link to="/">SignUp</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
