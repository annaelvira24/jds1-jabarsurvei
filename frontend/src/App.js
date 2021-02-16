import logo from './logo.svg';
import './App.css';
import './assets/scss/App.scss';
import Navigation from './components/Navigation';
import Demo from './components/Demo';
import CreateSurvey from './components/CreateSurvey';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <CreateSurvey/>
    </div>
  );
}

export default App;
