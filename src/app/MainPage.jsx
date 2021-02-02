import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./Header";
import Pokedex from "../features/pokemons/Pokedex";

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: "20px",
  },
});

function MainPage() {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item container className={classes.pokedexContainer}>
        <Grid item xs={1} sm={2} />
        <Grid item xs={10} sm={8}>
          <Pokedex />
        </Grid>
        <Grid item xs={1} sm={2} />
      </Grid>
    </Grid>
  );
}

export default MainPage;
