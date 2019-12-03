import React, { Component } from 'react';
import { CardDeck } from 'reactstrap'
import PokemonCard from './PokemonCard'

class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: []
        };
    }
   
    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(data => this.setState({ pokemons: data.results }));
    }

    render() {
        const listItem = this.state.pokemons.map((pokemon, index) => {
            return (
                <PokemonCard name={pokemon.name} id={index}
                    img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
            )
        });

        return (
            <div className="container mt-2">
                <CardDeck>
                    {listItem}
                </CardDeck>
            </div>
        )
    }

}

export default PokemonList;