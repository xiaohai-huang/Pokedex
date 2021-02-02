import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPokemons,
  selectSearchQuery,
  selectAllPokemons,
  selectNumPokemons,
} from "./pokemonsSlice";
import PokemonCard from "./PokemonCard";
import { CircularProgress, Typography } from "@material-ui/core";

function Pokedex() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const pokemons = useSelector(selectAllPokemons);
  const numPokemons = useSelector(selectNumPokemons);
  const status = useSelector((state) => state.pokemons.status);
  const error = useSelector((state) => state.pokemons.error);

  // retrieve data from poke API
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemons());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [numPokemons, dispatch]);

  let content;

  if (status === "successed") {
    content = pokemons.map(
      (pokemon) =>
        pokemon.name.includes(searchQuery) && (
          <Grid key={pokemon.id} item xs={12} sm={6} md={4}>
            <PokemonCard {...pokemon} />
          </Grid>
        )
    );
  } else if (status === "loading") {
    content = <CircularProgress color="secondary" />;
  } else if (error) {
    content = <Typography variant="h3">Cannot find pokemons...</Typography>;
  }

  return (
    <Grid container spacing={3} justify="center">
      {content}
    </Grid>
  );
}

export default Pokedex;
