import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { Box, IconButton, Tooltip } from "@material-ui/core";
import { useHistory, Link as RouterLink } from "react-router-dom";

import { searchQueryUpdated } from "../features/pokemons/pokemonsSlice";
import { selectColorMode, colorModeUpdated } from "../features/app/appSlice";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textDecoration: "none",
  },
  space: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      width: "100%",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState("");

  const colorMode = useSelector(selectColorMode);

  useEffect(() => {
    dispatch(searchQueryUpdated(query));
  }, [query, dispatch]);

  const handleSettingsClicked = () => {
    history.push("/pokemons/settings");
  };

  const handleColorModeClicked = () => {
    if (colorMode === "light") {
      dispatch(colorModeUpdated("dark"));
    } else if (colorMode === "dark") {
      dispatch(colorModeUpdated("light"));
    }
  };

  const colorModeToggler =
    colorMode === "light" ? (
      <Brightness7Icon fontSize="inherit" />
    ) : (
      <Brightness4Icon fontSize="inherit" />
    );

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.title}
          color="inherit"
          variant="h6"
          component={RouterLink}
          to="/"
        >
          Pokemon
        </Typography>

        <Box className={classes.space} />

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Tooltip title="Settings">
          <IconButton color="inherit" onClick={handleSettingsClicked}>
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle light/dark theme">
          <IconButton color="inherit" onClick={handleColorModeClicked}>
            {colorModeToggler}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
