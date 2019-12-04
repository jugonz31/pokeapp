import React, { useState } from 'react';
import { CardDeck, Modal, ModalHeader } from 'reactstrap'
import PokemonCard from './PokemonCard'
import PokemonDetails from './PokemonDetails';

function PokemonList(props) {
    const pokemons = props.pokemons;
    const [modal, setModal] = useState(false);
    const [selectedPokemon, selectPokemon] = useState("");
    const [description, setDescription] = useState("");
    //const [abilities, setAbilities] = useState("");
    //const [gender, setGender] = useState();

    // const getAbilities = (pokemonData) => {
    //     var str = "";
    //     for (var i = 0; i <= pokemonData.abilities.length; i++) {
    //         str += pokemonData.abilities[i].ability.name;
    //         str += ", "
    //     }
    //     setAbilities(str);
    // }

    const toggle = async (e) => {
        if (!modal) {
            await fetch('https://pokeapi.co/api/v2/pokemon/' + (e.props.id + 1))
                .then(response => response.json())
                .then(data => selectPokemon(data));

            

            await fetch('https://pokeapi.co/api/v2/pokemon-species/' + (e.props.id + 1))
                .then(response => response.json())
                .then(data => setDescription(data.flavor_text_entries[1].flavor_text));
        }
        setModal(!modal);
    }

    const listItem = pokemons.map((pokemon, index) => {
        return (
            <PokemonCard key={index} name={pokemon.name} id={index} onClick={toggle}
                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
        )
    });

    return (
        <div className="container mt-2">
            <CardDeck>
                {listItem}
            </CardDeck>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="text-uppercase" toggle={toggle}><b>{selectedPokemon.name}</b></ModalHeader>
                <PokemonDetails id={selectedPokemon.id} description={description}
                    height={selectedPokemon.height} weight={selectedPokemon.weight} />
            </Modal>
        </div>
    )
}

export default PokemonList;