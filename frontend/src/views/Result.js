import $ from "jquery";
import React, { Component, createRef } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartPie } from '@fortawesome/free-solid-svg-icons'
import PaginationButton from '../components/Pagination.js';
import http from "../http-common";
import { getUser } from './../util/Common.js';
import 'jquery-ui-sortable';
import './../assets/scss/Result.scss'

window.jQuery = $;
window.$ = $;

require('formBuilder');
require('formBuilder/dist/form-render.min.js');

var formDataTemp = [];
var surveyResult = [];

class Result extends Component {
    fbRender = createRef();
    hideEverything = createRef();

    state = {
      cookie: undefined,
      
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
    }

    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      // edit existing survey
      if(this.state.link !== undefined){
        http.get('http://localhost:5000/api/surveyRes/getResult/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              this.setState({
                id: res.data[0].id_survey,
                title: res.data[0].survey_title,
                desc : res.data[0].decription
              });

              var checkboxes = [];
              for (var i = 0; i<res.data.length; i++){
                if (JSON.parse(res.data[i].details).type == "checkbox-group"){
                  checkboxes.push(i);
                }
                formDataTemp.push(JSON.parse(res.data[i].details));
              }
              
              //remove unnesecary stuff like header etc.
              var retry = true;
              while(retry){
                retry = false;
                for (var i = 0; i<formDataTemp.length; i++){                
                  if(formDataTemp[i].required === undefined){
                    
                    formDataTemp.splice(i,1);
                    retry = true;
                  }
                }
              }
              //removed
              http.get('http://localhost:5000/api/surveyRes/getAnswerByLinkAlter/' + this.state.link)
              .then(res => {          
                  if(res.data[0] !== undefined){
                    surveyResult = res.data
                    const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
                    surveyResult = chunk(surveyResult,formDataTemp.length);

                    for (var i = 0; i<surveyResult.length; i++){
                      for (var item in checkboxes){
                        surveyResult[i][checkboxes[item]].answer = (JSON.parse(surveyResult[i][checkboxes[item]].answer).join(', '));
                      }
                      var order = {answer : i+1}
                      var curtime = new Date(surveyResult[i][0].submit_time);

                      var submit_time = {answer : (/[A-z]{3} [0-9]{2}.*.GMT.[0-9]{4}/.exec(curtime.toString()))}
                      surveyResult[i].unshift(order)
                      surveyResult[i].push(submit_time)
                    }
                    this.forceUpdate();
                  }
              });
              this.forceUpdate();
            }
            else{
              this.setState({title: "Survey Tidak Ditemukan"});
              $(this.hideEverything.current).toggle();
            }
        });
      }
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
              <Button variant="default" id="button-table">
                <FontAwesomeIcon icon={faTable} /> Tabel
              </Button>
              <Button variant="default" className="t-yellow" id="button-visual" onClick = {event =>  window.location.href='/result/'+ this.state.link + '/summary'}>
                <FontAwesomeIcon icon={faChartPie} /> Visualisasi
              </Button>
            </div>
            <div id="result-main" ref={this.hideEverything}>
              <p>{}</p>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  {formDataTemp.map((formDataTemp) =>(
                    <th>{formDataTemp.label}</th>
                  ))}
                  <th>Waktu Mengisi</th>
                </tr>
              </thead>
              <tbody>
                {surveyResult.map((surveyResult) =>(
                  <tr>
                    {surveyResult.map((surveyResult) =>(
                      <td>{surveyResult.answer}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          </div>
        );
      }
}
  
export default Result;