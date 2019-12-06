import React, { useState } from 'react';
import Navbar from './components/Navbar'
import PokemonList from './components/PokemonList'

function App() {
  const [searchInput, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.target.value);
    console.log(searchInput);
  }

  return (
    <div>
      <Navbar onChange={handleChange} />
      <PokemonList searchInput={searchInput}/>
    </div>
  )
};

export default App;
