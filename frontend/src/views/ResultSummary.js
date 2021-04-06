import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import http from "../http-common";
import { getUser } from './../util/Common.js';
import './../assets/scss/Result.scss'

class Result extends Component {
    fbRender = createRef();
    hideButton = createRef();

    state = {
      cookie: undefined,
      surveyResult : undefined,
      idSurvey : undefined,
      idAdmin : undefined,
      link : undefined,
      count : undefined,
      title : undefined,
      desc : undefined
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;

      this.getTables = this.getTables.bind(this);
    }

    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      if(this.state.link !== undefined){
      http.get('http://localhost:5000/api/surveyRes/getResult/' + this.state.link)
        .then(res => {          
            console.log(res.data);
            if(res.data[0] !== undefined){
              this.setState({
                title: res.data[0].survey_title,
                desc : res.data[0].decription
              });
            }
            else{
              this.setState({title: "Survey Tidak Ditemukan"});
              $(this.hideButton.current).toggle();
            }
        });

        http.get('http://localhost:5000/api/surveyRes/getAnswerByLink/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              this.setState({
                  surveyResult : res.data
              });
              http.get('http://localhost:5000/api/surveyRes/getQuestionCount/' + this.state.link)
              .then(res => {          
                  if(res.data[0] !== undefined){
                    this.setState({
                        count : res.data[0].count
                    });
                  }
              });
            }
        });
      }
    }

    getTables = () => {
        const array = [];
        let theTable;
        let theQuestion;
        let arraySlice = [];
        let num = this.state.count;
        if(this.state.surveyResult !== undefined){
          let arrayResult = this.state.surveyResult    
        
          for(var i = 0; i < num; i++){
              arraySlice = arrayResult.slice(i*arrayResult.length/num, (i+1)*arrayResult.length/num );
              let question = JSON.parse(arraySlice[0].details);
              
              theQuestion = 
              <h5 id="question-title">{question.label} </h5>
              array.push(theQuestion);
              
              theTable = 
              <div id="result-table">
                <BootstrapTable data={arraySlice} striped hover>
                    <TableHeaderColumn isKey dataField="answer">Jawaban</TableHeaderColumn>
                </BootstrapTable>
              </div>
            array.push(theTable)
          }
        }
        else if(this.state.desc !== undefined){
          let emptyResponse =
          <span>Belum ada respons untuk survei ini</span>
          array.push(emptyResponse);
        }
          
        return array
    }

    render() {
        return(
          <div id = "result-summary-container">
              <div id = "result-title-container">
                <p id="survey-title">{this.state.title}</p>
                <p id="survey-description">{this.state.desc}</p>
              </div>
            <div id = "result-summary">  
              <div id="result-main">
                {this.getTables()}
              </div>
            </div>
          </div>
        );
      }
}
  
export default Result;