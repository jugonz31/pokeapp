import React, { Component } from 'react';
//import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class PokemonDetails extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h4 className="mt-2">{this.props.name}</h4>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`} width="150px" alt=""/>
                    </div>
                    <div className="col-8">
                        <hr />
                        <p>{this.props.description}descrpition</p>
                        <hr />
                        <table width="100%">
                            <tr>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Gender</th>
                                <th>Abilities</th>
                            </tr>
                            <tr>
                                <td>{this.props.height} m</td>
                                <td>{this.props.weight} kg</td>
                                <td>{this.props.gender}</td>
                                <td>{this.props.abilities}</td>
                            </tr>
                        </table>



                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonDetails;