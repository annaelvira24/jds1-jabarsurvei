import React, { Component } from 'react';
import http from "../http-common";



class Survey extends Component {

    state = {
        idSurvey : undefined,
        surveyTitle : undefined,
        surveyDescription : undefined
    }

    componentDidMount(){
        this.state.idSurvey = this.props.match.params.id;
        console.log(this.state.idSurvey);
        http.get('http://localhost:5000/api/listSurvey/id/' + this.state.idSurvey)
        .then(res => {
            const title = res.data[0].survey_title;
            const description = res.data[0].decription;

            this.setState({
                surveyTitle : title,
                surveyDescription : description
            });
        });

        
    }

    render(){
        return (
            <div>
                <h2>{ this.state.surveyTitle }</h2>
                <br/>
                <h3>{ this.state.surveyDescription }</h3>     
            </div>
        );
    }
   
  }
  
  export default Survey;