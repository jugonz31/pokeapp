import React, { useState, useEffect } from 'react';
import { CardDeck, Modal } from 'reactstrap'
import PokemonCard from './PokemonCard'
import PokemonDetails from './PokemonDetails';

function PokemonList() {

    const [pokemons, setPokemons] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedPokemon, selectPokemon] = useState("");

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(data => setPokemons(data.results));
    })

    const toggle = (e) => {
        setModal(!modal);
        if (!modal) {
            fetch('https://pokeapi.co/api/v2/pokemon/' + (e.props.id + 1))
                .then(response => response.json())
                .then(data => selectPokemon(data));
        }
    }

    const listItem = pokemons.map((pokemon, index) => {
        return (
            <PokemonCard name={pokemon.name} id={index} onClick={toggle}
                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
        )
    });

    return (
        <div className="container mt-2">
            <CardDeck>
                {listItem}
            </CardDeck>
            <Modal isOpen={modal} toggle={toggle}>
                <PokemonDetails name={selectedPokemon.name} id={selectedPokemon.id} height={selectedPokemon.height} weight={selectedPokemon.weight} />
            </Modal>
        </div>
    )
}

export default PokemonList;