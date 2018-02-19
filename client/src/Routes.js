import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

import { ConnectedLoginPage } from 'src/pages/LoginPage';
import SettingsPage from 'src/pages/SettingsPage';
import AuthenticatedRoute from 'src/components/AuthenticatedRoute';
import EntriesIndexPage from 'src/pages/EntriesIndexPage';
import { ConnectedSignUpPage } from 'src/pages/SignUpPage';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthenticatedRoute exact path="/" render={() => <EntriesIndexPage />} />
          <Route path="/login" render={() => <ConnectedLoginPage />} />
          <Route path="/sign-up" render={() => <ConnectedSignUpPage />} />
          <AuthenticatedRoute path="/settings" render={() => <SettingsPage />} />
        </div>
      </Router>
    );
  }
}
