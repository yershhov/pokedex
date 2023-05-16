import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemons } from "../api/service";

interface PokemonsState {
  pokemonsState: string;
  pokemons?: any;
  previewingPokemonDetails?: any;
  previewingPokemonIndex?: number;
  lastFetchQuery?: string;
}

const initialState: PokemonsState = {
  pokemonsState: "idle",
};

export const fetchPokemons = createAsyncThunk(
  "cats/fetchCats",
  async (query: string) => {
    const pokemons = await getPokemons(query);
    return pokemons;
  }
);

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    pokemonsSetPreviewingPokemon: (state, action) => {
      state.previewingPokemonDetails = action.payload;
    },
    pokemonsSetPreviewingPokemonIndex: (state, action) => {
      state.previewingPokemonIndex = action.payload;
    },
    pokemonsFilterByNames: (state, action) => {
      state.pokemons.results = state.pokemons.results.filter((item: any) =>
        action.payload.includes(item.name)
      );
    },
    pokemonsSetLastPerformedQuery: (state, action) => {
      state.lastFetchQuery = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPokemons.pending, (state, _) => {
        state.pokemonsState = "pending";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.pokemons = action.payload;
        state.pokemonsState = "fulfilled";
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        console.error(action.payload);
        state.pokemonsState = "error";
      });
  },
});

export const {
  pokemonsSetPreviewingPokemon,
  pokemonsSetPreviewingPokemonIndex,
  pokemonsFilterByNames,
  pokemonsSetLastPerformedQuery,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
