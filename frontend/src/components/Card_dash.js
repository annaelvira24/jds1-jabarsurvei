import React, { Component } from 'react';
import { Card,Col, Row, Container,CardDeck} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPollH } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/Card.dash.css';
import http from "../http-common";

class Card_dash extends Component{
    state = {
        count: undefined
    };

    componentDidMount() {
        http.get('http://localhost:5000/api/listSurvey/count')
          .then(res => {
            const countSurvey = res.data.count;
            this.state.count= countSurvey;
            console.log(this.state.count);
          })
        
    }

    render(){
        return(
            <CardDeck>
                <Card className="Addition-Card">
                    <Card.Body>
                        <Container>
                            <Row className="Addition-Row">
                                <Col sm={5}>
                                    <FontAwesomeIcon color = "#5AAB4E" size='9x' icon={faPollH} />
                                </Col>
                                <Col sm={7}>
                                        <Card.Title>
                                            <h5>Total</h5>
                                            <h2>{this.state.count} Survey</h2>
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
                                    <FontAwesomeIcon color = "#5AAB4E" size='7x' icon={faUsers} />
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
    }
    
};

export default Card_dash;