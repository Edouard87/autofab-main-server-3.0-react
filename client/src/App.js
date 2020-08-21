import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "./bootstrap/css/bootstrap.min.css"
import "./css/app-styles.css"
import "./css/box-styles.css"
import "./fonts/font-awesome.min.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { withCookies } from 'react-cookie';
import axios from "axios"
import ModalController from "./components/ModalController"

import Confirmation from "./components/Confirmation" 
import Login from "./components/authentication/Login"
import ServerErrror from "./components/ServerError"

// Import Componnents

import Nav from './components/Nav'
import MainContent from "./components/MainContent"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      modalText: "",
      redirect: "/" // Defines where the app should start
    }
  }
  logoutClicked = () => {
    this.changeModal("LogoutConfirmation")
  }
  handleLogout = () => {
    this.changeModal("LoggingOut")
    axios({
      method: "post",
      url: "/auth/logout"
    }).then(res => {
      this.closeModal();
      this.route("/login");
    }).catch(err => {
      // An eccor occured.
      this.changeModal("ErrorMsg","An unexpected error occured and we were unable to log you out")
    })
  }
  closeModal = () => {
    this.setState({
      modal: null
    })
  }
  changeModal = (newModal, text) => {
    this.setState({
      modal: newModal,
      modalText: text
    });
  }
  route = (to) => {
    this.setState({
      redirect: to
    })
  }
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Nav logoutClicked={this.logoutClicked} />
          <ModalController modalText={this.state.modalText} handleLogout={this.handleLogout} changeModal={this.changeModal} closeModal={this.closeModal} modal={this.state.modal} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" />
          <Switch>
            <Route path="/confirmation">
              <Confirmation route={this.route} redirect={this.state.redirect} />
            </Route>
            <Route path="/login">
              <Login route={this.route} redirect={this.state.redirect} closeModal={this.closeModal} changeModal={this.changeModal} />
            </Route>
            <Route path="/servererror">
              <ServerErrror route={this.route} redirect={this.state.redirect} />
            </Route>
            <Route path="/" render={() => (<MainContent route={this.route} redirect={this.state.redirect} changeModal={this.changeModal} closeModal={this.closeModal} getReservationConfirmation={this.getReservationConfirmation} cookies={this.props.cookies} />)} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
