import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import http from "../http-common";
import "./../assets/css/SubmitFeedback.css";

class SubmitFeedback extends Component {
    state = {
        prevLink: undefined
    }

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        window.location.href = "/";
    }

    componentDidMount() {
        if (this.props.match)
            this.state.prevLink = this.props.match.params.link;

        if(this.state.prevLink !== undefined){
            http.get('http://localhost:5000/api/surveyFill/getSurvey/' + this.state.prevLink)
            .then(res => {          
                if(res.data[0] !== undefined){
                    this.setState({
                    id: res.data[0].id_survey,
                    title: res.data[0].survey_title,
                    desc : res.data[0].decription
                    });
                }
                else{
                    this.setState({title: "Survey Tidak Ditemukan"});
                }
            }); 
        }
    }

    render(){
        return (
            <div id = "survey-container">
                <div id = "survey-title-container">
                <p id="survey-title">{this.state.title}</p>
                <p id="survey-description">{this.state.desc}</p>
                </div>
    
                <div id="survey-main">
                    <h5 id="feedback-response">Terima kasih! Jawaban Anda sudah terkirim.</h5>
                    <br/>
                    <a id="link" href={"/survey/" + this.state.prevLink}>Isi survei ini lagi</a>
                    <br/>
                    <a id="link" href="/">Kembali ke beranda</a>
                </div>
            </div>
        )
    }
}

export default SubmitFeedback;