import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    searchResults: [],
    selectedMovie: null,
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setMovies, setSelectedMovie, setSearchResults, setLoading, setError } = movieSlice.actions;
export default movieSlice.reducer;
