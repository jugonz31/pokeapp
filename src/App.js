import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import PokemonList from './components/PokemonList'

function App() {
  const [searchInput, setSearch] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [counter] = useState(0);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => setPokemonList(data.results));
  },[counter])

  const handleChange = e => {
    setSearch(e.target.value);
    console.log(searchInput);
  }

  return (
    <div>
      <Navbar onChange={handleChange} />
      <PokemonList pokemons={pokemonList}/>
    </div>
  )
};

export default App;
