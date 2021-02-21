import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import MainPage from "./app/MainPage";
import SettingsPage from "./app/SettingsPage";
import PokemonPage from "./features/pokemons/PokemonPage";
import { selectColorMode } from "./features/app/appSlice";
import Header from "./app/Header";

function App() {
  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
    },
  });
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const colorMode = useSelector(selectColorMode);
  const theme = colorMode === "light" ? lightTheme : darkTheme;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />

        <Switch>
          <Redirect exact from="/" to="/pokemons" />
          <Route exact path="/pokemons" render={() => <MainPage />} />
          <Route exact path="/pokemons/settings">
            <SettingsPage />
          </Route>
          <Route exact path="/pokemons/:pokemonId">
            <PokemonPage />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
