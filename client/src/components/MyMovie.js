import { Avatar } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import SideNav from "./SideNav";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import UploadIcon from "@mui/icons-material/Upload";
import { UserContext } from "../App";
import MyMovieCard from "./MyMovieCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "rgb(5, 5, 49,0.75)",
  border: "1px solid #fff",
  boxShadow: 24,
  p: 3,
  borderRadius: "15px",
};


function MyMovie() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //  states for form
  const [title, setTitle] = useState("");
  const [year, setYear] = useState();
  const [genres, setGenres] = useState("");
  const [poster, setPoster] = useState("");
  const [contentRating, setCRating] = useState();
  const [duration, setDuration] = useState("");
  const [releaseDate, setRDate] = useState("");
  const [originalTitle, setOTitle] = useState("");
  const [storyline, setStoryLine] = useState("");
  const [actors, setActors] = useState("");
  const [imdbRating, setIMDB] = useState();
  const [uploadErr, setUploadErr] = useState("");
  // const [genAll,setGenAll]=useState([])

  // display my movies
  const [mymovies,setMymovies]=useState([])

  // console.log(state);

  // useEffect(()=>{
  //   if (poster){
    const UploadMovie=()=>{
      if (poster){
        fetch("/createmovie", {
          method: "post",
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
          .then((mov) => {
            if (mov.error) {
              setUploadErr(mov.error);
            } else {

              // upload genres
              fetch("/creategen",{
                method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("movieToken"),
          },
          body: JSON.stringify({
            genres,
          })
        }).then(g=>g.json())
          .then(gen=>{
            if(gen.error){
              console.log(gen.error);
            }
            // else{
            //   setGenAll(gen)
            // }
          })
              navigate("/profile");
              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
       window.location.reload(false)
       setTitle("");
       setYear("");
       setGenres("");
       setPoster("")
       setCRating("");
       setDuration("")
       setRDate("");
       setOTitle("")
       setStoryLine("");
       setActors("");
       setIMDB("");
        }


      }

      useEffect(()=>{
            fetch('/mymovie',{
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("movieToken")
            }
        }).then(res => res.json())
            .then(mymovie => {
                setMymovies(mymovie.mymovies);
            });
      },[])

  // },[poster])

  //  const UploadMovie=()=>{
  //    const data=new FormData()
  //  }

  return (
    <>
      <div className="home">
        <div className="home_nav">
          <SideNav />
        </div>
        <div className="home_body">
          <div className="home_profile">
            <div className="home_profileAv">
              <Avatar />
              <div className="home_profileEmail">
                {state ? state?.email : "not found"}
              </div>
            </div>
            <div className="home_profilePost" onClick={handleOpen}>
              <AddCircleOutlineIcon />
              Post
            </div>
          </div>
          <div className="home_profileMyScroll">
            {mymovies.length === 0 ? (
              <div className="noMovie">no movie uploaded......</div>
            ) : (
              <div className="home_proMyMovies">
                {mymovies.map((mov) => {
                  return (
                    <MyMovieCard
                      id={mov._id}
                      posterP={mov.poster}
                      originalTit={mov.originalTitle}
                      imdb={mov.imdbRating}
                      titleP={mov.title}
                      yearP={mov.year}
                      genresP={mov.genres}
                      cRating={mov.contentRating}
                      durationP={mov.duration}
                      releaseDateP={mov.releaseDate}
                      storylineP={mov.storyline}
                      actorsP={mov.actors}
                      style={style}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
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
              {uploadErr && (
                <div style={{ color: "red", fontSize: "14px" }}>
                  {uploadErr}
                </div>
              )}
              <div className="movilePost_formL">
                <div className="movieInput">
                  <div>Title</div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Year</div>
                  <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>

                <div className="movieInput">
                  <div>Genres</div>
                  <input
                    type="text"
                    placeholder="Genres"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Poster</div>
                  <input
                    type="text"
                    placeholder="Poster"
                    value={poster}
                    onChange={(e) => setPoster(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Content Rating</div>
                  <input
                    type="number"
                    placeholder="Content Rating"
                    value={contentRating}
                    onChange={(e) => setCRating(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Duration</div>
                  <input
                    type="text"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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
                    onChange={(e) => setRDate(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Original Title</div>
                  <input
                    type="text"
                    placeholder="Original Title"
                    value={originalTitle}
                    onChange={(e) => setOTitle(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Storyline</div>
                  <input
                    type="text"
                    placeholder="Storyline"
                    value={storyline}
                    onChange={(e) => setStoryLine(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>Actors</div>
                  <input
                    type="text"
                    placeholder="Actors"
                    value={actors}
                    onChange={(e) => setActors(e.target.value)}
                  />
                </div>
                <div className="movieInput">
                  <div>IMDB Rating</div>
                  <input
                    type="number"
                    placeholder="IMDB Rating"
                    value={imdbRating}
                    onChange={(e) => setIMDB(e.target.value)}
                  />
                </div>
                <Button variant="contained" onClick={UploadMovie}>
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

export default MyMovie;
