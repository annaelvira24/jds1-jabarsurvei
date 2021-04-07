import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartPie } from '@fortawesome/free-solid-svg-icons'
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
          const resultLength = arrayResult.length;
        
          for(var i = 0; i < num; i++){
              arraySlice = arrayResult.slice(i*arrayResult.length/num, (i+1)*arrayResult.length/num );
              // arraySlice = arrayResult.splice(0);

              let question = JSON.parse(arraySlice[0].details);
            
              if(question.type == "checkbox-group"){
                for (var j = 0; j < arraySlice.length; j++){
                  console.log(JSON.parse(arraySlice[j].answer).join(', '));
                  let ans = (JSON.parse(arraySlice[j].answer).join(', '));


                  // console.log(arraySlice[j].answer.join(','));
                  // let beautifulAns = JSON.parse(arraySlice[j].answer);
                  // arraySlice[j].answer = 'halo';
                }
              }
              
              // theQuestion = 
              // <h5 id="question-title">{question.label} </h5>
              // array.push(theQuestion);
              
              theTable = 
              <div id="result-table">
                <div className="table-container">
                  <div className="table-survey">
                    <BootstrapTable data={arraySlice} striped hover>
                        <TableHeaderColumn isKey dataField="answer">{question.label}</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
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
          <div id = "result-container"> 
            <div id="result-header-container">
              Hasil Survei
            </div>
            <div>
              <p id="result-title">{this.state.title}</p>
              <p id="result-description">{this.state.desc}</p>              
            </div>
            <div className="buttons">
              <Button variant="default" className="t-blue" id="button-table" onClick = {event =>  window.location.href='/result/'+ this.state.link}>
                <FontAwesomeIcon icon={faTable} /> Tabel
              </Button>
              <Button variant="default" id="button-visual">
                <FontAwesomeIcon icon={faChartPie} /> Visualisasi
              </Button>
            </div>
            <div id = "result-summary-container">
              <div id = "result-summary">  
                <div id="result-main">
                  {this.getTables()}
                </div>
              </div>
            </div>
          </div>
        );
      }
}
  
export default Result;