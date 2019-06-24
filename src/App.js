<<<<<<< HEAD
import React from "react";
import { Switch, Route } from "react-router-dom";
//import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import CpuList from "./components/CpuList";
import CellList from "./components/CellList";
import LaptopList from "./components/LaptopList";
import Default from "./components/Default";
import Details from "./components/Details";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import ManageItems from "./components/ManageItems";
import ManageUsers from "./components/ManageUsers";
import ManageOrders from "./components/ManageOrders";
import TestList from "./components/TestList";
import EditDetail from "./components/EditDetail";
import { ProductConsumer } from "./context";

function App() {
  return (
    <React.Fragment>
      <ProductConsumer>
        {value => {
          return <Navbar value={value} />;
        }}
      </ProductConsumer>
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/cellphones" component={CellList} />
        <Route exact path="/cpus" component={CpuList} />
        <Route exact path="/laptops" component={LaptopList} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/edit/:id" component={EditDetail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/manageitems" component={ManageItems} />
        <Route exact path="/manageusers" component={ManageUsers} />
        <Route exact path="/manageorders" component={ManageOrders} />
        <Route exact path="/test" component={TestList} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </React.Fragment>
=======
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> 6cefbd8... Initial commit from Create React App
  );
}

export default App;
