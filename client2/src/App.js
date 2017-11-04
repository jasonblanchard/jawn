import React, { Component } from 'react';

import AppProvider from 'src/state/AppProvider';
import { ConnectedRoutes } from 'src/Routes';

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <ConnectedRoutes />
      </AppProvider>
    );
  }
}
