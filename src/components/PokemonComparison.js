import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useVibrant from 'use-vibrant-hook';

const PokemonComparison = (props) => {
    const pokemon1 = props.pokemon1, pokemon2 = props.pokemon2;
    const { colors, done } = useVibrant(pokemon1.imageUrl);

    const comparisonStats = () => {
        var arr = []
        for (var i = 0; i < pokemon1.stats.length; i++) {
            var str = "{\"name\": \"" + pokemon1.stats[i].name + "\", \"" + pokemon1.name
                + "\": \"" + pokemon1.stats[i].power + "\", \"" + pokemon2.name + "\": \""
                + pokemon2.stats[i].power + "\" }"
            arr.push(JSON.parse(str));
        }
        return arr;
    }

    const stats = comparisonStats();

    return (
        <div className="container">
            <div className="row mx-auto">
                <div className="col-6 center-block text-center mx-auto">
                    <img className="mt-4" src={pokemon1.imageUrl} width="150px" alt="" />
                </div>
                <div className="col-6 center-block text-center mx-auto">
                    <img className="mt-4" src={pokemon2.imageUrl} width="150px" alt="" />
                </div>
            </div>
            <hr />
            <table width="100%" className="text-center comparison-table mx-auto">
                <tbody>
                    <tr>
                        <td width="38%">{pokemon1.height}m</td>
                        <th width="24%">Height</th>
                        <td width="38%">{pokemon2.height}m</td>
                    </tr>
                    <tr>
                        <td>{pokemon1.weight}kg</td>
                        <th>Weight</th>
                        <td>{pokemon2.weight}kg</td>
                    </tr>
                    <tr>
                        <td>{pokemon1.gender}</td>
                        <th>Gender</th>
                        <td>{pokemon2.gender}</td>
                    </tr>
                    <tr>
                        <td>
                            {pokemon1.abilities.map((ability) => <div>{ability}</div>)}
                        </td>
                        <th>Abilities</th>
                        <td>
                            {pokemon2.abilities.map((ability) => <div>{ability}</div>)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="col">
                <hr />
                <h5 className="text-center"><b>Stats</b></h5>
                {done &&
                    <ResponsiveContainer width='100%' aspect={5.0 / 3.0}>
                        <BarChart data={stats}
                            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                            <XAxis dataKey="name" tick={{ fontSize: 15 }} />
                            <YAxis tick={{ fontSize: 15 }} />
                            <Tooltip />
                            <Bar dataKey={pokemon1.name} fill={colors.DarkVibrant.hex} />
                            <Bar dataKey={pokemon2.name} fill={colors.Vibrant.hex} />
                        </BarChart>
                    </ResponsiveContainer>
                }
            </div>
        </div>
    );
}

export default PokemonComparison;