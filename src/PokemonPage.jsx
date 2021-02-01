import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

function PokemonPage() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState("idle");
  const history = useHistory();

  useEffect(() => {
    setStatus("loading");

    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        let mon = {
          height: data.height,
          weight: data.weight,
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default,
          imageUrl: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
          types: [],
          speciesUrl: data.species.url,
        };

        Object.entries(data.types).forEach(([_, value]) =>
          mon.types.push(value.type.name)
        );
        setPokemon(mon);
        setStatus("successed");
      } catch (error) {
        setStatus("error");
      }
    };
    fetchPokemon();
  }, [pokemonId]);
  let content;
  if (status === "loading") {
    content = <CircularProgress />;
  } else if (status === "error") {
    content = (
      <Typography variant="h3">Sorry, cannot find the pokemon...</Typography>
    );
  } else if (status === "successed") {
    content = (
      <>
        I am a Pokemon with ID {pokemonId}.
        <Typography variant="h3">{`${pokemon.id}. ${pokemon.name}`}</Typography>
        <img
          style={{ width: "300px", height: "300px" }}
          alt={pokemon.name}
          src={pokemon.imageUrl}
        />
        <Typography variant="h4">Pokemon Info</Typography>
        <Typography>Height: {pokemon.height}</Typography>
        <Typography>Weight: {pokemon.weight}</Typography>
        <Typography variant="h5">Types:</Typography>
        {pokemon.types.map((type, index) => (
          <Typography key={index}> {type} </Typography>
        ))}
      </>
    );
  }

  return (
    <Grid container direction="column" alignContent="center">
      <Grid item sm={2} />
      <>
        {content}
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/pokemons")}
        >
          Go Back to Pokedex
        </Button>
      </>
      <Grid item sm={2} />
    </Grid>
  );
}

export default PokemonPage;
