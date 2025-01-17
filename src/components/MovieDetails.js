// src/components/MovieDetails.js
import React from 'react';
import { useSelector } from 'react-redux';

const MovieDetails = () => {
  const movieDetails = useSelector((state) => state.movies.movieDetails);

  if (!movieDetails) return <div>Select a movie to see details</div>;

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.overview}</p>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Rating: {movieDetails.vote_average}</p>
    </div>
  );
};

export default MovieDetails;
