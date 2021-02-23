import { configureStore } from "@reduxjs/toolkit";

import pokemonsReducer from "../features/pokemons/pokemonsSlice";
import appReducer from "../features/app/appSlice";
import { loadState, saveState } from "./localstorage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    app: appReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    app: store.getState().app,
    pokemons: store.getState().pokemons,
  });
});

export default store;
