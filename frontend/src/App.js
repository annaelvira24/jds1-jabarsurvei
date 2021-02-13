import logo from './logo.svg';
import './App.css';
import './assets/scss/App.scss';
import Navigation from './components/Navigation';
import Demo from './components/Demo';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Demo/>
    </div>
  );
}

export default App;
