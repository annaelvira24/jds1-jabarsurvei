import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
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



class Result extends Component {
    fbRender = createRef();
    hideButton = createRef();

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
            console.log(res.data);
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
              console.log(formDataTemp);
            }
            else{
              this.setState({title: "Survey Tidak Ditemukan"});
              $(this.hideButton.current).toggle();
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
  
            <div id="result-main">
              
            </div>
          </div>
        );
      }
}
  
export default Result;