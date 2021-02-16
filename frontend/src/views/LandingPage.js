import React from 'react';
import { Container, Row, Col,Card,CardDeck, Carousel, Form, Button, FormControl } from 'react-bootstrap';
import { Table} from 'react-bootstrap';
import '../assets/css/LandingPage.css';
import { useHistory } from "react-router-dom";
import head1 from '../assets/image/Slide-Background-1.png';
import head2 from '../assets/image/Slide-Background-2.png';
import head3 from '../assets/image/Slide-Background-3.png';





function LandingPage() {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `newPath`; 
        history.push(path);
    }

    return (
      <div className="Content-Container">
        <header className="Landing-Container">
            <Container className="Landing-header">
                <Row className="Upper-header">
                    <Carousel >
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={head1}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>CrowdSource</h3>
                            <p>Menjadi solusi survey berbagai instansi pemerintah</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={head2}
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Visualisasi Data</h3>
                            <p>Dilengkapi visualisasi data hasil survey yang dapat di kustomisasi</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={head3}
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Mudah digunakan</h3>
                            <p>Mudah diakses banyak kalangan sehingga memungkinkan responden yang cukup banyak</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row className="Addition-header">
                    <CardDeck>
                        <Card>
                            <Card.Body>
                                <Card.Title>Total : 300 Survey </Card.Title>
                                <Card.Text>
                                    Periode Maret - Juli 2020
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>Total : 30.000 Responden </Card.Title>
                                <Card.Text>
                                    Periode Maret - Juli 2020
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </CardDeck>

                </Row>
            </Container>
        </header>
        <body className="Survey-Container">
            <Container>
                <Row className="SearchBar-Container">
                <Form inline>
                    {/* <Form.Control size="sm" type="text" placeholder="Search" /> */}
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button type="submit">Search</Button>
                </Form>
                </Row>
                <Row className="ListSurvey-Container">
                    <Table striped bordered hover size="sm" className="List-Table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Judul</th>
                                <th>Pembuat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr onClick={routeChange}>
                                <td>2</td>
                                <td>Kebutuhan Saat Pandemi</td>
                                <td>Otto</td>
                            </tr>
                            <tr onClick={routeChange}>
                                <td>3</td>
                                <td>Kebutuhan Saat Pandemi</td>
                                <td>Otto</td>
                            </tr>
                            <tr onClick={routeChange}>
                                <td>4</td>
                                <td>Kebutuhan Saat Pandemi</td>
                                <td>Otto</td>
                            </tr>
                            <tr onClick={routeChange}>
                                <td>5</td>
                                <td>Kebutuhan Saat Pandemi</td>
                                <td>Otto</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </body>
      </div>
    );
  }
  
  export default LandingPage;