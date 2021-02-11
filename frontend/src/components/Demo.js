import React from 'react';
import { Button, Container, Col, Row, Alert } from 'react-bootstrap';

function Demo(){
    return (
        <Container>
            <Row>
                <Col>
                    <Button variant="t-green">Green</Button>
                </Col>
                <Col>
                    <Button variant="t-yellow">Yellow</Button>
                </Col>
                <Col>
                <Button variant="t-blue">Blue</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="outline-t-green">Green</Button>
                </Col>
                <Col>
                    <Button variant="outline-t-yellow">Yellow</Button>
                </Col>
                <Col>
                <Button variant="outline-t-blue">Blue</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alert variant="t-green">Green</Alert>
                </Col>
                <Col>
                    <Alert variant="t-yellow">Yellow</Alert>
                </Col>
                <Col>
                    <Alert variant="t-blue">Green</Alert>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Demo;