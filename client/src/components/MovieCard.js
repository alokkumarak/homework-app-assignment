import React from 'react'
import '../css/moviecard.css'

function MovieCard({ poster, imdb, originalTitle }) {
  return (
    <div className="movieCard">
      <img src={poster} alt="movie" />
      <div className="movieCard_disc">
        <div className="movieCard_title">{originalTitle}</div>
        <div className="movieCard_rating">{imdb}</div>
      </div>
    </div>
  );
}

export default MovieCard
