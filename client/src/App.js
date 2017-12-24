import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AppProvider from 'src/state/AppProvider';
import Routes from 'src/Routes';

import './App.scss';

export default class App extends Component {
  static propTypes = {
    initialState: PropTypes.object,
  }

  static defaultProps = {
    initialState: {},
  }

  render() {
    return (
      <AppProvider initialState={this.props.initialState}>
        <Routes />
      </AppProvider>
    );
  }
}
