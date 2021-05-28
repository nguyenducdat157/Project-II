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
import FormInput from './components/FormInput/formInput';
import CartView from './Pages/Cart/cartView';
import CreateProduct from './Pages/CreateProduct';
import EditProduct from './Pages/EditProduct';
import ProductList from './Pages/ListProducts';
import ProductDetail from './Pages/ProductDetail';
import OrdersList from './Pages/ListOrder';
import SearchPage from './Pages/Search';
import OrderDetail from './Pages/orderDetail';
import WishlistPage from './Pages/Wishlist';
import Dashboard from './Pages/Admin/dashboard';


function App() {
  return (
    <Router>
      {/* general routes */}
      <Route path="/" exact component={HomePage} />
      <Route path="/account" exact component={AccountPage} />
      <Route path="/collections" exact component={CollectionPage} />
      <Route path="/collections/:type" exact component={CollectionPage} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/register" exact component={Signup} />
      <Route path="/product-detail" exact={false} component={ProductDetail} />
      <Route path="/search" component={SearchPage} />
      <Route path="/listOrder" exact component={OrdersList} />
      <Route path="/order-detail" exact={false} component={OrderDetail} />
      {/* registered user routes */}
      <Route path="/checkout" exact component={Checkout} />
      {/* admin routes /> */}
      <Route path="/admin/editProduct/:id" exact component={EditProduct} />
      <Route path="/admin/createProduct" exact component={CreateProduct} />
      <Route path="/cart" exact component={CartView} />
      <Route path="/admin/listProduct" exact component={ProductList} />
      <Route path="/admin/listOrder" exact component={OrdersList} />

      
      <Route path="/customer/wishlist" exact={false} component={WishlistPage} />
      <Route path="/admin" exact component={Dashboard} />
    </Router>

  );
}

export default App;
