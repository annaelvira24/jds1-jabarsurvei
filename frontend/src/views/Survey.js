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
    hideButton = createRef();

    state = {
      cookie: undefined,
      link : undefined,
      idAdmin : undefined,
      id : '',
      title : '',
      desc : ''
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;

      //this.handleSaveForm = this.handleSaveForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      // edit existing survey
      if(this.state.link !== undefined){
        http.get('http://localhost:5000/api/surveyFill/getSurvey/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              this.setState({
                id: res.data[0].id_survey,
                title: res.data[0].survey_title,
                desc : res.data[0].decription
              });
              for (var i = 0; i<res.data.length; i++){
                console.log(res.data[i].details);
                formDataTemp.push(JSON.parse(res.data[i].details));
              }
              $(this.fbRender.current).formRender({
                formData : formDataTemp,
                dataType: 'json'
              });
            }
            else{
              this.setState({title: "Survey Tidak Ditemukan"});
              $(this.hideButton.current).toggle();
            }
        });
      }
    }

    handleSubmit(e) {
      const answer = JSON.stringify($(this.fbRender.current).formRender("userData"));
      const time = Date.now();
      console.log(new Date(time));

      const body = { 
        id: this.state.id,
        link: this.state.link,
        timestamp: time,
        data: answer
      }
      console.log(body);

      http.post("http://localhost:5000/api/submit/submitAnswer", body)
        .then((res)=>{
          console.log("Success");
        })
        .catch((err)=>{
          console.log("Error: "+err);
        })
    }

    render() {
        return(
          <div id = "surveyContainer">
            <div id = "surveyTitle">
              <h1>{this.state.title}</h1>
              <h5>{this.state.desc}</h5>
            </div>
  
            <div id="surveyMain">
              <div id="fb-rendered" ref={this.fbRender}>
              </div>
            </div>
            <button type="button" id="button" onClick={this.handleSubmit} ref={this.hideButton}>Submit</button>
          </div>
        );
      }
}
  
export default Survey;