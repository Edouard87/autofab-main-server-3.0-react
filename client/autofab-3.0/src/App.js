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

// Import Componnents

import Nav from './components/Nav'
import MainContent from "./components/MainContent"

class App extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Nav />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" />
          <Switch>
            <Route path="/" render={() => (<MainContent cookies={this.props.cookies} />)} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
