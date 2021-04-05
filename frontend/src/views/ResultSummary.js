import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import TableAdmin from '../components/TableAdmin.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import http from "../http-common";
import { getUser } from './../util/Common.js';
import 'jquery-ui-sortable';
import './../assets/scss/Survey.scss'

class Result extends Component {
    fbRender = createRef();
    hideButton = createRef();

    state = {
      cookie: undefined,
      surveyResult : undefined,
      idSurvey : undefined,
      idAdmin : undefined,
      link : undefined,
      id : '',
      title : '',
      desc : ''
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;

      this.getTables = this.getTables.bind(this);


    //   if (this.props.match)
    //     this.state.link = this.props.match.params.link;

    //   if(this.state.link !== undefined){
    //     http.get('http://localhost:5000/api/surveyRes/getAnswerByLink/' + this.state.link)
    //     .then(res => {          
    //         console.log(res.data);
    //         if(res.data[0] !== undefined){
    //           this.setState({
    //               surveyResult : res.data
    //           });
    //         }
    //     });
    //   }
    }

    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      if(this.state.link !== undefined){
        http.get('http://localhost:5000/api/surveyRes/getAnswerByLink/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              this.setState({
                  surveyResult : res.data
              });
            }
        });
      }
    }

    getTables = (num) => {
        const array = [];
        let theTable;
        let theQuestion;
        let arraySlice = [];
        if(this.state.surveyResult !== undefined){
          let arrayResult = this.state.surveyResult    
        
          for(var i = 0; i < num; i++){
              // console.log(this.state.surveyResult);
              arraySlice = arrayResult.slice(i*arrayResult.length/num, (i+1)*arrayResult.length/num );

              let question = JSON.parse(arraySlice[0].details);
              theQuestion = 
              <h4>{question.label} </h4>
              array.push(theQuestion);
              
              theTable = 
              <BootstrapTable data={arraySlice} striped hover>
                  <TableHeaderColumn isKey dataField="answer">Jawaban</TableHeaderColumn>
              </BootstrapTable>
            array.push(theTable)
          }
        }
          
        return array
    }

    render() {
        return(
          <div id = "result-container">
            <div id = "result-title-container">
              <p id="result-title">{this.state.title}</p>
              <p id="result-description">{this.state.desc}</p>
            </div>
  
            <div id="result-main">
                {/* <p>{this.state.surveyResult}</p> */}
              {this.getTables(7)}
            </div>
          </div>
        );
      }
}
  
export default Result;