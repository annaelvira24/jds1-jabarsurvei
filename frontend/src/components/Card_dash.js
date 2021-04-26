import React, { Component } from 'react';
import { Card,Col, Row, Container,CardDeck} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPollH } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/CardDash.css';
import http from "../http-common";

class Card_dash extends Component{
    state = {
        countSurvey: undefined,
        countRespons: undefined
    };

    componentDidMount() {
        http.get('/api/listSurvey/count')
          .then(res => {
            const countSurvey = res.data.count;
            this.state.countSurvey= countSurvey;
          })

        http.get('/api/submit/count')
            .then(res => {
            const countRespons = res.data.count;
            this.state.countRespons= countRespons;
        })
        
    }

    render(){
        return(
            <CardDeck>
                <Row>
                    <Col>
                        <Card className="Addition-Card">
                            <Card.Body>
                                <Row id="card-info">
                                    <Col sm={5}>
                                        <FontAwesomeIcon color = "#5AAB4E" size='8x' icon={faPollH} />
                                    </Col>
                                    <Col sm={7}>
                                        <Card.Title>
                                            <h5 id="card-h5">Total</h5>
                                            <h3 id="card-h3">{this.state.countSurvey}
                                            <br/>
                                            Survey</h3>
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="Addition-Card">
                            <Card.Body>
                                    <Row id="card-info">
                                        <Col sm={5}>
                                            <FontAwesomeIcon color = "#5AAB4E" size='7x' icon={faUsers} />
                                        </Col>
                                        <Col sm={7}>
                                            <Card.Title>
                                                <h5 id="card-h5">Total</h5>
                                                <h3 id="card-h3">{this.state.countRespons}
                                                <br/>
                                                Responden</h3>
                                            </Card.Title>
                                        </Col>
                                    </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </CardDeck>
        
            );
    }
    
};

export default Card_dash;