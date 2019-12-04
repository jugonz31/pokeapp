import React, { Component } from 'react';
//import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class PokemonDetails extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img className="mt-4" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`} width="150px" alt="" />
                    </div>
                    <div className="col-8">
                        <br />
                        <p>{this.props.description}</p>
                        <hr />
                        <table width="100%" className="mb-3">
                            <tbody>
                                <tr>
                                    <th>Height</th>
                                    <th>Weight</th>

                                </tr>
                                <tr>
                                    <td>{this.props.height}m</td>
                                    <td>{this.props.weight}kg</td>

                                </tr>
                                <tr></tr>
                                <tr>
                                    <th>Gender</th>
                                    <th>Abilities</th>
                                </tr>
                                <tr>
                                    <td>{this.props.gender}</td>
                                    <td>{this.props.abilities}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonDetails;