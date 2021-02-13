import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';



function LandingPage() {
    return (
      <div className="Content-Container">
        <header className="Landing-Container">
            <Container className="Landing-header">
                <Row className="Upper-header">
                    <Col md={8}className="Image-Header-Container" >
                        Gambar header
                    </Col>
                    <Col md={4}className="Text-Header-Container" >
                        <Row> CrowdSource </Row>
                        <Row> CrowdSource adalah </Row>
                    </Col>
                </Row>
                <Row className="Addition-header">
                    <Col md={4} className="Surveyor-Addition-Container" >
                        <Row> Total : 300 Srvey dibuat </Row>
                        <Row> Periode Maret - Juli 2020</Row>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="Responden-Addition-Container" >
                        <Row> Total : 30.000 Responden </Row>
                        <Row> Periode Maret - Juli 2020</Row>
                    </Col>
                </Row>
            </Container>
        </header>
        <body className="Survey-Container">
            <Container>
                <Row className="SearchBar-Container">
                </Row>
                <Row className="ListSurvey-Container">
                </Row>
            </Container>
        </body>
      </div>
    );
  }
  
  export default LandingPage;