import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Survey from './views/Survey';


function App() {

  return (
    <Router>
      <div className="App">
      <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/Survey" component={Survey}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
