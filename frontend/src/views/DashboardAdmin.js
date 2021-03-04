import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { getUser} from './../util/Common.js';
import Table_comp from '../components/Table_comp.js';
import '../assets/scss/Custom.scss';
import '../assets/css/DashboardAdmin.css';
import http from "../http-common";
import PaginationButton from '../components/Pagination.js';


class DashboardAdmin extends Component {
  
  state = {
    // listSurveyAdmin: [],
    id_admin: undefined,
    username: undefined,
    cookie: undefined,
    display: [],
    offset: 0,
    currentPage: 1,
    perPage: 5,
    pageCount: 0
  }

  constructor(){
    super();
    this.state.cookie = getUser();
    this.state.id_admin = JSON.parse(atob(this.state.cookie))[0].id_admin;
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
        <div className="Content-Container" id="dashboard-admin">
          <header>
            <h1 className = 'Title-h1-Dashboard'> DAFTAR SURVEI</h1>
            <h2 className = 'Title-h2-Dashboard'> {this.state.username}</h2>
            <br/>
            <div className="wrapper-button-create">
              <button type="button" className='btn btn-outline-t-green' id="button-create" onClick = {event =>  window.location.href='/create-survey'}>
              <FontAwesomeIcon icon={faPlus} /> Survei Baru
              </button>
            </div>
          </header>
          <body>
            <Table_comp daftar_survey={this.state.display} daftar_coloumn={this.constructor.coloumns}/>
            <PaginationButton totalPage={this.state.pageCount} pageMargin={1} onPageClick={this.handlePageClick} currentPage={this.state.currentPage} className='mx-auto' />
          </body>
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
  
      const offset = (parseInt(button)-1)*this.state.perPage
      this.setState({currentPage: parseInt(button)})
      
      const url = `http://localhost:5000/api/surveyAdmin/${this.state.id_admin}?offset=${offset}&limit=${this.state.perPage}`
      http.get(url)
        .then((res) => {
          const display = res.data
          this.setState({
            display: display,
            currentPage: button
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


      let url = 'http://localhost:5000/api/surveyAdmin/' + this.state.id_admin
      http.get(url)
        .then(res => {
          const listSurveyAdmin = res.data;
          this.setState({ listSurveyAdmin});
          const count = Math.ceil(listSurveyAdmin.length/this.state.perPage)
          const display = listSurveyAdmin.slice(0,this.state.perPage)
          this.setState({
            display: display,
            pageCount: count
          });
          console.log(listSurveyAdmin);
        })
       
    }
};
  export default DashboardAdmin;