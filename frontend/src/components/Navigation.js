import React from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Component } from 'react';
import Logo from './../assets/image/logo.png';
import { getUser, removeUserCookie } from './../util/Common.js';
import './../assets/css/Navigation.css';

class Navigation extends Component{
    state = {
        cookie: undefined,
        username: undefined
    }

    constructor(){
        super();
        this.state.cookie = getUser();
    }

    componentDidMount() {
        if (this.state.cookie && !this.state.username) {
            this.setState({ username: JSON.parse(atob(this.state.cookie))["username"] });
        }
    }

    handleLogout = async e => {
        e.preventDefault();
        removeUserCookie();
        window.location.href = "/";

    }
    
    render() {
        return (
            <Navbar id = "sticky-navbar">
                <Nav className="container-fluid">
                    <Nav.Item>
                        <Navbar.Brand>
                            <a href="/">
                            <img src = {Logo}/>
                            </a>
                        </Navbar.Brand>
                    </Nav.Item>
                    <Navbar.Collapse className="justify-content-end">
                        {(this.state.username)
                            && (<Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        )}
                        {(!this.state.username)
                            && (<Nav.Link href="/login">Login</Nav.Link>
                        )}
                        {(this.state.username)
                            && (<Nav.Link onClick= {(e)=> this.handleLogout(e)}>Logout</Nav.Link>
                        )}
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        );
    }
    
};

export default Navigation;