import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import http from "../http-common";
import 'jquery-ui-sortable';
import './../assets/scss/Survey.scss'

window.jQuery = $;
window.$ = $;

require('formBuilder');
require('formBuilder/dist/form-render.min.js');

var formDataTemp = [];



class Survey extends Component {
    fbRender = createRef();
    hideButton = createRef();

    state = {
      link : undefined,
      id : '',
      title : '',
      desc : ''
    }

    constructor(){
      super();

      //this.handleSaveForm = this.handleSaveForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkRequired = this.checkRequired.bind(this);
    }
    
    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      if(this.state.link !== undefined){
        http.get('http://localhost:5000/api/surveyFill/getSurvey/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              this.setState({
                id: res.data[0].id_survey,
                title: res.data[0].survey_title,
                desc : res.data[0].decription
              });
              if(res.data[0].status == 'Aktif'){
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
                document.getElementById('not-accepting').innerHTML = "Maaf, survei sudah tidak menerima respons lagi."
                $(this.hideButton.current).toggle();
              }
            }
            else{
              this.setState({title: "Survey Tidak Ditemukan"});
              $(this.hideButton.current).toggle();
            }
        });
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      const requiredFilled = this.checkRequired();
      if (!requiredFilled) {
        alert("Mohon isi semua kotak yang ditandai dengan bintang merah")
        return
      }

      const answer = JSON.stringify($(this.fbRender.current).formRender("userData"));
      const time = Date.now();
      // console.log(new Date(time));

      const body = { 
        id: this.state.id,
        link: this.state.link,
        timestamp: time,
        data: answer
      }
      console.log(body);

      http.post("http://localhost:5000/api/submit/submitAnswer", body)
        .then((res)=>{
          window.location.href = `/${this.state.link}/success`
        })
        .catch((err)=>{
          alert(err);
        })
    }

    checkRequired() {
      const fields = $(this.fbRender.current).formRender("userData");
      for (var i = 0; i < fields.length; i++){
        if (!fields[i].required) continue;
        
        if (!fields[i].userData) return false;
        else {
          if (!fields[i].userData[0]) return false;
        }
      }
      return true;
    }

    render() {
        return(
          <div id = "survey-container">
            <div id = "survey-title-container">
              <p id="survey-title">{this.state.title}</p>
              <p id="survey-description">{this.state.desc}</p>
            </div>
  
            <div id="survey-main">
              <span id='not-accepting'></span>
              <div id="fb-rendered" ref={this.fbRender}>
              </div>
              <Button type="button" variant = "default" className="t-green" id="button-submit" onClick={this.handleSubmit} ref={this.hideButton}>Submit</Button>
            </div>
          </div>
        );
      }
}
  
export default Survey;