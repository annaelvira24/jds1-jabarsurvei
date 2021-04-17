import React from 'react';
import {Row, Col, InputGroup, FormControl, Button, Container, Form} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Component, createRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
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

        this.cellButtonStatus = this.cellButtonStatus.bind(this);
        this.cellButtonLink = this.cellButtonLink.bind(this);
    };

    ModalRef = (obj) => { 
        this.showModal = obj && obj.handleShow 
     }
     
    onSurveyClick = () => {
       this.showModal();
    }

    handleShowLink(e, idSurvey){
        e.preventDefault();
        http.get(`http://localhost:5000/api/surveyLink/`+ idSurvey)
        .then((res) => {
          console.log(res.data[0].randomlink);
          this.setState({
            status : 'view',
            headingText : 'Berikut link survei Anda',
            surveyLink : 'http://localhost:3000/survey/' + res.data[0].randomlink
          })
          this.onSurveyClick();
        })
    }

    handleUpdateStatus(e, idSurvey, status){
        e.preventDefault();
        http.post(`http://localhost:5000/api/surveyAdmin/updateStatus`, {
            id : idSurvey,
            status : status
        })
        .then((res) => {
            window.location.reload();
         })
    }

    cellLink (cell, row){
        console.log(cell);
        return (<div><a id="surveyLink" href={"/result/"+row.randomlink}>{cell}</a></div>);
    }


    cellButtonLink (cell, row){
        let theButton;
        if(row.randomlink != null){
            theButton = <Button variant = "default" className = "t-blue btn-sm" onClick = {(e) => this.handleShowLink(e,row.id_survey)}>
                            <FontAwesomeIcon icon={faLink}/> Lihat Link
                        </Button>
        } 
        else {
            theButton = <Button variant="default" className = "t-blue btn-sm" onClick = {(e) => this.handleGenLink(e, row.id_survey, row.id_admin)}>
                            Buat Link
                        </Button>
        }
        return theButton;
    }

    cellButtonStatus (cell, row){
        let theButton;
        if(row.status == 'Aktif'){
            theButton = <Button variant = "danger" className = "btn-sm" onClick = {(e) => this.handleUpdateStatus(e, row.id_survey, 'Non-aktif')}>
                            Non-aktifkan
                        </Button>
        }
        else{
            theButton = <Button variant = "default" className = "t-green btn-sm" onClick = {(e) => this.handleUpdateStatus(e, row.id_survey, 'Aktif')}>
                            Aktifkan
                        </Button>
        }
        return theButton;
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
                    <Col xs={12} md={9}>
                        <SearchBar on_search={ this.props.onSearch }/>
                    </Col>
                    <Col xs={12} md={3} className="justify-content-md-right">
                        <Button variant="default" className='t-green' id="button-create" onClick = {event =>  window.location.href='/formbuilder/create'}>
                            <FontAwesomeIcon icon={faPlus} /> Survei Baru
                        </Button>
                    </Col>
                    </Row>
                    <div className="table-container">
                        <div className="table-survey">
                            <BootstrapTable data={this.props.daftar_survey} striped hover>
                                <TableHeaderColumn isKey dataField="id_survey" width="5%">Id</TableHeaderColumn>
                                <TableHeaderColumn dataField='survey_title' dataFormat={this.cellLink} width="22%">Judul Survei</TableHeaderColumn>
                                <TableHeaderColumn dataField='decription' width="30%">Deskripsi Survei</TableHeaderColumn>
                                <TableHeaderColumn dataField='status' width="9%">Status</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' width="13%" dataFormat={this.cellButtonStatus}>Ubah Status</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' width="12%" dataFormat={this.cellButtonLink}>Link</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
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
        <Form id="searchbar-form-admin" onSubmit={ search }>
            <InputGroup>
                    <FormControl id="searchBar" placeholder="Pencarian..." type="text" ref={ searchRef } />
                    <InputGroup.Append>
                        <Button className="t-blue" type="submit"><FontAwesomeIcon icon = {faSearch}/></Button>
                    </InputGroup.Append>
            </InputGroup>
        </Form>
    )
};

export default TableAdmin;