import { createSlice } from "@reduxjs/toolkit";
import { IImageConfig, IMovieResponse } from "../utils/api";

interface ImovieState {
	url: IImageConfig;
	genres: readonly [];
}

const initialState: ImovieState = {
	url: {
		base_url: "",
		secure_base_url: "",
		backdrop_sizes: [],
		logo_sizes: [],
		poster_sizes: [],
		profile_sizes: [],
		still_sizes: [],
	},
	genres: [],
};

export const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		apiConfiguration: (state, action) => {
			state.url = action.payload;
		},
		getGenres: (state, action) => {
			state.genres = action.payload;
		},
	},
});

export const { apiConfiguration, getGenres } = moviesSlice.actions;

export default moviesSlice.reducer;
