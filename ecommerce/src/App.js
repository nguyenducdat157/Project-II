import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './Pages/Homepage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AccountPage from './Pages/Account';
import Checkout from './Pages/Checkout';
import SignIn from './Pages/Login';
import Signup from './Pages/Signup';
import AoPage from './Pages/Ao';
import CollectionPage from './Pages/Collections';
import QuanPage from './Pages/Quan';

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/account" exact component={AccountPage} />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/register" exact component={Signup} />
      <Route path="/collections/ao" exact component={AoPage} />
      <Route path="/collections" exact component={CollectionPage} />
      <Route path="/collections/quan" exact component={QuanPage} />
    </Router>

  );
}

export default App;
