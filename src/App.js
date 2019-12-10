import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import {Provider} from 'react-redux'
import store from "./store"

function App() {
  const [searchInput, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.target.value.toLowerCase());
  }

  return (
    <Provider store={store}>
      <Navbar onChange={handleChange} />
      <PokemonList searchInput={searchInput}/>
    </Provider>
  )
};

export default App;
