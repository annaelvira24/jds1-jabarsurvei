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
      pageCount: 0,
      search: ""
    };
    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.findAll = this.findAll.bind(this)
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
        <div className="Survey-Container border">
          <Table_comp daftar_survey={this.state.display}  daftar_coloumn={this.constructor.coloumns} onSearch={ this.handleSearch } />
          <PaginationButton totalPage={this.state.pageCount} pageMargin={1} onPageClick={this.handlePageClick} currentPage={this.state.currentPage} className='mx-auto' />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.findAll()
  }

  findAll() {
    http.get('http://localhost:5000/api/listSurvey/findAll')
      .then(res => {
        const listSurvey = res.data;
        const count = Math.ceil(listSurvey.length/this.state.perPage)
        const display = listSurvey.slice(0, this.state.perPage)

        this.setState({ 
          display: display,
          pageCount: count,
          currentPage: 1,
          query: ""
        });
      }) 
  }

  handlePageClick(e) {
    // Change active page
    const current = this.state.currentPage
    const total = this.state.pageCount

    var button = e.target.text

    if (button == undefined) return // Error?
    if (button == '‹Previous') {
      button = current == 1 ? 1 : current-1
    } else if (button == '›Next') {
      button = current == total ? total : current+1
    }
    const parsed = parseInt(button)

    const offset = (parsed-1)*this.state.perPage
    var url = `http://localhost:5000/api/listSurvey/findAll?offset=${offset}&limit=${this.state.perPage}`
    if (this.state.search)
      url += `&query=${this.state.search}`
    http.get(url)
      .then((res) => {
        const display = res.data
        this.setState({
          display: display,
          currentPage: parsed,
        })
      })
  }

  handleSearch(query) {
    if (!query) this.findAll();
    var url = `http://localhost:5000/api/listSurvey/findAll?query=${query}`
    http.get(url)
      .then((res) => {
        const listSurvey = res.data
        const count = Math.ceil(listSurvey.length/this.state.perPage)
        const display = listSurvey.slice(0, this.state.perPage)
        this.setState({
          display: display,
          currentPage: 1,
          search: query,
          pageCount: count
        })
      })
  }
};
  
export default LandingPage;