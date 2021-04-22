import $ from "jquery";
import React, { Component, createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "react-bootstrap";
import http from "../http-common";
import AlertBox from '../components/AlertBox.js'
import 'jquery-ui-sortable';
import './../assets/scss/Survey.scss'
import '../control_plugins/alamat'

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
      close : false,
      id : '',
      title : '',
      desc : '',
      token : '',
      recaptchaResponse:""
    }

    constructor(){
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkRequired = this.checkRequired.bind(this);
      this.checkForAlamat = this.checkForAlamat.bind(this);
      this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);
    }

    AlertRef = (obj) => { 
      this.showAlert = obj && obj.handleShow 
    }

    submitWarning = () => {
      this.showAlert();
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
                  let question = JSON.parse(res.data[i].details);
                  formDataTemp.push(question);
                  if(question.required){
                    document.getElementById('required-span').innerHTML = `* Wajib diisi`;
                  }
                }
                $(this.fbRender.current).formRender({
                  formData : formDataTemp,
                  dataType: 'json'
                });
              }
              else{
                this.setState({close: true});
                document.getElementById('not-accepting').innerHTML = "Maaf, survei ini sudah ditutup."
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

    checkForAlamat(answer){
      const arr = answer.map(el => {
        if (el.type === "alamat"){
          const name = el.name
          const input_name = `${name}-input`
          const inputs = $(`[id^=${input_name}]`)
          
          var data = []
          inputs.each((index, element) => {
            var text = element.value
            if (element.tagName === "SELECT")
              text = $(element).find(`option[value="${text}"]`).text()
            data.push(text)
          })

          var newEl = el
          newEl.userData = data

          return newEl
        }
        return el
      })
      return arr
    }

    handleSubmit(e) {
      e.preventDefault();

      var answer = this.checkForAlamat($(this.fbRender.current).formRender("userData"))
      const requiredFilled = this.checkRequired(answer);
      console.log(requiredFilled)
      if (!requiredFilled) {
        this.submitWarning();
        return
      }

      if(this.state.recaptchaResponse==""){
        alert("Mohon isi verifikasi sebelum melakukan submit");
        return
      }

      var answer = JSON.stringify(this.checkForAlamat($(this.fbRender.current).formRender("userData")))
      const time = Date.now();
      const body = { 
        id: this.state.id,
        link: this.state.link,
        timestamp: time,
        data: answer,
        recaptchaResponse: this.state.recaptchaResponse
      }
      
      http.post("http://localhost:5000/api/submit/submitAnswer", body)
        .then((res)=>{
          if(res.data == false){
            alert("Anda terdeteksi sebagai robot");
          }else{
            window.location.href = `/${this.state.link}/success`
            this.recaptcha.reset();
          }
        })
        .catch((err)=>{
          alert(err);
          this.recaptcha.reset();
        })
    }

    checkRequired(fields) {
      for (var i = 0; i < fields.length; i++){
        if (!fields[i].required) continue;
        
        if (fields[i].type === 'alamat'){
          var filled = true
          fields[i].userData.forEach(el => {
            if (!el) filled = false
          })
          return filled
        }

        if (!fields[i].userData) return false;
        else {
          if (!fields[i].userData[0]) return false;
        }
      }
      return true;
    }

    	
  handleCaptchaResponseChange(response) {
    this.setState({
      recaptchaResponse: response,
    });
  }

    render() {
        return(
          <div id = "survey-container">
            <AlertBox 
              ref={this.AlertRef}
              text = "Mohon isi semua pertanyaan yang ditandai dengan bintang merah"
            />
            <div id = "survey-title-container">
              <p id="survey-title">{this.state.title}</p>
              <p id="survey-description">{this.state.desc}</p>
            </div>
  
            <div id="survey-main">
              <span id='required-span'></span>
              <h5 id='not-accepting'></h5>
              <div id="fb-rendered" ref={this.fbRender}>
              </div>
              <div style = {{display:(this.state.close? 'none' : 'block')}}>
                <ReCAPTCHA
                  ref={(el) => { this.recaptcha = el; }}
                  sitekey={process.env.REACT_APP_PUBLIC_RECAPTHCA_SITE_KEY}
                  onChange={this.handleCaptchaResponseChange}
                />
              </div>
              <Button type="button" variant = "default" className="t-green" id="button-submit" onClick={this.handleSubmit} ref={this.hideButton}>Submit</Button>
            </div>
          </div>
        );
      }
}
  
export default Survey;