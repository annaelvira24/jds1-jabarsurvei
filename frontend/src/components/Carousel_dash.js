import React from 'react';
import { Carousel, Button} from 'react-bootstrap';
import head1 from '../assets/image/carousel-1.jpg';
import head2 from '../assets/image/carousel-2.jpg';
import head3 from '../assets/image/carousel-3.jpg';




const Carousel_dash = () => {

    return(
            <Carousel >
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={head1}
                    id="carousel-image"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h1>Jabar Survei</h1>
                        <p>
                            Menjadi solusi andalan survei dan visualisasi hasil data survei Jawa Barat
                        </p>
                        <p>
                            <Button color="#00A5E1" onClick={(e) => window.location.href='/register'}>Daftar Sekarang</Button>
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    id="carousel-image"
                    src={head2}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h1>Mudah Digunakan</h1>
                    <p>Mudah diakses banyak kalangan sehingga memungkinkan responden yang luas dan banyak</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    id="carousel-image"
                    src={head3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h1>Visualisasi Data</h1>
                        <p>
                            Data mudah dilihat dan dianalisis dengan visualisasi data yang menarik dan lengkap untuk beragam filter data
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
  
        );
  };

export default Carousel_dash;