import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartPie } from '@fortawesome/free-solid-svg-icons'
import {Pie, HorizontalBar, Bar} from 'react-chartjs-2';
import http from "../http-common";
import { getUser } from './../util/Common.js';
import './../assets/scss/Result.scss'

class ResultSummary extends Component {
    fbRender = createRef();
    hideButton = createRef();

    state = {
      cookie: undefined,
      surveyResult : undefined,
      idSurvey : undefined,
      idAdmin : undefined,
      link : undefined,
      count : undefined,
      title : undefined,
      desc : undefined,
      isOwner : false,
      colors : undefined
    }

    constructor(){
      super();
      this.state.cookie = getUser();
      this.state.idAdmin = JSON.parse(atob(this.state.cookie))[0].id_admin;
      this.state.colors = [
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(240, 175, 147, 0.4)',
        'rgba(230, 205, 156, 0.4)',
        'rgba(219, 215, 146, 0.4)',
        'rgba(10, 10, 10, 0.4)',
        'rgba(100, 10, 230, 0.4)',
      ]

      this.getSummary = this.getSummary.bind(this);
    }

    componentDidMount() {
      if (this.props.match)
        this.state.link = this.props.match.params.link;

      if(this.state.link !== undefined){
      http.get('http://localhost:5000/api/surveyRes/getResult/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              if(this.state.idAdmin == res.data[0].id_admin){
                this.setState({
                  title: res.data[0].survey_title,
                  desc : res.data[0].decription,
                  isOwner : true
                });
              }
            }
        });

        http.get('http://localhost:5000/api/surveyRes/getAnswerByLink/' + this.state.link)
        .then(res => {          
            if(res.data[0] !== undefined){
              this.setState({
                  surveyResult : res.data
              });
              http.get('http://localhost:5000/api/surveyRes/getQuestionCount/' + this.state.link)
              .then(res => {          
                  if(res.data[0] !== undefined){
                    this.setState({
                        count : res.data[0].count
                    });
                  }
              });
            }
        });
      }
    }

    splitMap(data){
      return ({keys: Array.from(data.keys()) , values: Array.from(data.values())});
    }

    randomColors(){
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + "," + 0.4 + ")";
    }

    getSummary = () => {
        const array = [];
        let theTable;
        let theQuestion;
        let arraySlice = [];
        let num = this.state.count;
        if(this.state.surveyResult !== undefined){
          let arrayResult = this.state.surveyResult
        
          for(var i = 0; i < num; i++){
              arraySlice = arrayResult.slice(i*arrayResult.length/num, (i+1)*arrayResult.length/num );
              let question = JSON.parse(arraySlice[0].details);
            
              if(question.type == "checkbox-group"){
                let mapResult = new Map();
                for (var j = 0; j < arraySlice.length; j++){
                  if(arraySlice[j].answer !== ""){
                    let ans = (JSON.parse(arraySlice[j].answer));
                    for (var k = 0; k<ans.length; k++){
                      if (mapResult.has(ans[k])){
                        mapResult.set(ans[k], mapResult.get(ans[k])+1);
                      }
                      else{
                        mapResult.set(ans[k],1);
                      }
                    }
                  }
                }
                theQuestion = 
                <h5 id="question-title">{question.label}</h5>
                array.push(theQuestion);

                let chartData = this.splitMap(mapResult);

                let dataset = {
                  labels: chartData.keys,
                  datasets: [
                    {
                      data: chartData.values,
                      backgroundColor: 'rgba(187, 217, 132, 0.5)',
                      borderWidth: 1,
                    },
                  ],
                };

                let option = {
                  tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = arrayResult.length/num;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue/total*100).toFixed(1));
                        return currentValue + ' (' + percentage + '%)';
                      }
                    }
                  },
                  scales: {
                    xAxes: [{
                      ticks: {
                        min: 0,
                        stepSize: 1
                      }
                    }]
                  },
                  legend: {
                    display: false,
                  }
                };

                let theChart = 
                <div className="chart-container">
                  <HorizontalBar
                    data = {dataset}
                    options = {option}
                  />
                </div>
                array.push(theChart);
              }

              else if(question.type == "number"){
                let mapResult = new Map();
                for (var j = 0; j < arraySlice.length; j++){
                  if(arraySlice[j].answer !== ""){
                    let ans = arraySlice[j].answer;
                      if (mapResult.has(ans)){
                        mapResult.set(ans, mapResult.get(ans)+1);
                      }
                      else{
                        mapResult.set(ans,1);
                      }
                  }
                }

                if(mapResult.size <= 10){
                  theQuestion = <h5 id="question-title">{question.label}</h5>
                  array.push(theQuestion);

                  let chartData = this.splitMap(mapResult);

                  let dataset = {
                    labels: chartData.keys,
                    datasets: [
                      {
                        data: chartData.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.4)',
                        borderWidth: 1,
                      },
                    ],
                  };

                  let option = {
                    tooltips: {
                      callbacks: {
                        label: function(tooltipItem, data) {
                          var dataset = data.datasets[tooltipItem.datasetIndex];
                          var total = arraySlice.length
                          var currentValue = dataset.data[tooltipItem.index];
                          var percentage = parseFloat((currentValue/total*100).toFixed(1));
                          return currentValue + ' (' + percentage + '%)';
                        }
                      }
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          min: 0,
                          stepSize: 1
                        }
                      }]
                    },
                    legend: {
                      display: false,
                    }
                  };

                  let theChart = 
                  <div className="chart-container">
                    <Bar
                      data = {dataset}
                      options = {option}
                    />
                  </div>
                  array.push(theChart);
                }

                else{
                    theTable = 
                    <div id="result-table">
                      <div className="table-container">
                        <div className="table-survey">
                          <BootstrapTable data={arraySlice} striped hover>
                              <TableHeaderColumn isKey dataField="answer">{question.label}</TableHeaderColumn>
                          </BootstrapTable>
                        </div>
                      </div>
                    </div>
                    array.push(theTable)
                }
              }

              else if(question.type == "select" || question.type == "radio-group"){
                let mapResult = new Map();
                for (var j = 0; j < arraySlice.length; j++){
                  if(arraySlice[j].answer !== ""){
                    let ans = arraySlice[j].answer;
                      if (mapResult.has(ans)){
                        mapResult.set(ans, mapResult.get(ans)+1);
                      }
                      else{
                        mapResult.set(ans,1);
                      }
                  }
                }
                theQuestion = <h5 id="question-title">{question.label}</h5>
                array.push(theQuestion);

                let chartData = this.splitMap(mapResult);

                let chartColor = this.state.colors.slice(0, chartData.keys.length);
                if(chartData.keys.length > 10){
                  for (var i = 0; i<chartData.keys.length-10; i++){
                    chartColor.push(this.randomColors());
                  }
                }

                let dataset = {
                  labels: chartData.keys,
                  datasets: [
                    {
                      data: chartData.values,
                      backgroundColor: chartColor,
                      borderWidth: 1,
                    },
                  ],
                };

                let option = {
                  tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        var total = meta.total;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue/total*100).toFixed(1));
                        return currentValue + ' (' + percentage + '%)';
                      },
                      title: function(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                      }
                    }
                  }
                };

                let theChart = 
                <div className="chart-container">
                  <Pie
                    data = {dataset}
                    options = {option}
                  />
                </div>
                array.push(theChart);
              }

              else if(question.type == "alamat"){
                let mapResult = new Map();
                let beautifulResult = [];
                for (var j = 0; j < arraySlice.length; j++){
                  if(arraySlice[j].answer !== ""){
                    beautifulResult.push({"answer" : JSON.parse(arraySlice[j].answer).reverse().join(", ")});
                    let ans = (JSON.parse(arraySlice[j].answer))[0];
                      if (mapResult.has(ans)){
                        mapResult.set(ans, mapResult.get(ans)+1);
                      }
                      else{
                        mapResult.set(ans,1);
                      }
                  }
                }

                theTable = 
                <div id="result-table">
                  <div className="table-container">
                    <div id="table-survey-result">
                      <BootstrapTable data={beautifulResult} striped hover>
                          <TableHeaderColumn isKey dataField="answer">{question.label}</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
                array.push(theTable)

                theQuestion = <h5 id="question-title">Provinsi</h5>
                array.push(theQuestion);

                let chartData = this.splitMap(mapResult);

                let dataset = {
                  labels: chartData.keys,
                  datasets: [
                    {
                      data: chartData.values,
                      backgroundColor: 'rgba(255, 99, 132, 0.4)',
                      borderWidth: 1,
                    },
                  ],
                };

                let option = {
                  tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = arraySlice.length
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue/total*100).toFixed(1));
                        return currentValue + ' (' + percentage + '%)';
                      }
                    }
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        min: 0,
                        stepSize: 1
                      }
                    }]
                  },
                  legend: {
                    display: false,
                  }
                };

                let theChart = 
                <div className="chart-container">
                  <Bar
                    data = {dataset}
                    options = {option}
                  />
                </div>
                array.push(theChart);
              }

              else{
                theTable = 
                <div id="result-table">
                  <div className="table-container">
                    <div className="table-survey">
                      <BootstrapTable data={arraySlice} striped hover>
                          <TableHeaderColumn isKey dataField="answer">{question.label}</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
                array.push(theTable)
              }
          }
        }
        else if(this.state.desc !== undefined){
          let emptyResponse =
          <span>Belum ada respons untuk survei ini</span>
          array.push(emptyResponse);
        }
          
        return array
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
              <Button variant="default" className="t-blue" id="button-table" onClick = {event =>  window.location.href='/result/'+ this.state.link}>
                <FontAwesomeIcon icon={faTable} /> Tabel
              </Button>
              <Button variant="default" id="button-visual">
                <FontAwesomeIcon icon={faChartPie} /> Visualisasi
              </Button>
            </div>
            <div id = "result-summary-container">
              <div id = "result-summary">  
                <div id="result-main">
                  {this.getSummary()}
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
  
export default ResultSummary;