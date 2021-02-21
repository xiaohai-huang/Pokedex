import React from "react";
import { Box, Button, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  numPokemonsUpdated,
  selectNumPokemons,
} from "../features/pokemons/pokemonsSlice";
import Pokedex from "../features/pokemons/Pokedex";

function MainPage() {
  const dispatch = useDispatch();
  let numPokemons = useSelector(selectNumPokemons);

  const showMore = () => {
    // fetch current pokemon number
    numPokemons = numPokemons + 20;
    // update it
    dispatch(numPokemonsUpdated(numPokemons));
  };
  return (
    <Container maxWidth="md">
      <Box pt={3} />
      <Pokedex />
      <Box textAlign="center" m={3}>
        <Button variant="contained" color="primary" onClick={showMore}>
          Show more
        </Button>
      </Box>
    </Container>
  );
}

export default MainPage;
