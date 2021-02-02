import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 180,
  },
  media: {
    minHeight: 180,
    [theme.breakpoints.down("xs")]: {
      minHeight: 280,
    },
  },
  pokemonName: {
    textAlign: "center",
  },
}));

export default function PokemonCard(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/pokemons/${props.id}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imageUrl}
          title={props.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.pokemonName}
          >
            {props.id}. {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
