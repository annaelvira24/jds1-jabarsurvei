import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import http from "../http-common";
import './../assets/css/LoginPage.css'
import { setUserCookie } from './../util/Common';
import Logo from './../assets/image/logo.png';

class Login extends Component{
    state = {
        cookie: undefined
    }

    constructor(){
        super();
    }

    handleLogin(e){
        e.preventDefault();
        
        let email = document.getElementById('email-input').value;
        let password = document.getElementById('password-input').value;

        http.post('http://localhost:5000/api/admin/login', { email : email, password : password })
        .then(res => {
            console.log(res);
            if(res.data != null){
                setUserCookie(res.data);
                
                window.location.href="/dashboard"
            }
            else{
                document.getElementById('email-input').style.borderColor = 'red';
                document.getElementById('email-input').style.borderWidth = '1.5px';
                document.getElementById('password-input').style.borderColor = 'red';
                document.getElementById('password-input').style.borderWidth = '1.5px';
                document.getElementById('false-msg').style.color = 'red';
                document.getElementById('false-msg').innerHTML = `Email atau password salah`;
            }   
        })
    }

    clearSpan = async e => {
        document.getElementById('email-input').style.borderColor = '#ccc';
        document.getElementById('email-input').style.borderWidth = '1px';
        document.getElementById('password-input').style.borderColor = '#ccc';
        document.getElementById('password-input').style.borderWidth = '1px';
        document.getElementById('false-msg').innerHTML = ``;
    }

    render(){
        return(
            <div className="wrapper-login">
                <img src={Logo} className = "logo"/>
                <div className="container-login">
                    <form className="login-form">             
                        <div className="form-group">
                            <input type="email" id="email-input" className="form-control" placeholder="Email" onClick={this.clearSpan}/>
                        </div>
                
                        <div className="form-group">
                            <input type="password" id="password-input" className="form-control" placeholder="Password" onClick={this.clearSpan}/>
                            <span id="false-msg" className="input-message"></span>
                        </div>
                        <Button type="submit" id="btn-login" className="btn t-blue btn-block" onClick={(e) => this.handleLogin(e)}>Masuk</Button>
                        
                        <div id = "register">
                            <span id = "register-to">Belum punya akun? </span>
                            <a href={'/register'}>Daftar</a>
                        </div>
                    </form>

                </div>
            </div>
            
        );
    }
}

export default Login;
