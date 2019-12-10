import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import { Provider } from 'react-redux'
import store from "./store"

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
          <PokemonList searchInput={searchInput} />
        </Route>
        <Route path="/items">
          <h1 className="ml-4">About</h1>
        </Route>
        <Route path="*">
          <h2 className="mx-2">Page not found</h2>
        </Route>
      </Switch>
    </Provider>
  )
};

export default App;
