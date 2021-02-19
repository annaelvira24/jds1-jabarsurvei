import React, { Component } from 'react';
import { Container, Row,} from 'react-bootstrap';
import Table_comp from '../components/Table_comp.js';
import Carousel_dash from '../components/Carousel_dash.js';
import Card_dash from '../components/Card_dash.js';
import '../assets/css/LandingPage.css';






class LandingPage extends Component {


    static get coloumns() { 
      return (
        [{
          dataField: 'id_survey',
          text: 'Nomor Survey'
        }, {
          dataField: 'survey_title',
          text: 'Judul Suvey'
        }, {
          dataField: 'description',
          text: 'Deskripsi'
        }]
      )
  } 
  static get datas() { 
    return (
      [{id: 1, judul: 'Penggunaan sabun cari di kala pandemi', maker: 'otto'},
      {id: 2, judul: 'Usia emas untuk memulai bisnis', maker: 'ot'},
      {id: 3, judul: 'Tingkat konsumsi kopo', maker: 'sfs'},
      {id: 4, judul: 'Pandangan masyarakat terkait vaksin', maker: 'fere'},
      {id: 5, judul: 'Jumlah pengguna sampah', maker: 'gere'}]
    )
} 

    render(){
      return (
        <div className="Content-Container">
          <header className="Landing-Container">
              <Container className="Landing-header">
                  <Row className="Upper-header">
                      <Carousel_dash />
                  </Row>
                  <Row className="Addition-header">
                      <Card_dash/>
                  </Row>
              </Container>
          </header>
          <body className="Survey-Container">
              <Table_comp daftar_survey={this.constructor.datas}  daftar_coloumn={this.constructor.coloumns}/>
          </body>
        </div>
      );
    }



};
  export default LandingPage;