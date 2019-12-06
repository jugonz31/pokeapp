import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardDeck, Modal, ModalHeader } from 'reactstrap'
import PokemonCard from './PokemonCard'
import PokemonDetails from './PokemonDetails';
import debounce from "lodash.debounce";

function PokemonList(props) {
    const [pokemonList, setPokemonList] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedPokemon, selectPokemon] = useState("");
    const [description, setDescription] = useState("");
    const [abilities, setAbilities] = useState("");
    const [gender, setGender] = useState("");
    const [stats, setStats] = useState([]);
    const [counter] = useState(0);
    const [isLoading, loading] = useState(false);
    const [index, setIndex] = useState(0);

    window.onscroll = debounce(() => {
        if (isLoading) return;

        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            loadUsers();
        }
    }, 1000);

    const loadUsers = async () => {
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
    }, [counter])

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


    const listItem = pokemonList.map((pokemon, index) => {
        if (props.searchInput.length !== 0) {
            if (pokemon.name.includes(props.searchInput)) {
                return (
                    <PokemonCard key={index} name={pokemon.name} id={index} onClick={toggle}
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
                )
            } else return("");
        }
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