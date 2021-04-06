import { Row, Col, FormControl, Button, Container, Form} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { createRef, Component } from "react";
import { useRef } from "react-router-dom";
import React from 'react';
import '../assets/css/Table_comp.css';

class Table_comp extends Component {
    constructor(props){
        super(props);
    }

    cellLink (cell, row){
        console.log(cell);
        return (<div><a id="surveyLink" href={"/survey/"+row.randomlink}>{cell}</a></div>);
    }

    render(){
        return(
            <div className='Table-Container'>
                <Container className='Table2-Container'>
                    <Row className="SearchBar-Container">
                        <SearchBar on_search={ this.props.onSearch }/>
                    </Row>
                    <BootstrapTable data={this.props.daftar_survey} striped hover>
                        <TableHeaderColumn isKey dataField="id_survey" width="5%">Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='survey_title' dataFormat={this.cellLink} width="30%">Judul Survei</TableHeaderColumn>
                        <TableHeaderColumn dataField="username" width="15%">Pembuat Survei</TableHeaderColumn>
                        <TableHeaderColumn dataField='decription' width="50%">Deskripsi Survei</TableHeaderColumn>
                    </BootstrapTable>
                </Container>
            </div>
        );
    }
};

const SearchBar = ({on_search}) => {
    const searchRef = createRef();

    const search = (e) => {
        e.preventDefault()
        const query = searchRef.current.value
        console.log(query)
        on_search(query)
    }

    return (
        <Form inline onSubmit={ search }>
            <Row>
                <Col sm>
                    <FormControl id="searchBar" placeholder="Pencarian..." type="text" className="mr-sm-2" ref={ searchRef } />
                </Col>
                <Col sm>
                    <Button className="t-blue" type="submit">Cari</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Table_comp;