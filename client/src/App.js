import React, { useEffect, createContext, useReducer, useContext } from "react";
import {
  BrowserRouter as Router,
   Routes, Route,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
// import Profile from "./components/MyMovie";
import { initialState, reducer } from "./context/reducer";
import MyMovie from "./components/MyMovie";
export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate("/home");
    } else {
      // navigate("/home");
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />  
      <Route path="/home" element={<Home />} />
      <Route exact path="/profile" element={<MyMovie />} />
    </Routes>
  );
};


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
     </UserContext.Provider>
  );
}

export default App;
