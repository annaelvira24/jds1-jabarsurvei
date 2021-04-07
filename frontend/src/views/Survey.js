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
      desc : '',
      token : ''
    }

    constructor(){
      super();

      //this.handleSaveForm = this.handleSaveForm.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.test = this.test.bind(this);
      this.handleKota = this.handleKota.bind(this);
      this.handleKecamatan = this.handleKecamatan.bind(this);
      this.handleKelurahan = this.handleKelurahan.bind(this);

    }

    
    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      // edit existing survey
      if(this.state.link !== undefined){
        http.get('https://x.rajaapi.com/poe')
        .then(res => {          
          this.setState({ 
            token: res.data.token
          });
          // console.log(this.state.token);
          http.get('http://localhost:5000/api/alamat/Provinsi/' + this.state.token)
          .then(res => {          
            let newValues_Provinsi = res.data.data;
            // console.log(newValues_Provinsi);

            http.get('http://localhost:5000/api/surveyFill/getSurvey/' + this.state.link)
            .then(res => {          
                if(res.data[0] !== undefined){
                  this.setState({
                    id: res.data[0].id_survey,
                    title: res.data[0].survey_title,
                    desc : res.data[0].decription
                  });
                  for (var i = 0; i<res.data.length; i++){
                    let result = JSON.parse(res.data[i].details);
                    if(result.type == "autocomplete" ){
                      if( result.label == "Provinsi"){
                        result.values = newValues_Provinsi;
                      }
                    }
                    // console.log(result);
                    formDataTemp.push(result);
                  }
                  $(this.fbRender.current).formRender({
                    formData : formDataTemp,
                    dataType: 'json'
                  });

                  for(const fiels in formDataTemp){
                    // console.log(dejson[fiels]);
                    if(formDataTemp[fiels].type == "autocomplete" ){
                      if(formDataTemp[fiels].label == "Provinsi"){
                        var id_provinsi = formDataTemp[fiels].name + "-input"
                        var prov = document.getElementById(id_provinsi);
                        prov.addEventListener("change", this.handleKota);
                      }
                      if(formDataTemp[fiels].label == "Kota/Kabupaten"){
                        var id_kota = formDataTemp[fiels].name + "-input"
                        var kota = document.getElementById(id_kota);
                        kota.addEventListener("change", this.handleKecamatan);
                      }
                      if(formDataTemp[fiels].label == "Kecamatan"){
                        var id_kec = formDataTemp[fiels].name + "-input"
                        var kec = document.getElementById(id_kec);
                        kec.addEventListener("change", this.handleKelurahan);
                      }
                    }
                  }
                }
                else{
                  this.setState({title: "Survey Tidak Ditemukan"});
                  $(this.hideButton.current).toggle();
                }
            });

          });
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

    handleKota(){
      var dejson = ($(this.fbRender).formRender("userData"));
      console.log("ini kota");
      let id_prov = '';
      for(const fiels in dejson){
        if(dejson[fiels].label == "Provinsi"){
          id_prov = dejson[fiels].userData[0];
        }
        // console.log(this.state.token);
        if(dejson[fiels].label == "Kota/Kabupaten"){
          let url = 'http://localhost:5000/api/alamat/Kota/' + this.state.token + '/'+ id_prov
          http.get(url)
          .then(res => {
              // console.log(res.data.data);
              dejson[fiels].values = res.data.data;
              console.log(dejson[fiels].values);
              var wrap = $(this.fbRender);
              wrap.formRender('render', dejson);
          })
        }
      }        
    }
    handleKecamatan(){
      console.log("ini kecamatan");
      var dejson = ($(this.fbRender).formRender("userData"));
      let id_kota = '';
      for(const fiels in dejson){
        if(dejson[fiels].label == "Kota/Kabupaten"){
          id_kota = dejson[fiels].userData[0];
        }
        if(dejson[fiels].label == "Kecamatan"){
          let url = 'http://localhost:5000/api/alamat/Kecamatan/' + this.state.token + '/'+ id_kota
          http.get(url)
          .then(res => {
              // console.log(res.data.data);
              dejson[fiels].values = res.data.data;
              console.log(dejson[fiels].values);
              var wrap = $(this.fbRender);
              wrap.formRender('render', dejson);
          })
        }
      }
    }
    handleKelurahan(){
      console.log("ini kelurahan");
      var dejson = ($(this.fbRender).formRender("userData"));
      let id_kec = '';
      for(const fiels in dejson){
        if(dejson[fiels].label == "Kecamatan"){
          id_kec = dejson[fiels].userData[0];
        }
        if(dejson[fiels].label == "Kelurahan"){
          let url = 'http://localhost:5000/api/alamat/Kelurahan/' + this.state.token + '/'+ id_kec
          http.get(url)
          .then(res => {
              // console.log(res.data.data);
              dejson[fiels].values = res.data.data;
              console.log(dejson[fiels].values);
              var wrap = $(this.fbRender);
              wrap.formRender('render', dejson);
          })
        }
      }
    }

    test(){
      var dejson = ($(this.fbRender).formRender("userData"));
        // console.log(dejson);
        for(const fiels in dejson){
          if(dejson[fiels].label == "Provinsi"){
            // console.log(dejson[fiels].userData[0]);
          }
        }
    }
    

    render() {
        return(
          <div id = "survey-container">
            <div id = "survey-title-container">
              <p id="survey-title">{this.state.title}</p>
              <p id="survey-description">{this.state.desc}</p>
            </div>
  
            <div id="survey-main">
              <div id="fb-rendered" ref={this.fbRender}>
              </div>
              <Button type="button" variant = "default" className="t-green" id="button-submit" onClick={this.handleSubmit} ref={this.hideButton}>Submit</Button>
              <Button type="button" variant = "default" className="t-green" id="button-submit" onClick={this.test} ref={this.test}>Submit</Button>
            </div>
          </div>
        );
      }
}
  
export default Survey;