import React from 'react';
import './assets/scss/App.scss';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Survey from './views/Survey';
import LoginPage from './views/LoginPage';
import FormBuilder from './views/FormBuilder';

function App() {

  return (
    <Router>
      <div className="App">
      <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/Survey" component={Survey}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/FormBuilder" component={FormBuilder}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
