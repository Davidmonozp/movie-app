import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '1ad30239a048e1dbafe8b63df129a124';  
const API_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ searchQuery, page = 1, genre = null }) => {
    let url = `${API_URL}/movie/popular`;  

    if (searchQuery) {
      url = `${API_URL}/search/movie`;
    }

    if (genre) {
      url = `${API_URL}/discover/movie`;  
    }

    
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
        query: searchQuery,  
        page: page,          
        with_genres: genre,  
      },
    });

    return response.data;  
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    searchQuery: '',
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addFavorite: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results; 
        state.totalPages = action.payload.total_pages; 
        state.currentPage = action.payload.page;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, addFavorite } = moviesSlice.actions;

export default moviesSlice.reducer;
