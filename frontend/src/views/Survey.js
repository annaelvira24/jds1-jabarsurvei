import React, { Component } from 'react';

class Survey extends Component {
    fbRender = createRef();

    state = {
      cookie: undefined,
      idSurvey : undefined,
      idAdmin : undefined,
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
        this.state.idSurvey = this.props.match.params.id;

      // edit existing survey
      if(this.state.idSurvey !== undefined){
        http.get('http://localhost:5000/api/surveyFill/getDescription/' + this.state.idSurvey)
        .then(res => {
            
            this.setState({
              title: res.data[0].survey_title,
              desc : res.data[0].decription
            });
        });
        http.get('http://localhost:5000/api/surveyFill/findById/' + this.state.idSurvey)
        .then(res => {
          
          for (var i = 0; i<res.data.length; i++){
            console.log(res.data[i].details);
            formDataTemp.push(JSON.parse(res.data[i].details));
          }
          $(this.fbRender.current).formRender({
            formData : formDataTemp,
            dataType: 'json'
          });
        });
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log(JSON.stringify($(this.fbRender.current).formRender("userData")));
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
            <button type="button" onClick={handleSubmit}></button>
          </div>
        );
      }
}
  
  export default Survey;