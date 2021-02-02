import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  numPokemonsUpdated,
  selectNumPokemons,
} from "../features/pokemons/pokemonsSlice";

function SettingsPage() {
  const dispatch = useDispatch();
  const numPokemonsState = useSelector(selectNumPokemons);
  const [numPokemons, setNumPokemons] = useState(numPokemonsState);
  const history = useHistory();

  const handleSaveClicked = () => {
    dispatch(numPokemonsUpdated(numPokemons));
    history.push("/pokemons");
  };
  return (
    <Container maxWidth="sm">
      <Grid conatiner direction="column">
        <Grid item>
          <Typography variant="h3">Pokedex Settings</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="standard-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={numPokemons}
            onChange={(e) => setNumPokemons(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClicked}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SettingsPage;
