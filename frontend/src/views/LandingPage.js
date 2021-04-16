import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Table_comp from '../components/Table_comp.js';
import Carousel_dash from '../components/Carousel_dash.js';
import Card_dash from '../components/Card_dash.js';
import PaginationButton from '../components/Pagination'
import Footer from '../components/Footer'
import http from "../http-common";
import '../assets/css/LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: [],
      offset: 0,
      currentPage: 1,
      perPage: 10,
      pageCount: 0,
      search: ""
    };
    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.findAll = this.findAll.bind(this)
  }
  
  render(){
    return (
      <div className="Content-Container">
        <div className="Landing-Container">
            <div className="Upper-header">
                <Carousel_dash />
            </div>
            <div className="Addition-header">
                <Card_dash/>
            </div>
        </div>
        <div className="Survey-Container">
          <Table_comp daftar_survey={this.state.display} onSearch={ this.handleSearch } />
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