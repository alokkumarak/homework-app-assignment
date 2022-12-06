import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import '../css/homeBody.css'
import MovieCard from "../components/MovieCard";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortIcon from "@mui/icons-material/Sort";
import { Tooltip } from '@mui/material';

function HomeBody() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [allMovie,setAllMovie]=useState([]);
   
    const [genAll,setGenAll]=useState([])

    // create searching sorting filter by genres
    const [sort, setSort] = useState({ sort: "-createdAt", order: "desc" });
    const [filterGenre, setFilterGenre] = useState("");
    const [search, setSearch] = useState("");
  
    useEffect(() => {
      // genre=${filterGenre}
      fetch(
        `/allmovie?&sort=${sort.sort},${sort.order}&search=${search}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("movieToken"),
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setAllMovie(result.movies);
          // console.log(result.movies);
        });
      fetch("/allgenres", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("movieToken"),
        },
      })
        .then((res) => res.json())
        .then((gen) => {
          // console.log(gen)
          setGenAll(gen.gen);
        });
    }, [sort, filterGenre, search]);

     const onSelectChange = ({ currentTarget: input }) => {
       setSort({ sort: input.value, order: sort.order });
     };

     const onArrowChange = () => {
       if (sort.order === "asc") {
         setSort({ sort: sort.sort, order: "desc" });
       } else {
         setSort({ sort: sort.sort, order: "asc" });
       }
     };

    //  const onChange = ({ currentTarget: input }) => {
    //    if (input.checked) {
    //      const state = [...filterGenre, input.value];
    //      setFilterGenre(state);
         
    //    } else {
    //      const state = filterGenre.filter((val) => val !== input.value);
    //      setFilterGenre(state);
    //      console.log(filterGenre);
    //    }
    //  };


    return (
      <>
        <div className="homeBody">
          <div className="homeBody_search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="homeBody_bottom">
            <div className="homeBody_bottomNav">
              <div className="homeBody_BNTitle">GENRES</div>
              <div className="homeBody_Genres">
                <div
                  className="homeBody_GenresV"
                  onClick={() => setFilterGenre("")}
                >
                  All
                </div>
                {genAll.map((gen) => {
                  return (
                    <div
                      key={gen.genres}
                      className="homeBody_GenresV"
                      onClick={() => setFilterGenre(gen.genres)}
                    >
                      {gen.genres}
                    </div>
                  );
                })}

               

              
              </div>
            </div>
            <div className="homeBody_bottomR">
              <div className="homeBody_BRHeader">
                <div className="homeBody_BRList">{allMovie.length} Movies</div>
                <div className="homeBody_BRFilter">
                  SORT BY:
                  <div className="dropdown">
                    <select
                      onChange={onSelectChange}
                      className="select_style"
                      defaultValue={sort.sort}
                    >
                      <option value="createdAt">latest</option>
                      <option value="imdbRating">IMDB Rating</option>
                      <option value="year">year</option>
                    </select>
                    <Tooltip title="asc & desc">
                    <div className="arrowButtons" onClick={onArrowChange}>
                      {/* <Tooltip title="asc & desc"> <SortIcon /></Tooltip> */}
                      <SortIcon />
                      {/* <p className="arrow_upButton">&uarr;</p>
                      <p className="arrow_downButton">&darr;</p> */}
                    </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="homeBody_Scroll">
                <div className="homeBody_movies">
                  {allMovie.map((mov) => {
                    return (
                      <MovieCard
                      key={mov._id}
                        poster={mov.poster}
                        imdb={mov.imdbRating}
                        originalTitle={mov.originalTitle}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Menu
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
        </Menu> */}
      </>
    );
}

export default HomeBody
