import { configureStore } from "@reduxjs/toolkit";

import pokemonsReducer from "../features/pokemons/pokemonsSlice";
import appReducer from "../features/app/appSlice";

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    app: appReducer,
  },
});
