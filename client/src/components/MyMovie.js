import { Avatar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import "../css/home.css";
import MovieCard from "./MovieCard";
import SideNav from "./SideNav";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function MyMovie() {
  const [more, setMore] = useState(false);
  return (
    <div className="home">
      <div className="home_nav">
        <SideNav />
      </div>
      <div className="home_body">
        <div className="home_profile">
          <div className="home_profileAv">
            <Avatar />
            <div className="home_profileEmail">alok.kumar@gmail.com</div>
          </div>
          <div className="home_profilePost">
            <AddCircleOutlineIcon />
            Post
          </div>
        </div>
        <div className="home_profileMyScroll">
          <div className="home_proMyMovies">
            <div
              className="profile_hover"
              onMouseOver={() => setMore(true)}
              onMouseLeave={() => setMore(false)}
            >
              <MovieCard />
              {more && (
                <div className="profile_extraIcons">
                  <Tooltip title="Edit">
                    <div className="profile_extraIcon">
                      <EditIcon />
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <div className="profile_extraIcon">
                      <DeleteIcon />
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>

            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyMovie;
