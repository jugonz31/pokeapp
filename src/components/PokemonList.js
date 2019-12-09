import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalHeader } from 'reactstrap'
import PokemonCard from './PokemonCard'
import PokemonDetails from './PokemonDetails';

function PokemonList(props) {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, selectPokemon] = useState("");
    const [modal, setModal] = useState(false);
    const [reloader] = useState(0);
    const [isLoading, loading] = useState(false);
    const [index, setIndex] = useState(0);

    window.onscroll = (() => {
        if (isLoading) return;
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadPokemons();
        }
    });

    const loadPokemons = async () => {
        loading(true);
        const newIndex = index + 20;
        setIndex(newIndex);
        const reqstr = "https://pokeapi.co/api/v2/pokemon?offset=" + (newIndex) + "&limit=20";
        const res = await axios.get(reqstr);
        setPokemonList([...pokemonList, ...res.data.results]);
        loading(false);
    }

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(res => setPokemonList(res.data.results));
    }, [reloader])

    const getPokemonDetails = async (e) => {
        var pokemonName = "", pokemonAbilities = "", pokemonStats = [],
            pokemonDescription = "", pokemonGender = "", stat = "",
            pokemonId = 0, pokemonWeight = 0, pokemonHeight = 0;

        await axios.get('https://pokeapi.co/api/v2/pokemon/' + (e.props.id + 1))
            .then(res => {
                pokemonId = res.data.id;
                pokemonWeight = res.data.weight;
                pokemonHeight = res.data.height;
                pokemonName = res.data.name;
                for (var i = 0; i < res.data.abilities.length; i++) {
                    pokemonAbilities += res.data.abilities[i].ability.name + ", ";
                }
                pokemonAbilities = pokemonAbilities.substr(0, pokemonAbilities.length - 2)

                for (i = 0; i < res.data.stats.length; i++) {
                    stat = "{ \"name\": \"" + res.data.stats[i].stat.name + "\", \"power\": \"" + res.data.stats[i].base_stat + "\" }"
                    pokemonStats.push(JSON.parse(stat))
                }
            })

        await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + (e.props.id + 1))
            .then(res => {
                pokemonDescription = (res.data.flavor_text_entries[1].flavor_text);
                pokemonGender = ((res.data.gender_rate < 4) ? (res.data.gender_rate = -1 ? "Male" : "Undefined") : "Female");
            })


        await selectPokemon({
            id: pokemonId,
            name: pokemonName,
            weight: pokemonWeight,
            height: pokemonHeight,
            abilities: pokemonAbilities,
            stats: pokemonStats,
            description: pokemonDescription,
            gender: pokemonGender
        });

        console.log(selectedPokemon)
    }

    const toggle = async (e) => {
        if (!modal) {
            await getPokemonDetails(e);
        }
        setModal(!modal);
    }


    const listItem = pokemonList.map((pokemon, index) => {
        if (props.searchInput.length !== 0) {
            if (pokemon.name.includes(props.searchInput)) {
                return (
                    <PokemonCard key={index} name={pokemon.name} id={index} onClick={toggle}
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
                )
            } else return ("");
        }
        return (
            <PokemonCard key={index} name={pokemon.name} id={index} onClick={toggle}
                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
        )

    });

    return (
        <div className="container mt-2">
            <div className="card-deck justify-content-center">
                {listItem}
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="text-uppercase" toggle={toggle}><b>{selectedPokemon.name}</b></ModalHeader>
                <PokemonDetails id={selectedPokemon.id} description={selectedPokemon.description} stats={selectedPokemon.stats}
                    height={selectedPokemon.height} weight={selectedPokemon.weight} abilities={selectedPokemon.abilities} gender={selectedPokemon.gender} />
            </Modal>
        </div>
    )
}

export default PokemonList;