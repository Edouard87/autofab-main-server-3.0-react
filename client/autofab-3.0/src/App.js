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

import Confirmation from "./components/Confirmation" 

// Import Componnents

import Nav from './components/Nav'
import MainContent from "./components/MainContent"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machine: null,
      date: null,
      blocks: []
    }
  }
  getReservationConfirmation = (data) => {
    this.setState({
      ...data
    });
  }
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Nav />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" />
          <Switch>
            <Route path="/confirmation">
              <Confirmation reservation={this.state} />
            </Route>
            <Route path="/" render={() => (<MainContent getReservationConfirmation={this.getReservationConfirmation} cookies={this.props.cookies} />)} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
