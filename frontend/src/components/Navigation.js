import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
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

    handleLogout = async e => {
        e.preventDefault();
        removeUserCookie();
        window.location.href = "/";
    }
    
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" id = "sticky-navbar">
                <Navbar.Brand>
                    <a href="/">
                    <img src = {Logo}/>
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="container-fluid">
                        <Navbar.Collapse className="justify-content-end">
                            {(this.state.cookie)
                                && (<Nav.Link href="/dashboard">Beranda</Nav.Link>
                            )}
                            {(!this.state.cookie)
                                && (<Nav.Link href="/login">Masuk</Nav.Link>
                            )}
                            {(this.state.cookie)
                                && (<Nav.Link onClick= {(e)=> this.handleLogout(e)}>Keluar</Nav.Link>
                            )}
                        </Navbar.Collapse>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    } 
};

export default Navigation;
