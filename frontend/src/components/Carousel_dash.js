import React from 'react';
import { Carousel, Button} from 'react-bootstrap';
import head1 from '../assets/image/Slide-Background-1.png';
import head2 from '../assets/image/Slide-Background-2.png';
import head3 from '../assets/image/Slide-Background-3.png';




const Carousel_dash = () => {

    return(
            <Carousel >
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={head1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h1>CrowdSource</h1>
                        <p>
                            Menjadi solusi survey dan visualisasi hasil data survey karya anak bangsa
                        </p>
                        <p>
                            <Button variant="primary">Daftar</Button>
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={head2}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Mudah digunakan</h3>
                    <p>Mudah diakses banyak kalangan sehingga memungkinkan responden yang cukup banyak</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={head3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Visualisasi Data</h3>
                    <p>Menjadi mudah dilihat dan dianalisis dengan visualisasi data yang menarik</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
  
        );
  };

export default Carousel_dash;