import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import '../css/homeBody.css'
import MovieCard from "../components/MovieCard";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


function HomeBody() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <div className="homeBody">
          <div className="homeBody_search">
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>
          <div className="homeBody_bottom">
            <div className="homeBody_bottomNav">
              <div className="homeBody_BNTitle">GENRES</div>
              <div className="homeBody_Genres">
                <div className="homeBody_GenresV">All</div>
                <div className="homeBody_GenresV">Action</div>
                <div className="homeBody_GenresV">Adventure</div>
                <div className="homeBody_GenresV">Action</div>
                <div className="homeBody_GenresV">Action</div>
                <div className="homeBody_GenresV">Adventure</div>
                <div className="homeBody_GenresV">Action</div>
                <div className="homeBody_GenresV">Adventure</div>
                <div className="homeBody_GenresV">Action</div>
                <div className="homeBody_GenresV">Adventure</div>
                <div className="homeBody_GenresV">Action</div>
                <div className="homeBody_GenresV">Adventure</div>
                <div className="homeBody_GenresV">Action</div>
              </div>
            </div>
            <div className="homeBody_bottomR">
              <div className="homeBody_BRHeader">
                <div className="homeBody_BRList">24 Movies</div>
                <div className="homeBody_BRFilter">
                  SORT BY:
                  <div
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="dropdown"
                  >
                    latest <KeyboardArrowDownIcon style={{marginLeft:"auto"}} />
                  </div>
                </div>
              </div>
              <div className="homeBody_Scroll">
                <div className="homeBody_movies">
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
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </>
    );
}

export default HomeBody
