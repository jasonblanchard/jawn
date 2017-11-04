import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

import AppProvider from 'src/AppProvider';
import LoginPage from 'src/pages/LoginPage';

import cssClasses from './App.scss';

export default class App extends Component {
  render() {
    return (
      <Router>
        <AppProvider>
          {(state, actions) => (
            <div className={cssClasses.container}>
              <button onClick={this.handleClick}>test</button>
              <Route exact path="/login" render={() => <LoginPage login={actions.login} />} />
            </div>
          )}
        </AppProvider>
      </Router>
    );
  }

  handleClick = () => {
    console.log('hello'); // eslint-disable-line
  }
}
