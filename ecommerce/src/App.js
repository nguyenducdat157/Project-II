import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './Pages/Homepage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AccountPage from './Pages/Account';

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/account" exact component={AccountPage} />

    </Router>

  );
}

export default App;
