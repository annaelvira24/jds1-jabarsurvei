import { Card,Col, Row, Container,CardDeck} from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPollH } from '@fortawesome/free-solid-svg-icons'
import square from '../assets/image/square_image.png';
import '../assets/css/Card.dash.css';



const Card_dash = () => {
    return(
        <CardDeck>
            <Card className="Addition-Card">
                <Card.Body>
                    <Container>
                        <Row className="Addition-Row">
                            <Col sm={5}>
                                        <img
                                className="d-block w-100"
                                src={square}
                                alt="Third slide"
                                />
                                <FontAwesomeIcon className="pin" icon={faPollH} />
                            </Col>
                            <Col sm={7}>
                                    <Card.Title>
                                        <h5>Total</h5>
                                        <h2>300 Survey</h2>
                                    </Card.Title>
                                <Card.Text>
                                    Periode Maret - Juli 2020
                                </Card.Text>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card className="Addition-Card">
                <Card.Body>
                    <Container>
                        <Row className="Addition-Row">
                            <Col sm={5}>
                                        <img
                                className="d-block w-100"
                                src={square}
                                alt="Third slide"
                                />
                            </Col>
                            <Col sm={7}>
                                    <Card.Title>
                                        <h5>Total</h5>
                                        <h2>30.000 Responden</h2>
                                    </Card.Title>
                                <Card.Text>
                                    Periode Maret - Juli 2020
                                </Card.Text>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            
        </CardDeck>
    
        );
  };

export default Card_dash;