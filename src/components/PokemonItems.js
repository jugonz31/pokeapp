import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ElementCard from './ElementCard'
import {CardDeck} from 'reactstrap'

export default function PokemonItems() {
  const [itemsList, setitemsList] = useState([]);
  const [reloader] = useState(0);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/item")
      .then(res => setitemsList(res.data.results))
  }, [reloader])

  const itemsCards = itemsList.map((item, index) => {
    return (
      <ElementCard id={index + 1} key={index + 1} img={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + item.name + ".png"} name={item.name} ></ElementCard>
    )
  })
  return (
    <div className="container mt-2">
      <CardDeck className="justify-content-center">
        {itemsCards}

      </CardDeck>
    </div>
  );
}
