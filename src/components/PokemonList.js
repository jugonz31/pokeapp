import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, Button, Toast, ToastBody, ToastHeader } from 'reactstrap'
import PokemonCard from './PokemonCard'
import PokemonDetails from './PokemonDetails';
import PokemonComparison from "./PokemonComparison";
import { useSelector, useDispatch } from 'react-redux';
import { SELECT_NEW_POKEMON, SELECT_SAVED_POKEMON, UNSELECT_POKEMON, COMPARE_POKEMON } from "../actions/actions"

function PokemonList(props) {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, loading] = useState(false);
    const [isComparing, comparing] = useState(false);
    const [modal, setModal] = useState(false);
    const [comparisonModal, setComparisonModal] = useState(false);
    const [index, setIndex] = useState(0);
    const [reloader] = useState(0);

    const selectedPokemon = useSelector(state => state.selectedPokemon);
    const pokemonBeingCompared = useSelector(state => state.comparison);
    const savedPokemons = useSelector(state => state.savedPokemons);
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

    const toggle = async (e) => {
        if (isComparing) {
            if (!comparisonModal)
                await getPokemonDetails(e)
            else {
                comparing(false);
                dispatcher({ type: UNSELECT_POKEMON });
            }
            setComparisonModal(!comparisonModal);

        } else {
            if (!modal)
                await getPokemonDetails(e);
            else dispatcher({ type: UNSELECT_POKEMON });
            setModal(!modal);
        }
    }

    const fetchPokemonData = async (id) => {
        var pokemonName = "", pokemonAbilities = "", pokemonStats = [],
            pokemonDescription = "", pokemonGender = "", stat = "",
            pokemonId = (id), pokemonWeight = 0, pokemonHeight = 0;

        await axios.all([
            axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonId),
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + pokemonId)
        ]).then(axios.spread((res1, res2) => {
            pokemonWeight = res1.data.weight;
            pokemonHeight = res1.data.height;
            pokemonName = res1.data.name;
            pokemonDescription = (res2.data.flavor_text_entries[1].flavor_text);
            pokemonGender = ((res2.data.gender_rate < 4) ? (res2.data.gender_rate = -1 ? "Male" : "Undefined") : "Female");

            for (var i = 0; i < res1.data.stats.length; i++) {
                stat = "{ \"name\": \"" + res1.data.stats[i].stat.name + "\", \"power\": \"" + res1.data.stats[i].base_stat + "\" }"
                pokemonStats.push(JSON.parse(stat))
            }

            for (i = 0; i < res1.data.abilities.length; i++) {
                pokemonAbilities += res1.data.abilities[i].ability.name + ", ";
            }

            pokemonAbilities = pokemonAbilities.substr(0, pokemonAbilities.length - 2)
        }));

        return {
            id: pokemonId,
            name: pokemonName,
            weight: pokemonWeight,
            height: pokemonHeight,
            abilities: pokemonAbilities,
            stats: pokemonStats,
            description: pokemonDescription,
            gender: pokemonGender
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
            dispatcher({ type: isComparing ? COMPARE_POKEMON : SELECT_NEW_POKEMON, payload: { selectedPokemon: pokemonData } });
        }
    }

    const handleComparison = () => {
        setModal(false);
        comparing(true);
    }

    const pokemonCards = pokemonList.map((pokemon, index) => {
        if (props.searchInput.length !== 0) {
            if (pokemon.name.includes(props.searchInput)) {
                return (
                    <PokemonCard key={index+1} name={pokemon.name} id={index+1} onClick={toggle}
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
                )
            } else return "";
        }

        return (
            <PokemonCard key={index+1} name={pokemon.name} id={index+1} onClick={toggle}
                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
        )
    });

    return (
        <div>
            {isComparing &&
                <div className="p-3 my-2 rounded bg-docs-transparent-grid position-fixed zindex-popover">
                    <Toast>
                        <ToastHeader>
                            Comparing pokemon
                        </ToastHeader>
                        <ToastBody className="text-uppercase font-weight-bold">
                            {selectedPokemon.name}
                        </ToastBody>
                    </Toast>
                </div>
            }
            <div className="container mt-2 position-relative zindex-dropdown">
                <div className="card-deck justify-content-center">
                    {pokemonCards}
                </div>


                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader className="text-uppercase" toggle={toggle}>
                        <b>{selectedPokemon.name}</b>
                        <Button size="sm" className="ml-2 text-wrap" onClick={handleComparison}>Compare to...</Button>
                    </ModalHeader>
                    {modal &&
                        <PokemonDetails selectedPokemon={selectedPokemon} />
                    }
                </Modal>

                <Modal isOpen={comparisonModal} toggle={toggle}>
                    <ModalHeader className="text-uppercase" toggle={toggle}>
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