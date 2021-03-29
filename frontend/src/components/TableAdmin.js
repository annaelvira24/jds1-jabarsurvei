import React from 'react';
import {Row, FormControl, Button, Container, Form} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Component, createRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalPopUp from './ModalPopUp.js'
import http from "../http-common";
import '../assets/css/Table_comp.css';

class TableAdmin extends Component {
    state = {
        status : undefined,
        headingText : undefined,
        surveyLink : undefined,
    };

    constructor(props){
        super(props);
        this.state = {
            status : '',
            headingText : '',
            surveyLink : '',
        };

        this.cellButtonLink = this.cellButtonLink.bind(this);
    };

    ModalRef = (obj) => { 
        this.showModal = obj && obj.handleShow 
     }
     
    onSurveyClick = () => {
       this.showModal();
    }

    handleGenLink(e, idSurvey, idAdmin){
        e.preventDefault();
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

    cellButtonLink (cell, row, enumObject, rowIndex){
        console.log(row);
        let theButton;
        if(row.randomlink != null){
            theButton = <Button variant = "default" className = "t-blue btn-sm" onClick = {(e) => this.handleShowLink(e,row.id_survey)}>
                            Lihat Link
                        </Button>
        } 
        else {
            theButton = <Button variant="default" className = "t-blue btn-sm" onClick = {(e) => this.handleGenLink(e, row.id_survey, row.id_admin)}>
                            Buat Link
                        </Button>
        }
        return theButton;
    }

    cellButtonEdit (cell, row, enumObject, rowIndex){
        return(
            <Button variant = "default" className = "t-yellow btn-sm" onClick = {(e) =>  window.location.href='/formbuilder/edit/id='+row.id_survey}>
                <FontAwesomeIcon icon={faEdit}/> Edit
            </Button>
        );
    }

    cellButtonDelete (cell, row, enumObject, rowIndex){
        return(
            <Button variant = "danger" className = "btn-sm" onClick = {(e) =>  window.location.href='/formbuilder/edit/id='+row.id_survey}>
                <FontAwesomeIcon icon={faTrash}/> Hapus
            </Button>
        );
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
                    <BootstrapTable data={this.props.daftar_survey} striped hover>
                        <TableHeaderColumn isKey dataField="id_survey" width="5%">Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='survey_title' width="25%">Judul Survei</TableHeaderColumn>
                        <TableHeaderColumn dataField='decription' width="40%">Deskripsi Survei</TableHeaderColumn>
                        <TableHeaderColumn dataField='button' width="10%" dataFormat={this.cellButtonLink}>Link</TableHeaderColumn>
                        <TableHeaderColumn dataField='button' width="9%" dataFormat={this.cellButtonEdit}>Edit</TableHeaderColumn>
                        <TableHeaderColumn dataField='button' width="11%" dataFormat={this.cellButtonDelete}>Hapus</TableHeaderColumn>
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