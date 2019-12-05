import React, { useState } from 'react';
import axios from 'axios';
import { CardDeck, Modal, ModalHeader } from 'reactstrap'
import PokemonCard from './PokemonCard'
import PokemonDetails from './PokemonDetails';

function PokemonList(props) {
    const pokemons = props.pokemons;
    const [modal, setModal] = useState(false);
    const [selectedPokemon, selectPokemon] = useState("");
    const [description, setDescription] = useState("");
    const [abilities, setAbilities] = useState("");
    const [gender, setGender] = useState("")
    const [stats, setStats] = useState([])

    const getPokemonDetails = async (e) => {
        var str = "", arrstr = "", chartData = [];
        await axios.get('https://pokeapi.co/api/v2/pokemon/' + (e.props.id + 1))
            .then(res => {
                for (var i = 0; i < res.data.abilities.length; i++) {
                    str += res.data.abilities[i].ability.name;
                    str += ", "
                }
                str = str.substr(0, str.length - 2)

                for (i = 0; i < res.data.stats.length; i++) {
                    arrstr = "{ \"name\": \"" + res.data.stats[i].stat.name + "\", \"power\": \"" + res.data.stats[i].base_stat + "\" }"
                    chartData.push(JSON.parse(arrstr))
                }

                setStats(chartData);
                setAbilities(str);
                selectPokemon(res.data);
            })

        await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + (e.props.id + 1))
            .then(res => {
                setDescription(res.data.flavor_text_entries[1].flavor_text);
                setGender((res.data.gender_rate < 4) ? (res.data.gender_rate = -1 ? "Male" : "Undefined") : "Female")
            })
    }

    const toggle = async (e) => {
        if (!modal) {
            await getPokemonDetails(e);
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
                <PokemonDetails id={selectedPokemon.id} description={description} stats={stats}
                    height={selectedPokemon.height} weight={selectedPokemon.weight} abilities={abilities} gender={gender} />
            </Modal>
        </div>
    )
}

export default PokemonList;