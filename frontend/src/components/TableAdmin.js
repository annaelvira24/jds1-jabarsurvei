import React from 'react';
import {Row, FormControl, Button, Container, Form, Modal} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Component, createRef, useState } from "react";
import { useHistory, useRef } from "react-router-dom";
import ModalPopUp from './ModalPopUp.js'
import http from "../http-common";
import '../assets/css/Table_comp.css';

class TableAdmin extends Component {
    state = {
        status : undefined,
        headingText : undefined,
        surveyLink : undefined
    };

    constructor(props){
        super(props);
        this.state.status = '';
        this.state.headingText = '';
        this.state.surveyLink = '';
    };

    ModalRef = ({handleShow}) => {
        this.showModal = handleShow;
    }
     
    onSurveyClick = () => {
       this.showModal();
    }
     

    handleGenLink(e, idSurvey, idAdmin){
        e.preventDefault();
        console.log(idSurvey);
        console.log(idAdmin);

        http.post(`http://localhost:5000/api/surveyLink/createLink`, {
            id_survey : idSurvey,
            id_admin : idAdmin
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            status : 'create',
            headingText : 'Link survei Anda berhasil dibuat!',
            surveyLink : res.data
          })
          this.onSurveyClick();
        })
    };

    handleShowLink(e, idSurvey){
        e.preventDefault();
        console.log(idSurvey);

        http.get(`http://localhost:5000/api/surveyLink/`+ idSurvey)
        .then((res) => {
          console.log(res.data[0].randomlink);
          this.setState({
            status : 'view',
            headingText : 'Berikut link survei Anda',
            surveyLink : res.data[0].randomlink
          })
          this.onSurveyClick();
        })
    }

    render(){
        return(
            <div className='Table-Container'>
                <ModalPopUp 
                    ref={this.ModalRef}
                    status={this.state.status}
                    modalHeading={this.state.headingText}
                    link = {this.state.surveyLink}
                />
                <Container className='Table2-Container'>
                    <Row className="SearchBar-Container">
                        <SearchBar on_search={ this.props.onSearch }/>
                    </Row>
                    <BootstrapTable striped responsive="sm" hover size="sm" className="List-Table">
                            <thead>
                                <tr style = {{width: '100px'}}>
                                {this.props.daftar_coloumn.map((coloumn) => (
                                    <th className = 'table-header'>{coloumn.text}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.daftar_survey.map((survey, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{survey.survey_title}</td>
                                        <td>{survey.decription}</td>
                                        {(survey.randomLink !== null)
                                            && (<td><Button variant = "default" className = "t-blue btn-sm" onClick = {(e) => this.handleShowLink(e,survey.id_survey)} >Lihat Link</Button></td>
                                        )}
                                        {(survey.randomLink == null)
                                            && (<td><button className = "t-blue btn-sm" onClick = {(e) => this.handleGenLink(e,survey.id_survey,survey.id_admin)}>Buat Link</button></td>
                                        )}
                                        <td><Button variant="default" className = "btn t-yellow btn-sm" onClick = "handleGenLink">Edit</Button></td>
                                        <td><Button variant="danger" className = "btn-sm">Hapus</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                    </BootstrapTable>      
                </Container>
            </div>
        );
    }
  };

const SearchBar = ({on_search}) => {
    const searchRef = createRef();

    const search = (e) => {
        e.preventDefault();
        const query = searchRef.current.value;
        console.log(query);
        on_search(query);
    }

    return (
        <Form inline onSubmit={ search }>
            {/* <Form.Control size="sm" type="text" placeholder="Search" /> */}
            <FormControl placeholder = "Pencarian" type="text" className="mr-sm-2" ref={ searchRef } />
            <Button type="submit">Cari</Button>
        </Form>
    )
};

export default TableAdmin;