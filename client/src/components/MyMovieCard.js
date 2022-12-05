import { Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/moviecard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import UploadIcon from "@mui/icons-material/Upload";


function MyMovieCard({
  id,
  posterP,
  originalTit,
  imdb,
  titleP,
  yearP,
  genresP,
  cRating,
  durationP,
  releaseDateP,
  storylineP,
  actorsP,
  style,
}) {
  const [more, setMore] = useState(false);
  const navigate = useNavigate();
  const [title, setTitleU] = useState(titleP);
  const [year, setYearU] = useState(yearP);
  const [genres, setGenresU] = useState(genresP);
  const [poster, setPosterU] = useState(posterP);
  const [contentRating, setCRatingU] = useState(cRating);
  const [duration, setDurationU] = useState(durationP);
  const [releaseDate, setRDateU] = useState(releaseDateP);
  const [originalTitle, setOTitleU] = useState(originalTit);
  const [storyline, setStoryLineU] = useState(storylineP);
  const [actors, setActorsU] = useState(actorsP);
  const [imdbRating, setIMDBU] = useState(imdb);

  //   for open modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteMovie = () => {
    fetch(`/deletemovie/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("movieToken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("error in delete", err);
      });
    window.location.reload(false);
  };

  const EditMovie = () => {
    fetch(`/updatemovie/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("movieToken"),
      },
      body: JSON.stringify({
        title,
        year,
        genres,
        poster,
        contentRating,
        duration,
        releaseDate,
        originalTitle,
        storyline,
        actors,
        imdbRating,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.log(result.error);
        } else {
        //   navigate("/profile");
          console.log(result);
          setTitleU("");
          setYearU("");
          setGenresU("");
          setPosterU("");
          setCRatingU("");
          setDurationU("");
          setRDateU("");
          setOTitleU("");
          setStoryLineU("");
          setActorsU("");
          setIMDBU("");
           window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
   
    
  };

  return (
    <>
      <div
        className="profile_hover"
        onMouseOver={() => setMore(true)}
        onMouseLeave={() => setMore(false)}
      >
        <div className="movieCard">
          <img src={posterP} alt="movie" />
          <div className="movieCard_disc">
            <div className="movieCard_title">{originalTit}</div>
            <div className="movieCard_rating">{imdb}</div>
          </div>
        </div>
        {more && (
          <div className="profile_extraIcons">
            <Tooltip title="Edit">
              <div className="profile_extraIcon" onClick={handleOpen}>
                <EditIcon />
              </div>
            </Tooltip>
            <Tooltip title="Delete">
              <div className="profile_extraIcon" onClick={deleteMovie}>
                <DeleteIcon />
              </div>
            </Tooltip>
          </div>
        )}
      </div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="moviePost">
            <div className="moviePost_title">
              <div>My Movie</div>
              <CloseIcon onClick={handleClose} />
            </div>
            <form className="moviePost_form">
              {/* {uploadErr && (
                <div style={{ color: "red", fontSize: "14px" }}>
                  {uploadErr}
                </div>
              )} */}
              <div className="movilePost_formL">
                <div className="movieInput">
                  <div>Title</div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitleU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Year</div>
                  <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYearU(e.target.value)}
                  />
                </div>

                <div className="movieInput">
                  <div>Genres</div>
                  <input
                    type="text"
                    placeholder="Genres"
                    value={genres}
                    onChange={(e) => setGenresU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Poster</div>
                  <input
                    type="text"
                    placeholder="Poster"
                    value={poster}
                    onChange={(e) => setPosterU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Content Rating</div>
                  <input
                    type="number"
                    placeholder="Content Rating"
                    value={contentRating}
                    onChange={(e) => setCRatingU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Duration</div>
                  <input
                    type="text"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDurationU(e.target.value)}
                  />
                </div>
              </div>
              <div className="movilePost_formL">
                <div className="movieInput">
                  <div>Release Date</div>
                  <input
                    type="text"
                    placeholder="Release Date"
                    value={releaseDate}
                    onChange={(e) => setRDateU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Original Title</div>
                  <input
                    type="text"
                    placeholder="Original Title"
                    value={originalTitle}
                    onChange={(e) => setOTitleU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Storyline</div>
                  <input
                    type="text"
                    placeholder="Storyline"
                    value={storyline}
                    onChange={(e) => setStoryLineU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Actors</div>
                  <input
                    type="text"
                    placeholder="Actors"
                    value={actors}
                    onChange={(e) => setActorsU(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>IMDB Rating</div>
                  <input
                    type="number"
                    placeholder="IMDB Rating"
                    value={imdbRating}
                    onChange={(e) => setIMDBU(e.target.value)}
                  />
                </div>
                <Button variant="contained" onClick={EditMovie}>
                  <UploadIcon />
                  Upload
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default MyMovieCard
