import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Form, FormGroup, Input} from 'reactstrap';

class NavbarComponent extends Component {    
    render() {
        return (
            <div>
                <Navbar color="light" light>
                    <NavbarBrand href="/">PokéApp</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Form inline>
                                <FormGroup>
                                     <Input type="search" name="search" id="searchInput" 
                                     placeholder="Search" className="mr-auto" onChange={this.props.onChange}/>
                                </FormGroup>
                            </Form>
                        </NavItem>
                    </Nav>
                </Navbar>

            </div>
        );
    }
}

export default NavbarComponent;