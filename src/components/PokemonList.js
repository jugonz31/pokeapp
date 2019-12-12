import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, Button, Toast, ToastBody, ToastHeader } from 'reactstrap'
import ElementCard from './ElementCard'
import PokemonDetails from './PokemonDetails';
import PokemonComparison from "./PokemonComparison";
import { useSelector, useDispatch } from 'react-redux';
import { SELECT_POKEMON, SELECT_SAVED_POKEMON, UNSELECT_POKEMONS, COMPARE_POKEMON, SAVE_POKEMON } from "../redux/actions/pokemonActions"

function PokemonList(props) {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, loading] = useState(false);
    const [isComparing, comparing] = useState(false);
    const [modal, setModal] = useState(false);
    const [comparisonModal, setComparisonModal] = useState(false);
    const [index, setIndex] = useState(0);
    const [reloader] = useState(0);

    const selectedPokemon = useSelector(state => state.pokemonReducers.selectedPokemon);
    const pokemonBeingCompared = useSelector(state => state.pokemonReducers.comparison);
    const savedPokemons = useSelector(state => state.pokemonReducers.savedPokemons);
    const dispatcher = useDispatch();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(res => setPokemonList(res.data.results));
    }, [reloader])

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
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=" + (newIndex) + "&limit=20");
        setPokemonList([...pokemonList, ...res.data.results]);
        loading(false);
    }

    const modalToggle = async (e) => {
        if (isComparing) {
            if (!comparisonModal)
                await getPokemonDetails(e)
            else {
                comparing(false);
                dispatcher({ type: UNSELECT_POKEMONS });
            }
            setComparisonModal(!comparisonModal);

        } else {
            if (!modal)
                await getPokemonDetails(e);
            else
                dispatcher({ type: UNSELECT_POKEMONS });
            setModal(!modal);
        }
    }

    const getPokemonDetails = async (e) => {
        const cardId = e.props.id
        const savedPokemonsFilter = await savedPokemons.filter(pokemon => (pokemon.id === (cardId)))
        if (savedPokemonsFilter[0] !== undefined) {
            if (isComparing)
                dispatcher({ type: COMPARE_POKEMON, payload: { selectedPokemon: savedPokemonsFilter[0] } })
            else
                dispatcher({ type: SELECT_SAVED_POKEMON, payload: { id: (cardId) } })
        } else {
            const pokemonData = await fetchPokemonData(cardId);
            dispatcher({ type: isComparing ? COMPARE_POKEMON : SELECT_POKEMON, payload: { selectedPokemon: pokemonData } });
            dispatcher({ type: SAVE_POKEMON, payload: { selectedPokemon: pokemonData } })
        }
    }

    const fetchPokemonData = async (id) => {
        var pokemonAbilities = [], pokemonStats = [], pokemonTypes = [], response1, response2

        await axios.all([
            axios.get('https://pokeapi.co/api/v2/pokemon/' + id),
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + id)
        ]).then(axios.spread((res1, res2) => {
            response1 = res1.data;
            response2 = res2.data

            for (var i = 0; i < res1.data.stats.length; i++) {
                pokemonStats.push(JSON.parse(
                    "{ \"name\": \"" + res1.data.stats[i].stat.name + "\", \"power\": \"" + res1.data.stats[i].base_stat + "\" }"
                ))
            }

            for (i = 0; i < res1.data.abilities.length; i++) {
                pokemonAbilities.push(res1.data.abilities[i].ability.name);
            }

            for (i = 0; i < res1.data.types.length; i++) {
                pokemonTypes.push(res1.data.types[i].type.name);
            }
        }));

        return {
            id: id,
            name: response1.name,
            weight: response1.weight,
            height: response1.height,
            abilities: pokemonAbilities,
            types: pokemonTypes,
            stats: pokemonStats,
            description: response2.flavor_text_entries[1].flavor_text,
            gender: ((response1.gender_rate < 4) ? (response1.data.gender_rate = -1 ? "Male" : "Undefined") : "Female"),
            imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
        }
    }

    const pokemonCards = pokemonList.map((pokemon, index) => {
        if (props.searchInput.length !== 0) {
            if (pokemon.name.includes(props.searchInput)) {
                return (
                    <ElementCard key={index + 1} name={pokemon.name} id={index + 1} onClick={modalToggle}
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
                )
            } else return "";
        }

        return (
            <ElementCard key={index + 1} name={pokemon.name} id={index + 1} onClick={modalToggle}
                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
        )
    });

    const handleComparison = () => {
        setModal(false);
        comparing(true);
    }

    return (
        <div>
            <div className="mt-2 container">
                <div className="card-deck justify-content-center">
                    {pokemonCards}
                </div>

                {(isComparing && !comparisonModal) &&
                    <Toast style={{
                        position: "fixed",
                        right: "20px",
                        top: "70px"
                    }}>
                        <ToastHeader>
                            Comparing pokemon
                        </ToastHeader>
                        <ToastBody className="text-uppercase font-weight-bold">
                            {selectedPokemon.name}
                        </ToastBody>
                    </Toast>
                }

                <Modal isOpen={modal} toggle={modalToggle}>
                    <ModalHeader className="text-uppercase" toggle={modalToggle}>
                        <b>{selectedPokemon.name}</b>
                        <Button size="sm" className="ml-2 text-wrap" onClick={handleComparison}>Compare to...</Button>
                    </ModalHeader>
                    {modal &&
                        <PokemonDetails selectedPokemon={selectedPokemon} />
                    }
                </Modal>

                <Modal isOpen={comparisonModal} toggle={modalToggle}>
                    <ModalHeader className="text-uppercase" toggle={modalToggle}>
                        <b>{selectedPokemon.name} vs. {pokemonBeingCompared.name}</b>
                    </ModalHeader>
                    {comparisonModal &&
                        <PokemonComparison pokemon1={selectedPokemon} pokemon2={pokemonBeingCompared} />

                    }
                </Modal>
            </div >
        </div>
    );
}

export default PokemonList;