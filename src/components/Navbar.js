import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { baseUrl } from './baseUrl';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isSignupOpen: false,
      username: ""
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleUnsign = this.handleUnsign.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  toggleSignup() {
    this.setState({ isSignupOpen: !this.state.isSignupOpen });
  }

  handleLogin(event) {
    console.log("this.state: ", this.username.value, this.password.value);
    fetch(baseUrl + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.username.value,
        password: this.password.value
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.access_token) {
          this.toggleModal();
          this.setState({ username: this.username.value });
          this.props.value.initialData(
            this.username.value,
            response.access_token
          );
          localStorage.username = this.username.value;
        } else if (response.status_code === 401) {
          alert("Invalid Cridential");
        } else {
          console.log(response.description);
        }
      })
      .catch(error => console.log(error));
    event.preventDefault();
  }

  handleSignup(event) {
    console.log("this.state: ", this.username.value, this.password.value);
    fetch(baseUrl + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.username.value,
        password: this.password.value,
        email: this.email.value
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "A username already exists") {
          alert("A username already exists");
        } else if (response.message === "User created successfully") {
          alert("Sined up successfully");
          this.toggleSignup();
        }
        console.log("response", response);
      })
      .catch(error => console.log("error:", error));
    event.preventDefault();
  }

  handleUnsign(event) {
    fetch(`${baseUrl}/user/${this.state.username}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(response => {
        console.log("response", response);
      })
      .catch(error => console.log("error:", error));
    event.preventDefault();
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({ username: "" });
    this.props.value.clearCart();
    localStorage.username = "";
  }

  render() {
    const isLoggedIn = localStorage.username !== "";
    const isAdmin = localStorage.username === "edgar";
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              products
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/cellphones" className="nav-link">
              Cellphone
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/cpus" className="nav-link">
              cpu
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/laptops" className="nav-link">
              laptop
            </Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <div>
            <Button onClick={this.handleLogout} style={{ margin: "10px" }}>
              Log Out
            </Button>
            <Button onClick={this.handleUnsign} color="danger">
              Unsign
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={this.toggleModal}
              color="success"
              style={{ margin: "10px" }}
            >
              Log In
            </Button>
            <Button onClick={this.toggleSignup} color="warning">
              Signup
            </Button>
          </div>
        )}

        {isAdmin ? (
          <div>
            <Link to="/manageusers" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-user-edit" />
                </span>
                Edit Users
              </ButtonContainer>
            </Link>
            <Link to="/manageitems" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-edit" />
                </span>
                Edit Items
              </ButtonContainer>
            </Link>
            <Link to="/manageorders" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-edit" />
                </span>
                Check Orders
              </ButtonContainer>
            </Link>
          </div>
        ) : (
          <Link to="/cart" className="ml-auto">
            <ButtonContainer>
              <span className="mr-2">
                <i className="fas fa-cart-plus" />
              </span>
              my cart
            </ButtonContainer>
          </Link>
        )}

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={input => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.isSignupOpen} toggle={this.toggleSignup}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  innerRef={input => (this.email = input)}
                />
              </FormGroup>

              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link{
    color:var(--mainWhite)!important
    font-size:1.3rem;
    text-transform:capitalize;    
  }
`;
