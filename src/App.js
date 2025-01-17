import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setSearchQuery } from './features/movies/moviesSlice';
import MovieList from './components/MovieList';
import './styles.css';

const genres = [
  { id: 28, name: 'Acción' },
  { id: 12, name: 'Aventura' },
  { id: 16, name: 'Animación' },
  { id: 35, name: 'Comedia' },
  { id: 80, name: 'Crimen' },
  { id: 99, name: 'Documental' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Terror' },
  { id: 10402, name: 'Música' },
  { id: 10749, name: 'Romántico' },
  { id: 878, name: 'Ciencia Ficción' },
  { id: 53, name: 'Suspenso' },
  { id: 10752, name: 'Bélica' },
  { id: 37, name: 'Western' },
];

const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const isLoading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const movieBannerRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchMovies({ searchQuery, page: currentPage }));
    } else if (selectedGenre) {
      dispatch(fetchMovies({ searchQuery, genre: selectedGenre, page: currentPage }));
    } else {
      dispatch(fetchMovies({ searchQuery, page: currentPage }));
    }
  }, [dispatch, searchQuery, selectedGenre, currentPage]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    if (e.target.value !== '') {
      setSelectedGenre(null); 
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    if (movieBannerRef.current) {
      movieBannerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId); 
    dispatch(setSearchQuery('')); 
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); 
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genre_ids.includes(selectedGenre) : true;
    const matchesSearchQuery = searchQuery
      ? movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesGenre && matchesSearchQuery;
  });

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>QUICKBET</h2>
          <h6 className="subtitulo-logo">MOVIES</h6>
        </div>
      </nav>

      {selectedMovie && (
        <div className="movie-banner" ref={movieBannerRef}>
          <h2>{selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title}
          />
          <p>{selectedMovie.overview}</p>

          {/* Imagen adicional en forma de tarjeta */}
          <div className="image-additional">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
              alt={selectedMovie.title}
            />            
          </div>         
        </div>
      )}

      <aside className="sidebar">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar película..."
          />
        </div>

        <h2>Géneros</h2>
        <ul className="genre-list">
          {genres.map((genre) => (
            <li
              key={genre.id}
              className={selectedGenre === genre.id ? 'selected' : ''}
              onClick={() => handleGenreSelect(genre.id)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </aside>

      <div className="main-content">
        <MovieList
          movies={filteredMovies}
          isLoading={isLoading}
          error={error}
          onMovieSelect={handleMovieSelect}
        />

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button onClick={handleNextPage}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
