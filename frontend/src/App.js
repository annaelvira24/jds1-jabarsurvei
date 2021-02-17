import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Survey from './views/Survey';

import logo from './logo.svg';
import './App.css';
import './assets/scss/App.scss';
import Navigation from './components/Navigation';
import Demo from './components/Demo';

function App() {

  return (
    <Router>
      <div className="App">
      <Navigation/>
      <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/Survey" component={Survey}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
