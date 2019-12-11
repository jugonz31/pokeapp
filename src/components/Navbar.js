import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Form, FormGroup, Input } from 'reactstrap';
import { Link } from "react-router-dom";

class NavbarComponent extends Component {
    render() {
        return (
            <Navbar color="light" light sticky="top">
                <NavbarBrand href="/">PokéApp</NavbarBrand>
                <Nav className="mr-auto">
                    <NavItem light>
                        <Link to="/items">Items</Link>
                    </NavItem>
                </Nav>
                <Form inline>
                    <FormGroup>
                        <Input type="search" name="search" id="searchInput"
                            placeholder="Search" className="mr-auto" onChange={this.props.onChange} />
                    </FormGroup>
                </Form>
            </Navbar>
        );
    }
}

export default NavbarComponent;