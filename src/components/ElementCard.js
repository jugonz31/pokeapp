import React, { Component } from 'react';
import { Card, CardImg, CardFooter } from 'reactstrap';

class ElementCard extends Component {

    render() {
        return (
            <div className="mb-4">
                <Card key={this.props.id} tag="a" style={{ width: "170px" }} onClick={() => this.props.onClick(this)}>
                    <CardImg top width="50%" src={this.props.img}/>
                        <CardFooter className="badge text-center text-uppercase">{this.props.name}</CardFooter>
                </Card>
            </div >
        );
    }
}

export default ElementCard;