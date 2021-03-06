import $ from "jquery";
import React, { Component, createRef } from "react";
import { Table, Button } from "react-bootstrap";
import xlsx from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartPie, faDownload } from '@fortawesome/free-solid-svg-icons'
import http from "../http-common";
import { getUser } from './../util/Common.js';
import './../assets/scss/Result.scss'

var formDataTemp = [];
var surveyResult = [];

window.jQuery = $;
window.$ = $;

class Result extends Component {
    fbRender = createRef();
    hideEverything = createRef();

    state = {
      cookie: undefined,
      idSurvey : undefined,
      idAdmin : undefined,
      link : undefined,
      id : '',
      title : '',
      desc : '',
      isOwner : false
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;
    }

    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      // edit existing survey
      if(this.state.link !== undefined){
        http.get('/api/surveyRes/getResult/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              if(this.state.idAdmin == res.data[0].id_admin){
                this.setState({
                  id: res.data[0].id_survey,
                  title: res.data[0].survey_title,
                  desc : res.data[0].decription,
                  isOwner : true
                });
              }

              var checkboxes = [];
              var alamat = [];
              for (var i = 0; i<res.data.length; i++){
                if (JSON.parse(res.data[i].details).type == "checkbox-group"){
                  checkboxes.push(i);
                }
                else if (JSON.parse(res.data[i].details).type == "alamat"){
                  alamat.push(i);
                }
                formDataTemp.push(JSON.parse(res.data[i].details));
              }
              
              //remove unnesecary stuff like header etc.
              var retry = true;
              while(retry){
                retry = false;
                for (var i = 0; i<formDataTemp.length; i++){                
                  if(formDataTemp[i].required === undefined){
                    
                    formDataTemp.splice(i,1);
                    retry = true;
                  }
                }
              }
              //removed
              http.get('/api/surveyRes/getAnswerByLinkAlter/' + this.state.link)
              .then(res => {          
                  if(res.data[0] !== undefined){
                    surveyResult = res.data
                    const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
                    surveyResult = chunk(surveyResult,formDataTemp.length);

                    for (var i = 0; i<surveyResult.length; i++){
                      for (var item in checkboxes){
                        if(surveyResult[i][checkboxes[item]].answer.length > 0){
                          surveyResult[i][checkboxes[item]].answer = (JSON.parse(surveyResult[i][checkboxes[item]].answer).join(', '));
                        }
                      }

                      for (var item in alamat){
                        if(surveyResult[i][alamat[item]].answer.length > 0){
                          surveyResult[i][alamat[item]].answer = ((JSON.parse(surveyResult[i][alamat[item]].answer)).reverse().join(', '));
                        }
                      }

                      var order = {answer : i+1}
                      var curtime = new Date(surveyResult[i][0].submit_time);

                      var submit_time = {answer : (/[A-z]{3} [0-9]{2}.*.GMT.[0-9]{4}/.exec(curtime.toString()))}
                      surveyResult[i].unshift(order)
                      surveyResult[i].push(submit_time)
                    }
                    this.forceUpdate();
                  }
              });
              this.forceUpdate();
            }
            else{
              this.setState({title: "Survey Tidak Ditemukan"});
              $(this.hideEverything.current).toggle();
            }
        });
      }
    }

    exportXLSX(){
      console.log("WIP");
      let jsonxlsx = [];
      for(var i = 0;i<surveyResult.length;i++){
        var parser = '{'
        for(var j = 0; j < formDataTemp.length+2;j++){
          if(j==0){
            parser+='"No":"'+surveyResult[i][j].answer+'",';
          }
          else if(j == formDataTemp.length+1){
            parser+='"Waktu Mengisi":"'+surveyResult[i][j].answer+'"';
          }
          else{
            parser+='"'+ formDataTemp[j-1].label +'":"'+surveyResult[i][j].answer+'",';
          }
        }
        parser+='}';
        jsonxlsx.push(JSON.parse(parser));
      }
      console.log(jsonxlsx)
      var filename = this.state.title + ".xlsx";
      console.log(filename);
      let workbook = xlsx.utils.book_new(); 
      xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(jsonxlsx), "Sheet1"); 
      
      xlsx.writeFile(workbook,filename); 
    }

    render() {
      if(this.state.isOwner == true){
        return(
          <div id = "result-container"> 
            <div id="result-header-container">
              Hasil Survei
            </div>
            <div>
              <p id="result-title">{this.state.title}</p>
              <p id="result-description">{this.state.desc}</p>              
            </div>
            <div className="buttons">
              <Button variant="default" id="button-table">
                <FontAwesomeIcon icon={faTable} /> Tabel
              </Button>
              <Button variant="default" className="t-yellow" id="button-visual" onClick = {event =>  window.location.href='/result/'+ this.state.link + '/summary'}>
                <FontAwesomeIcon icon={faChartPie} /> Visualisasi
              </Button>
              <Button variant="default" className="t-green" id="button-excel" onClick={this.exportXLSX.bind(this)}>
                <FontAwesomeIcon icon={faDownload} /> <span id="download-text">Unduh File Excel</span>
              </Button>
            </div>
            <div id="result-main" ref={this.hideEverything}>
              <p>{}</p>
              <div className="table-container">
                <div className="table-survey">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        {formDataTemp.map((formDataTemp) =>(
                          <th>{formDataTemp.label}</th>
                        ))}
                        <th>Waktu Mengisi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveyResult.map((surveyResult) =>(
                        <tr>
                          {surveyResult.map((surveyResult) =>(
                            <td>{surveyResult.answer}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else{
        return(
          <div></div>
        );
      }    
    }
}
  
export default Result;