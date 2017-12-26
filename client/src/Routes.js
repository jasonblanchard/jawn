import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

import { ConnectedLoginPage } from 'src/pages/LoginPage';
import SettingsPage from 'src/pages/SettingsPage';
import AuthenticatedRoute from 'src/components/AuthenticatedRoute';
import { EntriesIndexPageContainer } from 'src/pages/EntriesIndexPage';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthenticatedRoute exact path="/" render={() => <EntriesIndexPageContainer />} />
          <Route path="/login" render={() => <ConnectedLoginPage />} />
          <Route path="/settings" render={() => <SettingsPage />} />
        </div>
      </Router>
    );
  }
}
