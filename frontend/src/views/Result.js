import $ from "jquery";
import React, { Component, createRef } from "react";
import { Table } from "react-bootstrap";
import TableAdmin from '../components/TableAdmin.js';
import PaginationButton from '../components/Pagination.js';
import http from "../http-common";
import { getUser } from './../util/Common.js';
import 'jquery-ui-sortable';
import './../assets/scss/Survey.scss'

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

      //this.handleSaveForm = this.handleSaveForm.bind(this);
    }
    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      // edit existing survey
      if(this.state.link !== undefined){
        http.get('http://localhost:5000/api/surveyRes/getResult/' + this.state.link)
        .then(res => {          
            //console.log(res.data);
            if(res.data[0] !== undefined){
              this.setState({
                id: res.data[0].id_survey,
                title: res.data[0].survey_title,
                desc : res.data[0].decription
              });
              for (var i = 0; i<res.data.length; i++){
                // console.log(res.data[i].details);                
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
              //console.log(formDataTemp);
              http.get('http://localhost:5000/api/surveyRes/getAnswerByLinkAlter/' + this.state.link)
              .then(res => {          
                  if(res.data[0] !== undefined){
                    surveyResult = res.data
                    /* //remove unnesecary stuff like header etc. (REDUNDANT)
                    var retry = true;
                    while(retry){
                      retry = false;
                      for (var i = 0; i<surveyResult.length; i++){                
                        if(!surveyResult[i].details.match("required")){
                          //remove unnesecary file
                          surveyResult.splice(i,1);
                          retry = true;
                        }
                      }
                    } */
                    const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
                    surveyResult = chunk(surveyResult,formDataTemp.length);
                    for (var i = 0; i<surveyResult.length; i++){  
                      var test = {answer : i+1}
                      surveyResult[i].unshift(test)
                    }
                    //console.log(surveyResult);
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
            <div id = "result-title-container">
              <p id="result-title">{this.state.title}</p>
              <p id="result-description">{this.state.desc}</p>
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