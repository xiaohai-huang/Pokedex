import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk(
  "/pokemons/fetchPokemons",
  async (_, { getState }) => {
    const numPokemons = selectNumPokemons(getState());
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${numPokemons}`
    );

    const pokemons = response.data.results.map((mon, index) => {
      const id = index + 1;
      return {
        name: mon.name,
        id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });

    return pokemons;
  }
);

const initialState = {
  numPokemons: 20,
  searchQuery: "",
  data: [],
  status: "idle",
  error: null,
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    searchQueryUpdated: (state, action) => {
      state.searchQuery = action.payload;
    },
    numPokemonsUpdated: (state, action) => {
      state.numPokemons = Number(action.payload);
    },
  },
  extraReducers: {
    [fetchPokemons.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "successed";
    },
    [fetchPokemons.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPokemons.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    },
  },
});

export const selectAllPokemons = (state) => state.pokemons.data;

export function selectNumPokemons(state) {
  return state.pokemons.numPokemons;
}

export const selectPokemonsByQuery = (state, query) => {
  return state.pokemons.data.filter((pokemon) => pokemon.name.includes(query));
};

export const selectSearchQuery = (state) => state.pokemons.searchQuery;

export const { searchQueryUpdated, numPokemonsUpdated } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
