// src/store/gamesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../types';

interface GamesState {
    games: Game[];
    favourites: number[];
}

const initialState: GamesState = {
    games: [],
    favourites: [],
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames(state, action: PayloadAction<Game[]>) {
            state.games = action.payload;
        },
        toggleFavourite(state, action: PayloadAction<number>) {
            if (state.favourites.includes(action.payload)) {
                state.favourites = state.favourites.filter(id => id !== action.payload);
            } else {
                state.favourites.push(action.payload);
            }
        },
    },
});

export const { setGames, toggleFavourite } = gamesSlice.actions;
export default gamesSlice.reducer;
