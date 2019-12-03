import React, { Component } from 'react';
import { Card, CardImg, CardFooter } from 'reactstrap';

class PokemonCard extends Component {

    render() {
        return (
            <div className="mt-2">
                <Card key={this.props.id} tag="a" style={{ width: "180px" }} onClick={() => this.props.onClick(this)}>
                    <CardImg top width="50%" src={this.props.img}/>
                        <CardFooter className="text-center">{this.props.name}</CardFooter>
                </Card>
            </div >
        );
    }
}

export default PokemonCard;