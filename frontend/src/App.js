import logo from './logo.svg';
import './App.css';
import './assets/scss/App.scss';
import Navigation from './components/Navigation';
import Demo from './components/Demo';
import LoginPage from './views/LoginPage'

function App() {
  return (
    <div className="App">
      <Navigation/>
      <LoginPage/>
    </div>
  );
}

export default App;
