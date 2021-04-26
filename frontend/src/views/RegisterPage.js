import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Validator from 'validator';
import http from "../http-common";
import './../assets/css/RegisterPage.css'
import { setUserCookie } from './../util/Common';
import Logo from './../assets/image/logo.png';

class Register extends Component{
    state = {
        cookie: undefined,
        errors: undefined
    }

    constructor(){
        super();
        this.state.valid = false;
        this.state.errors = {
            "phone" : true,
            "pass" : true,
            "gender" : true,
            "email" : true
        };
        this.handleGenderValidation = this.handleGenderValidation.bind(this);
        this.handlePhoneValidation = this.handlePhoneValidation.bind(this);
        this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
        this.handleEmailValidation = this.handleEmailValidation.bind(this);
    }

    handleGenderValidation(){
        let errors = this.state.errors;
        let gender = document.getElementById('gender-input');
        if(gender.value === 'laki-laki' || gender.value === 'perempuan'){
            errors["gender"] = false;
        }
        else{
            errors["gender"] = true;
        }
    }

    handlePhoneValidation(){
        let errors = this.state.errors;
        let phone = document.getElementById('phone-input');
        if(!Number(phone.value) || phone.value.length <7){
            phone.style.borderColor = 'red';
            errors["phone"] = true;
        }
        else if(phone.value.length>0){
            phone.style.borderColor = '#ccc';
            errors["phone"] = false;
        }
    }

    handleEmailValidation(){
        let errors = this.state.errors;
        let email = document.getElementById('email-input');
        if(!Validator.isEmail(email.value)){
            errors["email"] = true;
            email.style.borderColor = 'red';
        }
        else{
            errors["email"] = false;
            email.style.borderColor = '#ccc';
        }
    }

    handlePasswordValidation(){
        let errors = this.state.errors;
        let password = document.getElementById('password-input');
        let confirmPassword = document.getElementById('confirm-password-input');

        if(password.value !== confirmPassword.value){
            password.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
            errors["pass"] = true;
            document.getElementById('false-msg').innerHTML = `Konfirmasi password tidak cocok`;
        }
        else if(password.value.length>0){
            password.style.borderColor = '#ccc';
            confirmPassword.style.borderColor = '#ccc';
            errors["pass"] = false;
            document.getElementById('false-msg').innerHTML = ``;
        }

    }

    handleRegister(e){
        if(!this.state.errors["phone"] && !this.state.errors["pass"] && !this.state.errors["gender"] && !this.state.errors["email"]){
            e.preventDefault();

            let username = document.getElementById('username-input').value;
            let gender = document.getElementById('gender-input').value;
            let city = document.getElementById('city-input').value;
            let phone = document.getElementById('phone-input').value;
            let email = document.getElementById('email-input').value;
            let password = document.getElementById('password-input').value;
            
    
            http.post('/api/admin/register', 
            { 
                email : email,
                password : password,
                username : username,
                gender : gender,
                city : city,
                phone : phone
             })
            .then(res => {
                console.log(res);
                if(res.status === 200){
                    setUserCookie([res.data.data]);
                    window.location.href="/dashboard"
                }
                else{
                    document.getElementById('false-msg').innerHTML = `Isikan semua data dengan benar`;
                }   
            })
        }
        
        else{
            e.preventDefault();
            document.getElementById('false-msg').innerHTML = `Isikan semua data dengan benar`;
        }
        
    }

    clearSpan = async (field) => {
        document.getElementById(field).style.borderColor = '#ccc';
        document.getElementById('false-msg').innerHTML = ``;
    }

    render(){
        return(
            <div className="wrapper-register">
                <img src={Logo} className = "logo"/>
                <div className="container-register">
                    <form className="register-form">  
                        <div className="form-group">
                            <input type="text" id="username-input" className="form-control" placeholder="Nama" onClick={this.clearSpan.bind(this,"username-input")}/>
                        </div>

                        <div className="form-group">
                            <select id="gender-input" className="form-control" placeholder="Jenis Kelamin" onChange = {this.handleGenderValidation} onClick={this.clearSpan.bind(this,"gender-input")}>
                                <option value=''>Jenis Kelamin</option>
                                <option value='laki-laki'>Laki-laki</option>
                                <option value='perempuan'>Perempuan</option>
                            </select>
                        </div>

                        <Row>
                            <Col>
                                <div className="form-group">
                                    <input type="text" id="city-input" className="form-control" placeholder="Kota" onClick={this.clearSpan.bind(this, "city-input")}/>
                                </div>                            
                            </Col>

                            <Col>                      
                                <div className="form-group">
                                    <input id="phone-input" className="form-control" placeholder="No Telepon" onBlur = {this.handlePhoneValidation} onClick={this.clearSpan.bind(this,"phone-input")}/>
                                </div>    
                            </Col>
                        </Row>
                        
                        <div className="form-group">
                            <input type="text" id="email-input" className="form-control" placeholder="Email" onBlur = {this.handleEmailValidation} onClick={this.clearSpan.bind(this, "email-input")}/>
                        </div>
                
                        <div className="form-group">
                            <input type="password" id="password-input" className="form-control" placeholder="Password" onClick={this.clearSpan.bind(this, "password-input")}/>
                        </div>

                        <div className="form-group">
                            <input type="password" id="confirm-password-input" className="form-control" placeholder="Ulangi Password" onChange = {this.handlePasswordValidation} onClick={this.clearSpan.bind(this, "confirm-password-input")}/>
                            <span id="false-msg" className="input-message"></span>
                        </div>
                        <Button type="submit" id="btn-register" className="btn t-blue btn-block" onClick={(e) => this.handleRegister(e)}>Daftar</Button>
                        
                        <div id = "login">
                            <span>Sudah punya akun? </span>
                            <a href={'/login'}>Masuk</a>
                        </div>
                    
                    </form>
                </div>
            </div>
            
        );
    }
}

export default Register;
