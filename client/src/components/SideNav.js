import React, { useContext } from "react";
import '../css/sidenav.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AirplayIcon from "@mui/icons-material/Airplay";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from '../App';

function SideNav() {
  const { state, dispatch } = useContext(UserContext);
  const navigate=useNavigate()
  const logout = () => {
    localStorage.clear();
    dispatch({ Type: "CLEAR" });
    navigate("/login");
  };
    return (
      <div className="sidenav">
        <div className="sidenav_header">BM</div>
        <div>
          <NavLink to="/home" className="navLink" activeClassName="active">
            <Tooltip title="Home">
              <AirplayIcon />
            </Tooltip>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/profile"
            className="navLink"
            activeClassName="active"
            // activeStyle={{ backgroundColor: "red" }}
          >
            <Tooltip title="My Movies">
              <FolderOpenIcon />
            </Tooltip>
          </NavLink>
        </div>
        
          <div className="sideNav_logout" onClick={logout}>
            <Tooltip title="LogOut">
              <LogoutIcon />
            </Tooltip>
          </div>
       
      </div>
    );
}

export default SideNav
