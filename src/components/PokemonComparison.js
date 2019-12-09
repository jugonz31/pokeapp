import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useVibrant from 'use-vibrant-hook';

const PokemonComparison = (props) => {
    const imgurl1 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + props.pokemon1.id + ".png";
    const imgurl2 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + props.pokemon2.id + ".png";

    const comparisonStats = () => {
        var arr = []
        for (var i = 0; i < props.pokemon1.stats.length; i++) {
            var str = "{\"name\": \"" + props.pokemon1.stats[i].name + "\", \"" + props.pokemon1.name + "\": \"" + props.pokemon1.stats[i].power + "\", \"" + props.pokemon2.name + "\": \"" + props.pokemon2.stats[i].power + "\" }"
            arr.push(JSON.parse(str));
        }
        console.log(arr)
        return arr;
    }

    const stats = comparisonStats();
    const { colors, done } = useVibrant(imgurl1);

    return (
        <div className="container">
            <div className="row mx-auto">
                <div className="col-6 center-block text-center mx-auto">
                    <img className="mt-4" src={imgurl1} width="150px" alt="" />
                </div>
                <div className="col-6 center-block text-center mx-auto">
                    <img className="mt-4" src={imgurl2} width="150px" alt="" />
                </div>
            </div>
            <hr />
            <table width="100%" className="text-center mx-auto">
                <tbody>
                    <tr>
                        <td width="38%">{props.pokemon1.height}m</td>
                        <th width="24%">Height</th>
                        <td width="38%">{props.pokemon2.height}m</td>
                    </tr>
                    <tr>
                        <td>{props.pokemon1.weight}kg</td>
                        <th>Weight</th>
                        <td>{props.pokemon2.weight}kg</td>
                    </tr>
                    <tr>
                        <td>{props.pokemon1.gender}</td>
                        <th>Gender</th>
                        <td>{props.pokemon2.gender}</td>
                    </tr>
                    <tr>
                        <td>{props.pokemon1.abilities}</td>
                        <th>Abilities</th>
                        <td>{props.pokemon2.abilities}</td>
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
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey={props.pokemon1.name} fill={colors.DarkVibrant.hex} />
                            <Bar dataKey={props.pokemon2.name} fill={colors.Vibrant.hex} />
                        </BarChart>
                    </ResponsiveContainer>
                }
            </div>
        </div>
    );
}

export default PokemonComparison;