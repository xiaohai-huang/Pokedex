import { Route, Switch, Redirect } from "react-router-dom";

import MainPage from "./MainPage";
import PokemonPage from "./PokemonPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/pokemons" render={() => <MainPage />} />
        <Route exact path="/pokemons/:pokemonId" component={PokemonPage} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
