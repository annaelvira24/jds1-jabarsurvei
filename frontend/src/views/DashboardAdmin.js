import React, { Component } from 'react';
import Table_comp from '../components/Table_comp.js';



class DashboardAdmin extends Component {


    static get coloumns() { 
      return (
        [{
          dataField: 'id',
          text: 'Nomor'
        }, {
          dataField: 'judul',
          text: 'Judul Suvey'
        }, {
          dataField: 'maker',
          text: 'Pembuat Survey'
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
              <Table_comp daftar_survey={this.constructor.datas}  daftar_coloumn={this.constructor.coloumns}/>
        </div>
      );
    }



};
  export default DashboardAdmin;