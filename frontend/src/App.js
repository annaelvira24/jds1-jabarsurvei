import React from 'react';
import './assets/scss/App.scss';
import './App.css';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Survey from './views/Survey';
import LoginPage from './views/LoginPage';
import DashboardAdmin from './views/DashboardAdmin';
import Navbar from './components/Navigation';
import { getUser } from './util/Common';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
      <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/survey" component={Survey}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/dashboard" component={DashboardAdmin}>
            { (!getUser()) && (<Redirect to="/" />) }
          </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
