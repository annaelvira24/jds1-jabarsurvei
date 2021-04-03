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
          console.log(this.state.token);
          http.get('http://localhost:5000/api/alamat/Provinsi/' + this.state.token)
          .then(res => {          
            let newValues_Provinsi = res.data.data;
            console.log(newValues_Provinsi);

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
                    if(result.type == "autocomplete" && result.label == "Provinsi"){
                      result.values = newValues_Provinsi;
                    }
                    console.log(result);
                    formDataTemp.push(result);
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

    // test(){
    //   var dejson = ($(this.fbRender).formRender("userData"));
    //     // console.log(dejson);
    //     for(const fiels in dejson){
    //       if(dejson[fiels].type == "autocomplete"){
    //         console.log(dejson[fiels].values);
    //         dejson[fiels].values = [
    //           {
    //             "label": "Hai",
    //             "value": "1",
    //             "selected": true
    //           },
    //           {
    //             "label": "B",
    //             "value": "2",
    //             "selected": false
    //           },
    //           {
    //             "label": "ew",
    //             "value": "3",
    //             "selected": false
    //           }
    //         ]
    //       }
    //     }
    // }
    

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
            </div>
          </div>
        );
      }
}
  
export default Survey;