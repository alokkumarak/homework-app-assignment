import React from 'react'
import movieImg from '../assets/one.jpg'
import '../css/moviecard.css'

function MovieCard() {
    return (
      <div className="movieCard">
        <img src={movieImg} alt="movie" />
        <div className="movieCard_disc">
          <div className="movieCard_title">
            Avengers EndGame
          </div>
          <div className="movieCard_rating">9.2</div>
        </div>
      </div>
    );
}

export default MovieCard
