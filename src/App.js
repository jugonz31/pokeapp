import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import ItemsList from "./components/ItemsList"
import { Provider } from 'react-redux'
import store from "./store"
import Home from './components/Home';

function App() {
  const [searchInput, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.target.value.toLowerCase());
  }

  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/">
          <Navbar onChange={handleChange} />
          <Home />
        </Route>
        <Route exact path="/pokemons">
          <Navbar onChange={handleChange} />
          <PokemonList searchInput={searchInput} />
        </Route>
        <Route path="/items">
          <Navbar onChange={handleChange} />
          <ItemsList searchInput={searchInput}/>
        </Route>
        <Route path="*">
          <h2 className="mx-2">Page not found</h2>
        </Route>
      </Switch>
    </Provider>
  )
};

export default App;
