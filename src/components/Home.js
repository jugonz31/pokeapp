import React from 'react';
import { Jumbotron, Button, CardDeck } from 'reactstrap';
import libraries from '../libraries'
import { Link } from 'react-router-dom'
import ElementCard from './ElementCard';

const librariesList = libraries.map((item, index) => {
    return (
        <ElementCard id={index} key={index} img={item.src} name={item.title}/>
    )
})


const Home = () => {
    return (
        <div className="container">
            <br />
            <Jumbotron className="text-center">
                <h1 className="display-3">Welcome to PokéApp!</h1>
                <p>All the information comes from <a href="https://pokeapi.co">PokéApi</a> by HTTP requests.</p>
                <p className="lead">
                    <Link to="/pokemons">
                        <Button className="mr-2" color="secondary">Check the Pokémon list</Button>
                    </Link>
                    <Link to="/items">
                        <Button color="secondary">Check the items list</Button>
                    </Link>

                </p>
            </Jumbotron>
            <hr />
            <h4 className="text-center">Some of the libraries that i've used for this:</h4>
            <br />
            <CardDeck className="justify-content-center">
                {librariesList}
            </CardDeck>
        </div>
    );
};

export default Home;