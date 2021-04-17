import React from 'react';
import { Component } from 'react';
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faTwitterSquare, faLinkedin, faInstagramSquare, faMedium } from '@fortawesome/free-brands-svg-icons' 
import Logo from './../assets/image/logo.png';
import JDS from './../assets/image/JDS.png';
import './../assets/css/Footer.css';

class Footer extends Component{

    constructor(){
        super();
    }
    
    render() {
        return (
            <div className="footer-container">
                <Col>
                    <Row>
                        <Col xs={12} md={8}>
                            <Row>
                                <Col>
                                    <img src = {Logo}/>
                                    <img src = {JDS}/>                            
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <span>
                                    Jabar Command Center<br/>
                                    (Gedung Setda B Lt. II)<br/>
                                    Jalan Diponegoro Nomor 22 Bandung Jawa Barat 40115
                                </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={3} className="social-col">
                            <Row>
                                <h6>
                                    <b>
                                        Ikuti Kami
                                    </b>
                                </h6>
                            </Row>
                            <Row>
                                <a href="https://www.facebook.com/jabardigitalservice/" target="blank">
                                    <FontAwesomeIcon icon={faFacebookSquare} size={"2x"} color={"grey"}/>
                                </a>
                                <a href="https://twitter.com/jabardigital" target="blank">
                                    <FontAwesomeIcon icon={faTwitterSquare} size={"2x"} color={"grey"}/>
                                </a>
                                <a href="https://www.instagram.com/jabardigitalservice/" target="blank">
                                    <FontAwesomeIcon icon={faInstagramSquare} size={"2x"} color={"grey"}/>
                                </a>
                                <a href="https://www.linkedin.com/company/jabardigitalservice/" target="blank">
                                    <FontAwesomeIcon icon={faLinkedin} size={"2x"} color={"grey"}/>
                                </a>
                                <a href="https://medium.com/@jabardigitalservice" target="blank">
                                    <FontAwesomeIcon icon={faMedium} size={"2x"} color={"grey"}/>
                                </a>      
                            </Row>

                        </Col>
                    </Row>
                </Col>
            </div>
            
            // <Navbar collapseOnSelect expand="lg" id = "sticky-navbar">
            //     <Navbar.Brand>
            //         <a href="/">
            //         <img src = {Logo}/>
            //         </a>
            //     </Navbar.Brand>
            //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            //     <Navbar.Collapse id="responsive-navbar-nav">
            //         <Nav className="container-fluid">
            //             <Navbar.Collapse className="justify-content-end">
            //                 {(this.state.cookie)
            //                     && (<Nav.Link href="/dashboard">Beranda</Nav.Link>
            //                 )}
            //                 {(!this.state.cookie)
            //                     && (<Nav.Link href="/login">Masuk</Nav.Link>
            //                 )}
            //                 {(this.state.cookie)
            //                     && (<Nav.Link onClick= {(e)=> this.handleLogout(e)}>Keluar</Nav.Link>
            //                 )}
            //             </Navbar.Collapse>
            //         </Nav>
            //     </Navbar.Collapse>
            // </Navbar>
        );
    } 
};

export default Footer;
