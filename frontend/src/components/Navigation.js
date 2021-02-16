import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import React from 'react';

function Navigation(){
    return (
        <Navbar bg="light" variant="light">
            <Nav className="container-fluid">
                <Nav.Item>
                    <Navbar.Brand>Jabar Crowd Source</Navbar.Brand>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Create Survey</Nav.Link>
                </Nav.Item>
                <Dropdown as={Nav.Item} className="ml-auto">
                    <Dropdown.Toggle as={Nav.Link}>Hi User!</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    )
}

export default Navigation;