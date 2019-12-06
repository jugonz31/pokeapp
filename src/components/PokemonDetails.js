import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class PokemonDetails extends Component {
    render() {
        const imgurl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.props.id+".png";

        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img className="mt-4" src={imgurl} width="150px" alt="" />
                    </div>
                    <div className="col-8">
                        <br />
                        <p>{this.props.description}</p>
                        <hr />
                        <table width="100%" >
                            <tbody>
                                <tr>
                                    <th width="30%">Height</th>
                                    <th width="70%">Weight</th>

                                </tr>
                                <tr>
                                    <td>{this.props.height}m</td>
                                    <td>{this.props.weight}kg</td>

                                </tr>
                                <tr></tr>
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
                    <div className="col">
                        <hr />
                        <h5 className="text-center"><b>Stats</b></h5>
                        <ResponsiveContainer width='100%' aspect={5.0/3.0}>
                            <BarChart data={this.props.stats}
                                margin={{ top:10, right: 30, left: 10, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="power" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonDetails;