import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useVibrant from 'use-vibrant-hook';

const PokemonDetails = (props) => {
    const selectedPokemon = props.selectedPokemon;
    const { colors, done } = useVibrant(selectedPokemon.imageUrl);


    return (
        <div className="container">
            <div className="row">
                <div className="col-4 ">
                    <img className="mt-4" src={selectedPokemon.imageUrl} width="150px" alt="" />
                </div>
                <div className="col-8">
                    <br />
                    <p>{selectedPokemon.description}</p>
                    <hr />
                    <table width="100%" className="mb-1">
                        <tbody>
                            <tr>
                                <th width="30%">Height</th>
                                <th width="30%">Weight</th>
                                <th width="40%">Gender</th>
                            </tr>
                            <tr>
                                <td>{selectedPokemon.height}m</td>
                                <td>{selectedPokemon.weight}kg</td>
                                <td>{selectedPokemon.gender}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" >
                        <tbody>
                            <tr>
                                <th width="50%">Abilities</th>
                                <th width="50%">Type</th>
                            </tr>
                            <tr>
                                <td>
                                    <ul>
                                        {selectedPokemon.abilities.map((ability, index) => <li key={index}>{ability}</li>)}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {selectedPokemon.types.map((type, index) => <li key={index}>{type}</li>)}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col">
                    <hr />
                    <h5 className="text-center"><b>Stats</b></h5>
                    {done &&
                        <ResponsiveContainer width='100%' aspect={5.0 / 3.0}>
                            <BarChart data={selectedPokemon.stats}
                                margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                                <XAxis dataKey="name" tick={{ fontSize: 15 }} />
                                <YAxis tick={{ fontSize: 15 }} />
                                <Tooltip />
                                <Bar dataKey="power" fill={colors.DarkVibrant.hex} />
                            </BarChart>
                        </ResponsiveContainer>
                    }
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;