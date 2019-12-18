import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Form, FormGroup, Input } from 'reactstrap';
import { NavLink } from "react-router-dom";

class NavbarComponent extends Component {
    render() {
        return (
            <Navbar color="light" sticky="top">
                <NavbarBrand>
                    <NavLink to="/" className="navbar-links">PokéApp</NavLink>
                </NavbarBrand>
                <Nav className="mr-auto">
                    <NavItem className="mr-2">
                        <NavLink to="/pokemons" className="navbar-links" activeClassName="activeLink">Pokemons</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink to="/items" className="navbar-links" activeClassName="activeLink">Items</NavLink>
                    </NavItem>
                </Nav>
                {this.props.search &&
                    <Form inline>
                        <FormGroup>
                            <Input type="search" name="search" id="searchInput"
                                placeholder="Search" className="mr-auto" onChange={this.props.onChange} />
                        </FormGroup>
                    </Form>
                }
            </Navbar>
        );
    }
}

export default NavbarComponent;