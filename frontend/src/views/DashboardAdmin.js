import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { getUser, removeUserCookie } from './../util/Common.js';
import Table_comp from '../components/Table_comp.js';
import '../assets/scss/Custom.scss';
import '../assets/css/DashboardAdmin.css';
import http from "../http-common";


class DashboardAdmin extends Component {
  
  state = {
    listSurveyAdmin: [],
    id_admin: undefined,
    cookie: undefined
  }

  constructor(){
    super();
    this.state.cookie = getUser();
    this.state.id_admin = JSON.parse(atob(this.state.cookie))[0].id_admin;
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
  // static get datas() { 
  //   return (
  //     [{id: 1, judul: 'Penggunaan sabun cari di kala pandemi', maker: 'otto'},
  //     {id: 2, judul: 'Usia emas untuk memulai bisnis', maker: 'ot'},
  //     {id: 3, judul: 'Tingkat konsumsi kopo', maker: 'sfs'},
  //     {id: 4, judul: 'Pandangan masyarakat terkait vaksin', maker: 'fere'},
  //     {id: 5, judul: 'Jumlah pengguna sampah', maker: 'gere'}]
  //   )
  // } 

    render(){
      return (
        <div className="Content-Container">
          <header>
            <h1 className = 'Title-h1-Dashboard'> Daftar Survey Milikmu ! </h1>
            <Button variant="outline-success" size="lg" block className='btn-newsurvey' onClick = {event =>  window.location.href='/create-survey'}>
              Buat Survey
            </Button>
          </header>
          <body>
            <Table_comp daftar_survey={this.state.listSurveyAdmin} daftar_coloumn={this.constructor.coloumns}/>
          </body>
        </div>
      );
    }
    

    componentDidMount() {

      let url = 'http://localhost:5000/api/surveyAdmin/' + this.state.id_admin
      console.log(this.state.id_admin);
      http.get(url)
        .then(res => {
          
          const listSurveyAdmin = res.data;
          this.setState({ listSurveyAdmin});
          console.log(listSurveyAdmin);
        })
      
    }
};
  export default DashboardAdmin;