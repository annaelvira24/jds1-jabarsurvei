import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Table_comp from '../components/Table_comp.js';
import '../assets/scss/Custom.scss';
import '../assets/css/DashboardAdmin.css';





class DashboardAdmin extends Component {


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
            <Button variant="outline-success" size="lg" block className='btn-newsurvey'>
              Buat Survey
            </Button>
          </header>
          <body>
            <Table_comp daftar_survey={this.constructor.datas}  daftar_coloumn={this.constructor.coloumns}/>
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
  export default DashboardAdmin;