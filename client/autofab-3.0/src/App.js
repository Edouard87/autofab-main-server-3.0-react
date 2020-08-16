import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "./bootstrap/css/bootstrap.min.css"
import "./css/untitled.css"
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

// Import Componnents

import Nav from './components/Nav'
import MainContent from "./components/MainContent"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      modalText: ""
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
    }).catch(err => {
      // An eccor occured.
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
              <Confirmation reservation={this.state} />
            </Route>
            <Route path="/login">
              
            </Route>
            <Route path="/" render={() => (<MainContent changeModal={this.changeModal} closeModal={this.closeModal} getReservationConfirmation={this.getReservationConfirmation} cookies={this.props.cookies} />)} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
