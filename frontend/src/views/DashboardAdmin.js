import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { getUser} from './../util/Common.js';
import TableAdmin from '../components/TableAdmin.js';
import PaginationButton from '../components/Pagination.js';
import http from "../http-common";
import '../assets/scss/Custom.scss';
import '../assets/css/DashboardAdmin.css';


class DashboardAdmin extends Component {
  
  state = {
    id_admin: undefined,
    username: undefined,
    cookie: undefined,
    display: [],
    offset: 0,
    currentPage: 1,
    perPage: 5,
    pageCount: 0,
    search: ""
  }

  constructor(){
    super();
    this.state.cookie = getUser();
    this.state.id_admin = JSON.parse(atob(this.state.cookie))[0].id_admin;
    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.findAll = this.findAll.bind(this)
  }

  static get coloumns() { 
    return (
      [{
        text: 'No.',
        width: '100px'
      },{
        dataField: 'survey_title',
        text: 'Judul',
        width: '50px'
      },
      {
        dataField: 'decription',
        text: 'Deskripsi Survei',
        width: '100em'
      },
      {
        dataField: 'randomLink',
        text: 'Link',
        width: '100em'
      },
      {
        text: 'Edit',
        width: '100em'
      },
      {
        text: 'Hapus',
        width: '100em'
      }
    ]
    )
  } 

    render(){
      return (
        <div className="Content-Container" id="dashboard-admin">
          <header>
            <h1 className = 'Title-h1-Dashboard'> DAFTAR SURVEI</h1>
            <h2 className = 'Title-h2-Dashboard'> {this.state.username}</h2>
            <br/>
            <div className="wrapper-button-create">
              <button type="button" className='btn btn-outline-t-green' id="button-create" onClick = {event =>  window.location.href='/formbuilder/create'}>
              <FontAwesomeIcon icon={faPlus} /> Survei Baru
              </button>
            </div>
          </header>
          <div className="Survey-Container">
            <TableAdmin daftar_survey={this.state.display}  daftar_coloumn={this.constructor.coloumns} onSearch={ this.handleSearch } />
            <PaginationButton totalPage={this.state.pageCount} pageMargin={1} onPageClick={this.handlePageClick} currentPage={this.state.currentPage} className='mx-auto' />
          </div>
        </div>
      );
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
      this.setState({currentPage: parsed})
      
      var url = `http://localhost:5000/api/surveyAdmin/${this.state.id_admin}?offset=${offset}&limit=${this.state.perPage}`
      if (this.state.search)
        url += `&query=${this.state.search}`
      http.get(url)
        .then((res) => {
          const display = res.data
          this.setState({
            display: display,
            currentPage: button
          })
        })
    }

    handleSearch(query) {
      if (!query) this.findAll();
      var url = `http://localhost:5000/api/surveyAdmin/${this.state.id_admin}?query=${query}`
      http.get(url)
        .then((res) => {
          console.log(res.data)
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
    

    componentDidMount() {
      if(!this.state.username){
        let url = 'http://localhost:5000/api/admin/' + this.state.id_admin
        http.get(url)
        .then(res => {
          this.setState({ username : res.data[0].username });
        })
      }
      this.findAll()
    }

    findAll() {
      let url = 'http://localhost:5000/api/surveyAdmin/' + this.state.id_admin
      http.get(url)
        .then(res => {
          const listSurveyAdmin = res.data;
          this.setState({ listSurveyAdmin});
          const count = Math.ceil(listSurveyAdmin.length/this.state.perPage)
          const display = listSurveyAdmin.slice(0,this.state.perPage)
          this.setState({
            display: display,
            pageCount: count,
            search: ""
          });
          console.log(listSurveyAdmin);
        })
    }

};
  export default DashboardAdmin;