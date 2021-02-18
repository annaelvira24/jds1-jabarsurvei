import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './../assets/css/LoginPage.css'

class Login extends Component{
    state = {
        cookie: undefined
    }

    constructor(){
        super();
        let cookie = new Cookies();
        this.state.cookie = cookie.get("admin");
    }



    render(){
        return(
            <div className="wrapper-login">
                <h3>JABAR CROWDSOURCE</h3>
                <div className="container-login">
                    <form class="login-form">             
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-t-blue btn-block">Log in</button>
                    </form>
                </div>
            </div>
            
        );
    }
}

export default Login;
