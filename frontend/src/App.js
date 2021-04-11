import React from 'react';
import './assets/scss/App.scss';
import './assets/css/Theme.css';
import './App.css';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Survey from './views/Survey';
import Result from './views/Result';
import ResultSummary from './views/ResultSummary';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import DashboardAdmin from './views/DashboardAdmin';
import Navbar from './components/Navigation';
import CreateSurvey from './components/CreateSurvey';
import { getUser } from './util/Common';

import FormBuilder from './views/FormBuilder';
import SubmitFeedback from './views/SubmitFeedback';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
      <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/survey/:link" component={Survey}/>
          <Route exact path="/result/:link" component={Result}/>
          <Route exact path="/result/:link/summary" component={ResultSummary}>
            { (!getUser()) && (<Redirect to="/" />) }
          </Route>
          <Route exact path="/login" component={LoginPage}>
            { (getUser()) && (<Redirect to="/" />) }
          </Route>
          <Route exact path="/register" component={RegisterPage}>
            { (getUser()) && (<Redirect to="/" />) }
          </Route>
          <Route exact path="/dashboard" component={DashboardAdmin}>
            { (!getUser()) && (<Redirect to="/" />) }
          </Route>
          <Route exact path="/create-survey" component={CreateSurvey}>
            { (!getUser()) && (<Redirect to="/" />) }
          </Route>
          <Route exact path="/FormBuilder/create" component={FormBuilder}/>
          <Route path="/FormBuilder/edit/id=:id" component={FormBuilder}/>
          <Route exact path="/:link/success" component={SubmitFeedback}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
