import React, { Component } from 'react';
import { Container, Row,} from 'react-bootstrap';
import Table_comp from '../components/Table_comp.js';
import Carousel_dash from '../components/Carousel_dash.js';
import Card_dash from '../components/Card_dash.js';
import '../assets/css/LandingPage.css';
import http from "../http-common";
import PaginationButton from '../components/Pagination'

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: [],
      offset: 0,
      currentPage: 1,
      perPage: 5,
      pageCount: 0
    };
    this.handlePageClick = this.handlePageClick.bind(this)
  }

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
        <body className="Survey-Container border">
          <PaginationButton totalPage={this.state.pageCount} pageMargin={1} onPageClick={this.handlePageClick} currentPage={this.state.currentPage} className='mx-auto' />
          <Table_comp daftar_survey={this.state.display}  daftar_coloumn={this.constructor.coloumns}/>
          <PaginationButton totalPage={this.state.pageCount} pageMargin={1} onPageClick={this.handlePageClick} currentPage={this.state.currentPage} className='mx-auto' />
        </body>
      </div>
    );
  }

  componentDidMount() {
    http.get('http://localhost:5000/api/listSurvey/findAll')
      .then(res => {
        const listSurvey = res.data;
        const count = Math.ceil(listSurvey.length/this.state.perPage)
        const display = listSurvey.slice(0, this.state.perPage)

        this.setState({ 
          display: display,
          pageCount: count,
          currentPage: 1
        });
      }) 
  }

  handlePageClick(e) {
    // Change active page
    const current = this.state.currentPage
    const total = this.state.pageCount

    var button = e.target.text
    console.log(button)
    if (button == undefined) return // Error?
    if (button == '‹Previous') {
      button = current == 1 ? 1 : current-1
    } else if (button == '›Next') {
      button = current == total ? total : current+1
    }

    const offset = (parseInt(button)-1)*this.state.perPage
    http.get(`http://localhost:5000/api/listSurvey/findAll?offset=${offset}&limit=${this.state.perPage}`)
      .then((res) => {
        console.log("Inside http")
        const display = res.data
        this.setState({
          display: display,
          currentPage: parseInt(button),
        })
      })
  }
};
  
export default LandingPage;