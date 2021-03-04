import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { getUser} from './../util/Common.js';
import Table_comp from '../components/Table_comp.js';
import '../assets/scss/Custom.scss';
import '../assets/css/DashboardAdmin.css';
import http from "../http-common";


class DashboardAdmin extends Component {
  
  state = {
    listSurveyAdmin: [],
    id_admin: undefined,
    username: undefined,
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
            {(this.state.listSurveyAdmin.length > 0)
              && (<Table_comp daftar_survey={this.state.listSurveyAdmin} daftar_coloumn={this.constructor.coloumns}/>
            )}
            {(this.state.listSurveyAdmin.length == 0)
              && <span id="empty-survey">Belum ada survei</span>
            }
          </body>
        </div>
      );
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
        })
       
    }
};
  export default DashboardAdmin;