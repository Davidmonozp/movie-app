import React from 'react';
import './MovieList.css';

const MovieList = ({ movies, isLoading, error, onMovieSelect }) => {
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (movies.length === 0) return <div>! No se encontraron películas con ese nombre !</div>;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => onMovieSelect(movie)} 
        >
          <h3>{movie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
