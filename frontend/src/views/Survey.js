import $ from "jquery";
import React, { Component, createRef } from "react";
import http from "../http-common";
import { getUser } from './../util/Common.js';
import 'jquery-ui-sortable';
import './../assets/scss/FormBuilder.scss'

window.jQuery = $;
window.$ = $;

require('formBuilder');
require('formBuilder/dist/form-render.min.js');

var formDataTemp = [];



class Survey extends Component {
    fbRender = createRef();

    state = {
      cookie: undefined,
      idSurvey : undefined,
      idAdmin : undefined
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;

      //this.handleSaveForm = this.handleSaveForm.bind(this);
    }
    
    componentDidMount() {
      if (this.props.match)
        this.state.idSurvey = this.props.match.params.id;

      // edit existing survey
      if(this.state.idSurvey !== undefined){
        /* http.get('http://localhost:5000/api/surveyFill/getDescription/' + this.state.idSurvey)
        .then(res => {
            console.log(res.data.survey_title);
            
        }); */
        http.get('http://localhost:5000/api/surveyFill/findById/' + this.state.idSurvey)
        .then(res => {
          for (var i = 0; i<res.data.length; i++){
            formDataTemp.push(JSON.parse(res.data[i].details));
          }
        });
      }
      $(this.fbRender.current).formRender({
        dataType: 'json',
        formData:  formDataTemp
      });
    }
    render() {
        return(
          <div id = "surveyContainer">
            <div id = "surveyTitle">
              <div className="form-group">
                <span type="text" id="title-input"/>
                <br/>
                <span type="text" id="description-input" />
              </div>
  
            </div>
  
            <div id="surveyMain">
              <div id="fb-rendered-form">
                <div id="fb-rendered" ref={this.fbRender}>
  
                </div>
                
              </div>
              
            </div>
          </div>
        );
      }
}
  
export default Survey;