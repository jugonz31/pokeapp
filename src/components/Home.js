import React from 'react';
import { Jumbotron, Button, Card, CardText, CardImg, CardBody, CardColumns } from 'reactstrap';
import libraries from '../libraries'
import { Link } from 'react-router-dom'

const librariesList = libraries.map(item => {
    return (
        <Card>
            <CardImg top width="100%" src={item.src} alt={item.title} className="librariesCard" />
            <CardBody>
                <CardText className="text-center text-uppercase text-wrap"><small><b>{item.description}</b></small></CardText>
                <CardText className="text-center">
                    <small className="text-muted"><a href={item.url} rel="noopener noreferrer" target="_blank">CHECK IT</a></small>
                </CardText>
            </CardBody>
        </Card>
    )
})


const Home = () => {
    return (
        <div className="container">
            <br />
            <Jumbotron className="text-center">
                <h1 className="display-3">Welcome to PokéApp!</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                    <Link to="/pokemons">
                        <Button color="secondary">Check the pokemons list</Button>
                    </Link>

                </p>
            </Jumbotron>
            <hr />
            <h3 className="text-center">Some of the libraries that i've used for this:</h3>
            <br />
            <CardColumns className="mb-5">
                {librariesList}
            </CardColumns>
        </div>
    );
};

export default Home;