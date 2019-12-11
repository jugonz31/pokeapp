import React from 'react';

export default function ItemDetails(props) {
    const selectedItem = props.selectedItem

    return (
        <div className="container">
            <div className="row">
                <div className="col-4 ">
                    <img className="mt-4" src={selectedItem.imageUrl} width="150px" alt="" />
                </div>
                <div className="col-8">
                    <br />
                    <p>{selectedItem.description}</p>
                    <hr />
                    <table width="100%" >
                        <tbody>
                            <tr>
                                <th width="30%">Cost</th>
                                {selectedItem.attributes[0] !== undefined &&
                                    <th width="70%">Attributes</th>
                                }
                            </tr>
                            <tr>
                                <td>{selectedItem.cost}</td>
                                <td>
                                    <ul>
                                        {selectedItem.attributes.map((item, index) => <li key={index}>{item}</li>)}
                                    </ul>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>
        </div >
    );
}
