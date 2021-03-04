import React, { Component } from 'react';
import { Container, Row,} from 'react-bootstrap';
import Table_comp from '../components/Table_comp.js';
import Carousel_dash from '../components/Carousel_dash.js';
import Card_dash from '../components/Card_dash.js';
import '../assets/css/LandingPage.css';
import http from "../http-common";


class LandingPage extends Component {

  state = {
    listSurvey: []
  };

  static get coloumns() { 
      return (
        [{
          dataField: 'id_survey',
          text: 'Nomor Survey'
        },{
          dataField: 'survey_title',
          text: 'Judul Suvey'
        }, {
          dataField: 'username',
          text: 'Pembuat Survey'
        }, {
          dataField: 'decription',
          text: 'Deskripsi'
        }]
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
            <Table_comp daftar_survey={this.state.listSurvey}  daftar_coloumn={this.constructor.coloumns}/>
        </body>
      </div>
    );
  }

  componentDidMount() {
    http.get('http://localhost:5000/api/listSurvey/findAll')
      .then(res => {
        
        const listSurvey = res.data;
        this.setState({ listSurvey });
        console.log(listSurvey);
      })
    
  }

};
  export default LandingPage;