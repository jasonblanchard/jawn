import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

import AppProvider from 'src/AppProvider';
import { ConnectedLoginPage } from 'src/pages/LoginPage';

import cssClasses from './App.scss';

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <div className={cssClasses.container}>
            <Route exact path="/login" render={() => <ConnectedLoginPage />} />
          </div>
        </Router>
      </AppProvider>
    );
  }
}
